import { assert } from 'chai';
import * as sinon from 'sinon';
import * as Vue from 'vue'

import { PocoComponent } from '../../../src/components/samples/pocoComponent';

suite("Poco Component", () => {
  let sandbox: sinon.SinonSandbox;
  let errorStub: sinon.SinonStub;

  interface IComponent extends Vue {
    parentData: string,
    onClick: (evt?: Event) => void,
    counter: number;
    message: string
  }

  function mount<T extends Vue>(component: typeof Vue, data: any): T {
    let Ctor = Vue.extend(component);
    return new Ctor({ propsData: data }).$mount() as T;
  }

  setup(() => {
    sandbox = sinon.sandbox.create();
    errorStub = sandbox.stub(console, 'error');
    errorStub.withArgs("[Vue warn]");
  });

  teardown(() => {
    sandbox.restore();
  })

  suite("mount", () => {

    test("derives from Vue", () => {
      let vm = mount<IComponent>(PocoComponent, {});
      assert.instanceOf(vm, Vue);
    })

    test("validates parentData as required", () => {
      let vm = mount<IComponent>(PocoComponent, {});
      assert.isUndefined(vm.parentData);
      assert.isTrue(errorStub.calledWithMatch('Missing required prop: "parentData"'));
    })

    test("initializes parentData", () => {
      let vm = mount<IComponent>(PocoComponent, { parentData: "Sample Data" });
      assert.equal(vm.parentData, "Sample Data");
    })
  });

  suite("onClick ", () => {

    test("increment counter", () => {
      let vm = mount<IComponent>(PocoComponent, { parentData: "Sample Data" });
      assert.equal(vm.counter, 0);
      vm.onClick();
      assert.equal(vm.counter, 1);
      assert.equal(vm.message, "<p>button was clicked</p>");
    })

    test("outputs message", () => {
      let vm = mount<IComponent>(PocoComponent, { parentData: "Sample Data" });
      vm.onClick();
      assert.equal(vm.message, "<p>button was clicked</p>");
    })
  });
})