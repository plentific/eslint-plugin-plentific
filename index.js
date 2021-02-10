

module.exports = {
  rules: {
    'debug': {
      create: function (context) {
        return {
          // NOTE: just for debugging 
          // Program(node) {
          //   const getCircularReplacer = () => {
          //     const seen = new WeakSet();
          //     return (key, value) => {
          //       if (typeof value === "object" && value !== null) {
          //         if (seen.has(value)) {
          //           return;
          //         }
          //         seen.add(value);
          //       }
          //       return value;
          //     };
          //   };
          //   console.log(context.getFilename())
          //   console.log(JSON.stringify(node, getCircularReplacer()));
          // }
        }
      }
    },
    'no-trailing-slash': {
      create: function (context) {
        return {
          Property(node) {
            const { key, value } = node
            if(
              /managers/.test(context.getFilename()) &&
              key.name === 'path' && 
              value.value && value.value.endsWith('/')
            )  {
              context.report({
                node, 
                message: 'Traling slashes are not desired anymore please contact b/e developer to fix issue.'
              })
            }
          }
        }
      }
    }
  }
}
