import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';

import Switch from './components/Switch';
import SwitchWidget from './SwitchWidget';

chai.use(chaiEnzyme);
chai.should();

const should = chai.should();

describe('<SwitchWidget />', () => {
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

  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <SwitchWidget
          schema={{type: ['boolean']}}
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

  describe('handleChange', () => {
    it('should have been called and changed field value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <SwitchWidget
          schema={{type: ['boolean']}}
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

      wrapper.find(Switch).simulate('change', true);
      should.equal(setFieldValue.calledWith('foo', true), true);
    });
  });
});
