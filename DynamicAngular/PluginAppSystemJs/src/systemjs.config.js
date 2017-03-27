System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:": "node_modules/"
  },

  packages: {
    "app": {
      "defaultExtension": "js"
    },
    "rxjs": {
      "defaultExtension": "js"
    }
  },

  map: {
    "@angular/common": "npm:@angular/common/bundles/common.umd.js",
    "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.js",
    "@angular/core": "npm:@angular/core/bundles/core.umd.js",
    "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",
    "@angular/http": "npm:@angular/http/bundles/http.umd.js",
    "@angular/platform-browser": "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
    "@angular/router": "npm:@angular/router/bundles/router.umd.js",
    "angular-in-memory-web-api": "npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js",
    "rxjs": "npm:rxjs"
  }
});
