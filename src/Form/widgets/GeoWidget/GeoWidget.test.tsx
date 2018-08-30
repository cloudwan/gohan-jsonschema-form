import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import GeoWidget from './GeoWidget';

chai.use(chaiEnzyme());
chai.should();

describe('<GeoWidget />', () => {
  const schema = {
    type: 'object',
    properties: {
      lat: {
        type: ['number'],
        minimum: -90,
        maximum: 90,
        title: 'Latitude',
      },
      lng: {
        type: ['number'],
        minimum: -180,
        maximum: 180,
        title: 'Longitude',
      },
    },
  };
  const uiSchema = {
    'ui:widget': 'Geo',
  };

  describe('render()', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <GeoWidget schema={schema} uiSchema={uiSchema} />,
      );

      wrapper.should.matchSnapshot();
    });

    it('should match snapchot with default values', () => {
      const wrapper = shallow(
        <GeoWidget
          schema={{
            ...schema,
            properties: {
              lat: {
                ...schema.properties.lat,
                default: 52,
              },
              lng: {
                ...schema.properties.lng,
                default: 21,
              },
            },
          }}
          uiSchema={uiSchema}
        />,
      );

      wrapper.should.matchSnapshot();
    });

    it('should match snapshot with value passed by props', () => {
      const wrapper = shallow(
        <GeoWidget
          schema={schema}
          uiSchema={uiSchema}
          value={{
            lat: 60,
            lng: 20,
          }}
        />,
      );

      wrapper.should.matchSnapshot();
    });
  });

  describe('get value()', () => {
    it('should return value when is valid', () => {
      const wrapper = shallow(
        <GeoWidget schema={schema} uiSchema={uiSchema} />,
      );
      const instance = wrapper.instance() as GeoWidget;
      wrapper.setState({
        value: {
          lat: 90,
          lng: 100,
        },
      });

      instance.value.should.deep.equal({
        lat: 90,
        lng: 100,
      });
    });
  });

  describe('get isValid()', () => {
    it('should return true if value is valid', () => {
      const wrapper = shallow(
        <GeoWidget
          schema={schema}
          uiSchema={uiSchema}
          value={{
            lat: 51,
            lng: 21,
          }}
        />,
      );
      const instance = wrapper.instance() as GeoWidget;

      instance.isValid.should.equal(true);
    });
  });

  describe('handleChange()', () => {
    it('should change state value', () => {
      const wrapper = shallow(
        <GeoWidget schema={schema} uiSchema={uiSchema} />,
      );

      const instance = wrapper.instance() as GeoWidget;

      instance.handleChange({
        lat: 20,
        lng: 30,
      });

      wrapper.state().value.should.deep.equal({
        lat: 20,
        lng: 30,
      });
    });
  });
});
