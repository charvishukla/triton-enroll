const { createMacro } = require("babel-plugin-macros");
const path = require("path");

function idbMacro({ state, references }) {
  const source = path.join(__dirname, "..", "node_modules", "idb", "build", "index.js");

  if (references.defaultImport) {
    references.defaultImport.forEach((referencePath) => {
      const importDeclaration = referencePath.findParent((path) => path.isImportDeclaration());

      if (importDeclaration) {
        importDeclaration.node.source.value = source;
      }
    });
  }
}

module.exports = createMacro(idbMacro);