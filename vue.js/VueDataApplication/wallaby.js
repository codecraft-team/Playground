module.exports = function () {
  return {
    'files': [
      'src/**/*.ts'
    ],
    'tests': [
      'test/**/*Tests.ts'
    ],
    env: {
      type: 'node'
    },
    setup: function (wallaby) {
      var mocha = wallaby.testFramework;
      mocha.ui('tdd');

    }

  };

}