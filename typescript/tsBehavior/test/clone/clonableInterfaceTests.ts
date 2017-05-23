import { assert } from "chai";

interface IClonable<T> {
  clone(): T;
}

class ClonableTestClass implements IClonable<ClonableTestClass> {
  public samplePublicField: string;
  public constructorCalled: boolean;

  private samplePropertyField: string;
  private privateField: string;

  get sampleProperty(): string {
    return this.samplePropertyField;
  }
  set sampleProperty(val: string) {
    this.samplePropertyField = val;
  }

  get privateFieldGetter(): string {
    return this.privateField;
  }

  constructor(samplePublicField?: string, sampleProperty?: string) {
    this.constructorCalled = true;
    this.sampleProperty = sampleProperty!;
    this.samplePublicField = samplePublicField!;
    this.privateField = "private fields content";
  }

  public reverseField(): string {
    return this.samplePublicField.split(/./).reverse().join("");
  }

  public clone(): ClonableTestClass {
    const clone = new ClonableTestClass(this.samplePublicField, this.sampleProperty);
    clone.privateField = "cloned";
    return clone;
  }
}

suite("ClonableInterface", () => {
  test("with ICloneable implementation", () => {
    const sut = new ClonableTestClass();
    sut.samplePublicField = "public field";
    sut.sampleProperty = "public property";
    sut.constructorCalled = !sut.constructorCalled; // reset because other wise it will be copied as a public field
    const clonedSut = sut.clone();
    // Clone is created as expected
    assert.equal(clonedSut.samplePublicField, sut.samplePublicField);
    assert.instanceOf(clonedSut, ClonableTestClass);
    assert.equal(clonedSut.sampleProperty, sut.sampleProperty);
    assert.isTrue(clonedSut.constructorCalled);
    assert.isDefined(clonedSut.reverseField);
    // typescript allows access to set private fields inside the class 
    assert.equal(clonedSut.privateFieldGetter, "cloned");
  });

});
