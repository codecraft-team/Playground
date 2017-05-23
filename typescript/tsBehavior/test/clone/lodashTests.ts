import { assert } from "chai";
import * as _ from "lodash";

class SimpleTestClass {
  public samplePublicField: string;
  private constructorCalled: boolean;

  private samplePropertyField: string;

  get sampleProperty(): string {
    return this.samplePropertyField;
  }
  set sampleProperty(val: string) {
    this.samplePropertyField = val;
  }

  constructor() {
    this.constructorCalled = true;
  }

  public reverseField(): string {
    return this.samplePublicField.split(/./).reverse().join("");
  }

  get isConstructorCalled() {
    return this.constructorCalled;
  }
}

suite("clone", () => {

  suite("with lodash util", () => {

    test("copies all public properties and call the constructor function as expected", () => {

      const sut = new SimpleTestClass();
      sut.samplePublicField = "public field";
      sut.sampleProperty = "public property";

      const clonedSut = _.clone(sut);

      // Public fields will be cloned
      assert.equal(clonedSut.samplePublicField, sut.samplePublicField);
      assert.instanceOf(clonedSut, SimpleTestClass);
      assert.equal(clonedSut.sampleProperty, sut.sampleProperty);
      assert.isTrue(clonedSut.isConstructorCalled);
      assert.isDefined(clonedSut.reverseField);
    });
  });
});
