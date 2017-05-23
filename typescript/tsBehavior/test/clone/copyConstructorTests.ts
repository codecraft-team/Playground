import { assert } from "chai";

class CopyConstructorTestClass {
  public samplePublicField: string;
  public constructorCalled: boolean = false;

  private samplePropertyField: string;

  get sampleProperty(): string {
    return this.samplePropertyField;
  }
  set sampleProperty(val: string) {
    this.samplePropertyField = val;
  }

  constructor(source?: CopyConstructorTestClass) {
    this.constructorCalled = true;
    if (source) {
      Object.assign(this, {
        sampleProperty: source.sampleProperty,
        samplePublicField: source.samplePublicField,
      });
    }
  }

  public reverseField(): string {
    return this.samplePublicField.split(/./).reverse().join("");
  }
}


suite("clone", () => {

  suite("using copyConstructor", () => {

    function clone(source: CopyConstructorTestClass): CopyConstructorTestClass {
      return new CopyConstructorTestClass(source);
    }

    test("with CopyConstructorTestClass", () => {
      const sut = new CopyConstructorTestClass();
      sut.samplePublicField = "public field";
      sut.sampleProperty = "public property";
      sut.constructorCalled = !sut.constructorCalled; // reset because other wise it will be copied as a public field

      const clonedSut: CopyConstructorTestClass = clone(sut);

      // Clone is created as expected
      assert.equal(clonedSut.samplePublicField, sut.samplePublicField);
      assert.instanceOf(clonedSut, CopyConstructorTestClass);
      assert.equal(clonedSut.sampleProperty, sut.sampleProperty);
      assert.isTrue(clonedSut.constructorCalled);
      assert.isDefined(clonedSut.reverseField);
    });
  });
});
