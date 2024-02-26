const extractStringValues = (node) => (
  node.elements
    .filter((element) => element.type === 'Literal')
    .map(({ value }) => value)
    .filter(value => value)
)

module.exports = {
  extractStringValues,
}
