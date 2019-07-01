import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow, mount} from 'enzyme';
import * as React from 'react';

import {SchemaField} from './SchemaField';
chai.use(chaiEnzyme);
chai.should();

const should = chai.should();

describe('<SchemaField />', () => {
  describe('render', () => {
    it('should match snapshot when uischema widget defined as function', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
          }}
          uiSchema={{
            'ui:widget': props => <div>test</div>,
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when uischema widget is hidden', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
          }}
          uiSchema={{
            'ui:widget': 'Hidden',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when uischema widget defined as string', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
          }}
          uiSchema={{
            'ui:widget': 'CodeEditor',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is object', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is object w/o properties', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'object',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    // it('should match snapshot when schema type is array', () => {
    //   const wrapper = shallow(
    //     <SchemaField
    //       schema={{
    //         title: 'test string',
    //         type: 'array',
    //       }}
    //     />,
    //   );

    //   wrapper.should.to.matchSnapshot();
    // });

    it('should match snapshot when schema type is boolean', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'boolean',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema has enum', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
            enum: ['test1', 'test2'],
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is string', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is integer', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'integer',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is number', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'integer',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is incorrect', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'void',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
