import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';

import GeoWidget from './GeoWidget';

chai.use(chaiEnzyme());
chai.should();

describe('<GeoWidget />', () => {
  const formikFormProps = {
    dirty: false,
    errors: {},
    handleBlur: () => null,
    handleChange: () => null,
    handleReset: () => null,
    handleSubmit: () => null,
    initialValues: {},
    isSubmitting: false,
    isValid: false,
    isValidating: false,
    registerField: () => null,
    resetForm: () => null,
    setError: () => null,
    setErrors: () => null,
    setFieldError: () => null,
    setFieldTouched: () => null,
    setFieldValue: () => null,
    setFormikState: () => null,
    setStatus: () => null,
    setSubmitting: () => null,
    setTouched: () => null,
    setValues: () => null,
    submitCount: 0,
    submitForm: () => null,
    touched: {},
    unregisterField: () => null,
    validateField: () => null,
    validateForm: () => null,
    validateOnBlur: true,
    validateOnChange: true,
    values: {},
  };

  const schema = {
    type: ['object'],
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
        <GeoWidget
          schema={schema}
          uiSchema={uiSchema}
          form={formikFormProps}
          field={{
            value: {lat: 1, lng: 0},
            onChange: () => null,
            onBlur: () => null,
            name: 'geo',
          }}
        />,
      );

      wrapper.should.matchSnapshot();
    });
  });

  describe('handleChange()', () => {
    it('should change state value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <GeoWidget
          schema={schema}
          uiSchema={uiSchema}
          form={{
            ...formikFormProps,
            setFieldValue,
          }}
          field={{
            value: {lat: 1, lng: 0},
            onChange: () => null,
            onBlur: () => null,
          }}
        />,
      );

      const instance = wrapper.instance() as GeoWidget;

      instance.handleChange({
        lat: 20,
        lng: 30,
      });

      setFieldValue.calledWith('lat', 20);
      setFieldValue.calledWith('lng', 30);
    });
  });
});
