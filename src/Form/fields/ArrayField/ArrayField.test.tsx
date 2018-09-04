import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import ArrayField from './ArrayField';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<ArrayField />', () => {
  beforeEach(() => {
    const fake = sinon.fake.returns('');
    sinon.replace(Date.prototype, 'valueOf', fake);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            type: 'string',
          },
          type: 'array',
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot with default value', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            type: 'string',
          },
          type: 'array',
          default: ['baz'],
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot with value passed by props', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            type: 'string',
          },
          type: 'array',
          default: ['baz'],
        }}
        value={['foo']}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when array items are objects', () => {
    const wrapper = shallow(
      <ArrayField
        schema={{
          items: {
            properties: {
              foo: {
                id: 'foo',
                type: 'string',
              },
              bar: {
                id: 'bar',
                type: 'string',
              },
            },
            type: ['object'],
          },
          type: ['array'],
        }}
        value={['foo']}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  describe('get value', () => {
    it('should return value when it is valid', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          value={['foo']}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: 'foo'}];

      instance.value.should.deep.equal(['foo']);
    });

    it('should return undefined when value was not changed', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      should.equal(instance.value, undefined);

      wrapper.setState({value: undefined});
      should.equal(instance.value, undefined);
    });

    it('should return value when it is valid and array items are objects', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              properties: {
                foo: {
                  id: 'foo',
                  type: 'string',
                },
                bar: {
                  id: 'bar',
                  type: 'string',
                },
              },
              type: ['object'],
            },
            type: ['array'],
          }}
          value={[{foo: 'foz'}, {bar: 'baz'}]}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: {foo: 'foz'}}, {value: {bar: 'baz'}}];

      instance.value.should.deep.equal([{foo: 'foz'}, {bar: 'baz'}]);
    });
  });

  describe('get isValid', () => {
    it('should return true when it is valid', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          value={['foo']}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: 'foo'}];

      instance.isValid.should.equal(true);
    });

    it('should return false when there is no value and it is required', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          isRequired={true}
        />,
      );
      const instance = wrapper.instance() as ArrayField;

      instance.isValid.should.equal(false);
    });

    it('should return false when value is empty array and it is required', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          isRequired={true}
          value={[]}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.items = [];

      instance.isValid.should.equal(false);
    });
  });

  describe('handleTabChange', () => {
    it('should change activeTabKey', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              properties: {
                foo: {
                  id: 'foo',
                  type: 'string',
                },
                bar: {
                  id: 'bar',
                  type: 'string',
                },
              },
              type: ['object'],
            },
            type: ['array'],
          }}
          isRequired={true}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      instance.handleTabChange('foo');

      wrapper.state().activeTabKey.should.equal('foo');
    });
  });

  describe('handleTabEdit', () => {
    it('should remove tab with passed key', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              properties: {
                foo: {
                  id: 'foo',
                  type: 'string',
                },
                bar: {
                  id: 'bar',
                  type: 'string',
                },
              },
            },
            type: ['array'],
          }}
          isRequired={true}
          value={[
            {foo: 'test00', bar: 'test01'},
            {foo: 'test10', bar: 'test11'},
            {foo: 'test20', bar: 'test21'},
          ]}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      wrapper.setState({activeTabKey: '2'});
      instance.handleTabEdit('1', 'remove');

      wrapper.state().activeTabKey.should.equal('2');
      wrapper
        .state()
        .value.should.deep.equal([
          {value: {foo: 'test00', bar: 'test01'}, key: '0'},
          {value: {foo: 'test20', bar: 'test21'}, key: '2'},
        ]);
    });
  });

  describe('handleAddButtonClick', () => {
    it('should add new list item to empty list', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.handleAddButtonClick();

      wrapper.state().value.should.deep.equal([
        {
          value: undefined,
          key: '0',
        },
      ]);
    });

    it('should add new list item', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          value={['foo']}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: 'foo'}];
      instance.handleAddButtonClick();

      wrapper
        .state()
        .value.should.deep.equal([
          {value: 'foo', key: '0'},
          {value: undefined, key: '1'},
        ]);
    });

    it('should add new list item with default value', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
              default: 'bar',
            },
            type: 'array',
          }}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      instance.handleAddButtonClick();

      wrapper.state().value.should.deep.equal([{value: 'bar', key: '0'}]);
    });

    it('should add new tab', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              properties: {
                foo: {
                  id: 'foo',
                  type: 'string',
                },
                bar: {
                  id: 'bar',
                  type: 'string',
                },
              },
              type: ['object'],
            },
            type: ['array'],
          }}
          isRequired={true}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      instance.handleAddButtonClick();

      wrapper.state().activeTabKey.should.equal('0');
      wrapper.state().value.should.deep.equal([
        {
          value: undefined,
          key: '0',
        },
      ]);
    });
  });

  describe('handleRemoveButtonClick', () => {
    it('should remove first item', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          value={['foo', 'bar']}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: 'foo'}, {value: 'bar'}];
      instance.handleRemoveButtonClick('0')();

      wrapper.state().value.should.deep.equal([
        {
          value: 'bar',
          key: '1',
        },
      ]);
    });

    it('should remove tab with passed key', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              properties: {
                foo: {
                  id: 'foo',
                  type: ['string'],
                },
                bar: {
                  id: 'bar',
                  type: ['string'],
                },
              },
              type: ['object'],
            },
            type: ['array'],
          }}
          isRequired={true}
          value={[
            {foo: 'test00', bar: 'test01'},
            {foo: 'test10', bar: 'test11'},
            {foo: 'test20', bar: 'test21'},
          ]}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      wrapper.setState({activeTabKey: '2'});
      instance.handleRemoveButtonClick('1')();

      wrapper.state().activeTabKey.should.equal('2');
      wrapper
        .state()
        .value.should.deep.equal([
          {value: {foo: 'test00', bar: 'test01'}, key: '0'},
          {value: {foo: 'test20', bar: 'test21'}, key: '2'},
        ]);
    });

    it('should remove last tab', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              properties: {
                foo: {
                  id: 'foo',
                  type: ['string'],
                },
                bar: {
                  id: 'bar',
                  type: ['string'],
                },
              },
              type: ['object'],
            },
            type: ['array'],
          }}
          isRequired={true}
          value={[
            {foo: 'test00', bar: 'test01'},
            {foo: 'test10', bar: 'test11'},
            {foo: 'test20', bar: 'test21'},
          ]}
        />,
      );

      const instance = wrapper.instance() as ArrayField;
      wrapper.setState({activeTabKey: '2'});
      instance.handleRemoveButtonClick('2')();

      wrapper.state().activeTabKey.should.equal('1');
      wrapper
        .state()
        .value.should.deep.equal([
          {value: {foo: 'test00', bar: 'test01'}, key: '0'},
          {value: {foo: 'test10', bar: 'test11'}, key: '1'},
        ]);
    });
  });

  describe('handleReorderClick', () => {
    it('should move item up', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          value={['foo', 'bar', 'baz']}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}];
      instance.handleReorderClick(1, 0)();

      wrapper
        .state()
        .value.should.deep.equal([
          {value: 'bar', key: '1'},
          {value: 'foo', key: '0'},
          {value: 'baz', key: '2'},
        ]);
    });

    it('should move item down', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          value={['foo', 'bar', 'baz']}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}];
      instance.handleReorderClick(1, 2)();

      wrapper
        .state()
        .value.should.deep.equal([
          {value: 'foo', key: '0'},
          {value: 'baz', key: '2'},
          {value: 'bar', key: '1'},
        ]);
    });

    it('should not move items when old and new indexes are the same', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              type: 'string',
            },
            type: 'array',
          }}
          value={['foo', 'bar', 'baz']}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      instance.items = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}];
      instance.handleReorderClick(0, 0)();

      wrapper
        .state()
        .value.should.deep.equal([
          {value: 'foo', key: '0'},
          {value: 'bar', key: '1'},
          {value: 'baz', key: '2'},
        ]);
    });

    it('should change tab position and change active tab key', () => {
      const wrapper = shallow(
        <ArrayField
          schema={{
            items: {
              properties: {
                foo: {
                  id: 'foo',
                  type: ['string'],
                },
                bar: {
                  id: 'bar',
                  type: ['string'],
                },
              },
              type: ['object'],
            },
            type: ['array'],
          }}
          isRequired={true}
          value={[
            {foo: 'test00', bar: 'test01'},
            {foo: 'test10', bar: 'test11'},
            {foo: 'test20', bar: 'test21'},
          ]}
        />,
      );
      const instance = wrapper.instance() as ArrayField;
      wrapper.setState({activeTabKey: '1'});
      instance.items = [
        {value: {foo: 'test00', bar: 'test01'}},
        {value: {foo: 'test10', bar: 'test11'}},
        {value: {foo: 'test20', bar: 'test21'}},
      ];
      instance.handleReorderClick(1, 0)();

      wrapper.state().activeTabKey.should.equal('1');
      wrapper
        .state()
        .value.should.deep.equal([
          {value: {foo: 'test10', bar: 'test11'}, key: '1'},
          {value: {foo: 'test00', bar: 'test01'}, key: '0'},
          {value: {foo: 'test20', bar: 'test21'}, key: '2'},
        ]);
    });
  });
});
