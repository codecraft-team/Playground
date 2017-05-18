import { assert } from 'chai';
import * as sinon from 'sinon';
import * as Vue from 'vue'

import { PocoComponent } from '../../../src/components/samples/pocoComponent';

suite("Poco Component", () => {
  let sandbox: sinon.SinonSandbox;
  let errorStub: sinon.SinonStub;

  function mount<T extends Vue>(component: new () => void, data: any): T {
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

  test("derives from Vue", () => {
    let vm = mount(PocoComponent, {});
    assert.instanceOf(vm, Vue);
  })

  test("validates parentData as required", () => {
    let vm = mount(PocoComponent, {});
    assert.isTrue(errorStub.calledWithMatch('Missing required prop: "parentData"'));
  })
})