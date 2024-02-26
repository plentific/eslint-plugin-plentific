const findProperty = (node, name) => {
  return node.properties.find((property) => {
    return property.key.name === name
  })
}

module.exports = {
  findProperty,
}
