import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import moment from 'moment';
import * as React from 'react';
import sinon from 'sinon';

import DateTimeWidget from './DateTimeWidget';

chai.use(chaiEnzyme());
chai.should();

describe('<DateTimeWidget />', () => {
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

  it('should match snapshot', () => {
    const wrapper = shallow(
      <DateTimeWidget
        schema={{
          type: ['string'],
          format: 'date-time',
        }}
        form={formikFormProps}
        field={{
          value: undefined,
          onChange: () => null,
          onBlur: () => null,
          name: 'foo',
        }}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when widget has default value', () => {
    const wrapper = shallow(
      <DateTimeWidget
        schema={{
          type: ['string'],
          format: 'date-time',
          default: '2018-09-07T18:10:48Z',
        }}
        form={formikFormProps}
        field={{
          value: undefined,
          onChange: () => null,
          onBlur: () => null,
          name: 'foo',
        }}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when value is null', () => {
    const wrapper = shallow(
      <DateTimeWidget
        schema={{
          type: ['string', 'null'],
          format: 'date-time',
        }}
        form={formikFormProps}
        field={{
          value: null,
          onChange: () => null,
          onBlur: () => null,
          name: 'foo',
        }}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  describe('handleInputChange', () => {
    it('should change state value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <DateTimeWidget
          schema={{
            type: ['string'],
            format: 'date-time',
          }}
          form={{
            ...formikFormProps,
            setFieldValue,
          }}
          field={{
            value: undefined,
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );

      const instance = wrapper.instance() as DateTimeWidget;
      const value = moment('2018-09-07T18:10:48Z');
      instance.handleInputChange(value);

      setFieldValue.should.calledWith('foo', value.format());
    });
  });
});
