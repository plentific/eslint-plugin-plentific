const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key === 'parent') {
      return
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value)
    }
    return value
  }
}

const stringify = (node) => {
  return JSON.stringify(node, getCircularReplacer(), 2)
}


// reconstruct the template literal
const extractString = (node) => {
  if (node.type === 'Literal') {
    return node.value
  }
  if (node.type === 'TemplateLiteral') {
    let result = '';
    // Iterate over the quasis and expressions together
    for (let i = 0; i < node.quasis.length; i++) {
      const quasi = node.quasis[i];
      result += quasi.value.raw;
      // Check if there's an expression to add
      if (i < node.expressions.length) {
        const expression = node.expressions[i];
        result += '${' + expression.name + '}';
      }
    }
    return result;
  }
  return `not supported type yet ${node.type}`
}

module.exports = {
  getCircularReplacer,
  stringify,
  extractString,
}
