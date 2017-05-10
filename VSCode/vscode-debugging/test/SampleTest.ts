import * as Chai from 'chai';

suite("SampleTest for debugging", () => {
  let assert = Chai.assert;

  test("My demonstration debugging test", () => {
    let msg = 'Hello World';

    assert.isTrue(msg !== null);
  });

})
