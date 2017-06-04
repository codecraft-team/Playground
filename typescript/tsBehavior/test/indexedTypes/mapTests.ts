import { assert } from "chai";

class Person {
  public firstName: string = "Max";
  public lastName: string;
  private privateName: string;

  public foo(): void {
    console.log("foo");
  }

  public asReadonly(): ReadOnlyPerson {
    return this as ReadOnlyPerson;
  }
}

type personMembers = keyof Person;

class PersonDictionary {
  [key: string]: Person;
}

type ReadOnly<T> = { readonly [P in keyof T]: T[P]};
type ReadOnlyPerson = Readonly<Person>;

suite("IndexedTypes", () => {

  suite("keyof Operator", () => {

    test("brings advanced tsc compile-time support for type member access", () => {
      const key1: personMembers = "firstName";
      const key2: personMembers = "lastName";
      // const key3: personProperties = "privateName"; // not valid because privateName is private
      const key4: personMembers = "foo";

      assert.equal(key1, "firstName");
      assert.equal(key2, "lastName");
      assert.equal(key4, "foo");
    });

  });

  suite("as a dictionary", () => {

    test("is indexable with number or string", () => {
      const dictionary = new PersonDictionary();
      dictionary[0] = new Person();
      dictionary["first"] = new Person();
      assert.equal(Object.keys(dictionary).length, 2);
    });
  });

  suite("as types which modifies properties on existing types", () => {

    test("does not allow write of readonly properties", () => {
      const person = new Person();
      const readOnlyPerson = person.asReadonly();

      // readOnlyPerson.firstName = ""; // because it's declared as readonly

      assert.isTrue(Object.getOwnPropertyDescriptor(readOnlyPerson, "firstName").writable);
    });
  });
});
