import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

// import Range from './components/Range';
import RangeField from './RangeField';

chai.use(chaiEnzyme());
chai.should();

describe('<RangeField />', () => {
  const schema = {
    type: ['object'],
    properties: {
      foo: {
        type: ['integer'],
        minimum: 1,
        maximum: 10,
      },
      bar: {
        type: ['integer'],
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
        <RangeField schema={schema} uiSchema={uiSchema} />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot with default values', () => {
      const wrapper = shallow(
        <RangeField
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
  });
});
