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
        id={'test'}
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

  describe('validate', () => {
    it('should return undefined when value passed validation', () => {
      const wrapper = shallow(
        <ObjectField
          id="foo"
          isRequired={false}
          uiSchema={{}}
          schema={{
            type: ['object'],
            properties: {
              foo: {
                type: 'string',
              },
            },
            propertiesOrder: ['foo'],
            required: [],
          }}
        />,
      );

      should.equal(wrapper.instance().validate({foo: 'bar'}), undefined);
    });

    it('should return component with errors when value is required and it is undefined', () => {
      const wrapper = shallow(
        <ObjectField
          id="foo"
          uiSchema={{}}
          isRequired={true}
          schema={{
            type: ['object'],
            properties: {
              foo: {
                type: 'string',
              },
            },
            propertiesOrder: ['foo'],
            required: [],
          }}
        />,
      );

      const errorsWrapper = shallow(wrapper.instance().validate(undefined));
      errorsWrapper.type().should.equal('div');
    });
  });
});
