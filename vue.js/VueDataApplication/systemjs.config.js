System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: {},
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "src": {
      "defaultJSExtensions": true,
      "meta": {
        "*.html": {
          "loader": "text"
        }
      }
    },
    "vue": {
      "main": "dist/vue.common.js"
    }
  },

  map: {
    "[object Object]": "npm:babel-core@5.8.38",
    "[object Object]-runtime": "npm:babel-runtime@5.8.38",
    "text": "github:systemjs/plugin-text@0.0.9",
    "vue": "npm:vue@2.3.3",
    "vue-class-component": "npm:vue-class-component@5.0.1",
    "vue-property-decorator": "npm:vue-property-decorator@5.0.1",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.0.6"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@5.0.6": {
      "base64-js": "npm:base64-js@1.2.0",
      "ieee754": "npm:ieee754@1.1.8"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:vue-class-component@5.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vue-property-decorator@5.0.1": {
      "reflect-metadata": "npm:reflect-metadata@0.1.10",
      "vue-class-component": "npm:vue-class-component@5.0.1"
    },
    "npm:vue@2.3.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
