import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import DateTimePicker from './DateTimePicker';

chai.should();
chai.use(chaiEnzyme());

describe('DateTimePicker', () => {
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
  it('should match snapshot for minimal number of props', () => {
    const wrapper = shallow(
      <DateTimePicker
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
});
