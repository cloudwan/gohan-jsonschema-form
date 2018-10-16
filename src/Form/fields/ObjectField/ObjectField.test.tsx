import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import ObjectField from './ObjectField';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<ObjectField />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <ObjectField
        schema={{
          type: ['object'],
          properties: {
            foo: {
              title: 'Foo',
              type: ['array'],
              items: {
                title: 'Foo array item',
                type: ['string'],
              },
            },
            bar: {
              title: 'Bar',
              type: ['object', 'null'],
              properties: {
                foz: {
                  title: 'Foz',
                  type: ['number'],
                },
              },
              propertiesOrder: ['foz'],
            },
          },
          propertiesOrder: ['bar', 'foo'],
          required: ['bar'],
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot with data passed by props', () => {
    const wrapper = shallow(
      <ObjectField
        schema={{
          type: ['object'],
          properties: {
            foo: {
              title: 'Foo',
              type: ['string'],
            },
            bar: {
              title: 'Bar',
              type: ['object', 'null'],
              properties: {
                foz: {
                  title: 'Foz',
                  type: ['number'],
                },
              },
              propertiesOrder: ['foz'],
            },
          },
          propertiesOrder: ['bar', 'foo'],
        }}
        id={'test'}
        value={{
          foo: 'test',
        }}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot with tabs', () => {
    const wrapper = shallow(
      <ObjectField
        schema={{
          type: ['object'],
          properties: {
            foo: {
              title: 'Foo',
              type: ['object'],
              properties: {
                foz: {
                  title: 'Foz',
                  type: ['number'],
                },
              },
              propertiesOrder: ['foz'],
            },
            bar: {
              title: 'Bar',
              type: ['object'],
              properties: {
                baz: {
                  title: 'Baz',
                  type: ['number'],
                },
              },
              propertiesOrder: ['baz'],
            },
          },
          propertiesOrder: ['bar', 'foo'],
        }}
        id={'test'}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  describe('get value', () => {
    it('should return value when it is valid', () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                title: 'Foo',
                type: ['string'],
              },
            },
            propertiesOrder: ['foo'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      instance.fields = {
        foo: {value: 'test'},
      };

      instance.value.should.deep.equal({
        foo: 'test',
      });
    });

    it('should filter out undefined values', () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                title: 'Foo',
                type: ['string'],
              },
              bar: {
                title: 'Bar',
                type: ['string'],
              },
            },
            propertiesOrder: ['foo', 'bar'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      instance.fields = {foo: {value: 'test'}, bar: {}};

      instance.value.should.deep.equal({
        foo: 'test',
      });
    });

    it('should return null', () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                title: 'Foo',
                type: ['string', 'null'],
              },
            },
            propertiesOrder: ['foo'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      wrapper.setState({
        isNull: true,
      });

      should.equal(instance.value, null);
    });
  });

  describe('get isValid', () => {
    it('should return true when it is valid', () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                title: 'Foo',
                type: ['string'],
              },
            },
            propertiesOrder: ['foo'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      instance.fields = {
        foo: {
          value: 'test',
          isValid: true,
        },
      };

      instance.isValid.should.equal(true);
    });

    it("should return false when it isn't valid", () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                title: 'Foo',
                type: ['string'],
              },
            },
            propertiesOrder: ['foo'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      instance.fields = {
        foo: {
          value: 'test',
          isValid: false,
        },
      };

      instance.isValid.should.equal(false);
    });
  });

  describe('handleToggleButtonClick', () => {
    it('should create empty object when value is undefined', () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                title: 'Foo',
                type: ['string'],
              },
            },
            propertiesOrder: ['foo'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      instance.handleToggleButtonClick();
      wrapper.state().isNull.should.equal(false);
      wrapper.state().value.should.deep.equal({});
    });

    it('should change value to null and isNull flag to true when object exists', () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                title: 'Foo',
                type: ['string'],
              },
            },
            propertiesOrder: ['foo'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      wrapper.setState({value: {}});
      instance.handleToggleButtonClick();
      wrapper.state().isNull.should.equal(true);
      should.equal(wrapper.state().value, null);
    });
  });

  describe('orderProperties', () => {
    it('should return return sorted properties', () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                type: ['string'],
              },
              bar: {
                type: ['number'],
              },
            },
            propertiesOrder: ['foo', 'bar'],
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      const properties = Object.keys(instance.props.schema.properties);
      instance
        .orderProperties(properties, instance.props.schema.propertiesOrder)
        .should.deep.equal(properties);
    });

    it("should return return unsorted properties when order isn't defined", () => {
      const wrapper = shallow(
        <ObjectField
          schema={{
            type: ['object'],
            properties: {
              foo: {
                type: ['string'],
              },
              bar: {
                type: ['number'],
              },
            },
          }}
        />,
      );
      const instance = wrapper.instance() as ObjectField;
      const properties = Object.keys(instance.props.schema.properties);
      instance
        .orderProperties(properties, instance.props.schema.propertiesOrder)
        .should.deep.equal(properties);
    });
  });
});
