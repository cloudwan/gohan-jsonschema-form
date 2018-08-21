import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Range from './components/Range';
import RangeWidget from './RangeWidget';

chai.use(chaiEnzyme());
chai.should();

describe('<RangeWidget />', () => {
  const schema = {
    type: 'object',
    properties: {
      foo: {
        type: 'integer',
        minimum: 1,
        maximum: 10,
      },
      bar: {
        type: 'integer',
        minimum: 1,
        maximum: 10,
      },
    },
  };

  const uiSchema = {
    'ui:widget': 'Range',
    'ui:options': {
      minKey: 'foo',
      maxKey: 'bar',
    },
  };

  describe('render method', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <RangeWidget schema={schema} uiSchema={uiSchema} />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot with default values', () => {
      const wrapper = shallow(
        <RangeWidget
          schema={{
            ...schema,
            properties: {
              foo: {
                ...schema.properties.foo,
                default: 2,
              },
              bar: {
                ...schema.properties.bar,
                default: 3,
              },
            },
          }}
          uiSchema={uiSchema}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot with value passed by props', () => {
      const wrapper = shallow(
        <RangeWidget
          schema={schema}
          uiSchema={uiSchema}
          value={{
            foo: 5,
            bar: 9,
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });

  describe('get method', () => {
    it('should return value when it is valid', () => {
      const wrapper = shallow(
        <RangeWidget schema={schema} uiSchema={uiSchema} />,
      );
      const instance = wrapper.instance() as RangeWidget;

      wrapper.setState({value: [1, 5]});
      instance.value.should.deep.equal({
        foo: 1,
        bar: 5,
      });
    });
  });

  describe('isValid method', () => {
    it('should be true if value is valid', () => {
      const wrapper = shallow(
        <RangeWidget schema={schema} uiSchema={uiSchema} />,
      );

      const instance = wrapper.instance() as RangeWidget;

      instance.isValid.should.equal(true);
    });
  });

  describe('handleChange', () => {
    it('should have been called and changed state value', () => {
      const wrapper = shallow(
        <RangeWidget schema={schema} uiSchema={uiSchema} />,
      );
      wrapper.find(Range).simulate('change', [6, 7]);
      wrapper.state().value.should.deep.equal([6, 7]);
    });
  });
});
