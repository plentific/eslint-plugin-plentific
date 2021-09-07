module.exports = {
  create: function (context) {
    return {
      // NOTE: just for debugging 
      Program(node) {
        // const getCircularReplacer = () => {
        //   const seen = new WeakSet();
        //   return (key, value) => {
        //     if (typeof value === "object" && value !== null) {
        //       if (seen.has(value)) {
        //         return;
        //       }
        //       seen.add(value);
        //     }
        //     return value;
        //   };
        // };
        // if(context.getFilename().endsWith('a/cyclic-import.ts')) {

        //   console.log(context.getFilename())
        //   console.log(JSON.stringify(node, getCircularReplacer(), 2))
        // }
      }
    }
  }
}