function isRequire(node) {
  return node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length >= 1 &&
    node.arguments[0].type === 'Literal'
}

function getModuleName (filename) {
  const match = /modules\/(?<module>[^/]*)/.exec(filename)
  if (match && match.groups && match.groups.module)  {
    return match.groups.module
  }
}

var visibilityMap = null

function flattenNode(node, visitedMap = {}, path = []) {
  path.push(node.module)
  if (node.module in visitedMap) {
    throw Error(`Module cycle detected: ${path.join(' -> ')}`)
  }
  visitedMap[node.module] = true
  var visible = {}
  for (const subNode of node.children) {
    visible[subNode.module] = true
    if (!subNode.visible) {
      flattenNode(subNode, {
        ...visitedMap
      }, [...path])
    }

    visible = {
      ...visible,
      ...subNode.visible
    }
  }
  node.visible = visible
}
const ALL_MODULES_KEY = '<all-modules>'

function flattenDependencyMap(dependencyMap) {
  const allModulesNode = dependencyMap[ALL_MODULES_KEY]

  if (allModulesNode) {
    delete dependencyMap[ALL_MODULES_KEY]
    for (const module in dependencyMap) {
      const node = dependencyMap[module]
      node.children.push(...allModulesNode.children.filter(child => child.module !== module))
    }
  }

  for (const module in dependencyMap) {
    const node = dependencyMap[module]
    flattenNode(node)
  }
}

function computeVisibilityMap(config) {
  const dependencyMap = {}

  function getOrCreateNode(module) {
    let node = dependencyMap[module]
    if (!node) {
      node = {
        module,
        children: []
      }
      dependencyMap[module] = node
    }
    return node
  }

  const pairs = config
    .split('\n')
    .map(value => value.trim())
    .filter(value => value)

  const linkedModuleList = pairs.map(pair => {
    const linkedModule = pair
      .split('-->')
      .map(value => value.replace(/[\[\]]/g, '').trim())
      .filter(value => value)

    if (linkedModule.length >= 1 && linkedModule.length <= 2) {
      return linkedModule;
    }
  }).filter(Boolean)


  for (const [ module, importModule ] of linkedModuleList) {
    const moduleNode = getOrCreateNode(module)

    if(!importModule) {
      continue;
    }

    const importModuleNode = getOrCreateNode(importModule)

    if (!moduleNode.children.includes(importModule)) {
      moduleNode.children.push(importModuleNode)
    }
  }

  flattenDependencyMap(dependencyMap)

  const visibilityMap = Object.keys(dependencyMap).reduce((visibilityMap, module) => {
    visibilityMap[module] = dependencyMap[module].visible
    return visibilityMap
  }, {})

  return visibilityMap
}

function checkForCyclicImport (context, node, filename, importPath) {
  const module = getModuleName(filename)
  const importModule = getModuleName(importPath)

  if (!module || !importModule) {
    return
  }

  const visibilityNode = visibilityMap[module]
  const importedInsideSameModule = module === importModule;

  if (importedInsideSameModule) {
    return;
  }

  if (!visibilityNode || !visibilityNode[importModule]) {
    return context.report({
      node,
      message: `Module '${importModule}' is not configured as dependency of '${module}'`,
    });
  }
}

module.exports = {
  getModuleName,
  computeVisibilityMap,
  create: function (context) {
    const options = context.options[0]
    if (!options || !options.config) {
      throw Error('missing configuration')
    }

    if (!visibilityMap) {
      visibilityMap = computeVisibilityMap(options.config)
    }
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value
        return checkForCyclicImport(context, node, context.getFilename(), importPath)
      },
      CallExpression(node) {
        if (isRequire(node)) {
          const importPath = node.arguments[0].value
          return checkForCyclicImport(context, node, context.getFilename(), importPath)
        }
      }
    }
  }
}
