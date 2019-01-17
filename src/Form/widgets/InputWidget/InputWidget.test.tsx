import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';

import Input from '../../components/Input';
import InputNumber from './components/InputNumber';
import InputWidget from './InputWidget';

chai.use(chaiEnzyme());
chai.should();

describe('<InputWidget />', () => {
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
  it('should match snapshot when schema type is string', () => {
    const wrapper = shallow(
      <InputWidget
        schema={{type: ['string']}}
        form={formikFormProps}
        field={{
          value: '',
          onChange: () => null,
          onBlur: () => null,
          name: 'foo',
        }}
      />,
    );

    wrapper.should.to.matchSnapshot();
  });

  it('should match snapshot when schema type is number', () => {
    const wrapper = shallow(
      <InputWidget
        schema={{type: ['number']}}
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

  describe('render method', () => {
    it('should render elements', () => {
      const wrapper = shallow(
        <InputWidget
          schema={{type: ['string']}}
          form={formikFormProps}
          field={{
            value: undefined,
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );

      wrapper.should.not.equal(undefined);
    });
  });

  describe('handleChangeInput', () => {
    it('should have been called and changed field value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <InputWidget
          schema={{type: ['string']}}
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

      wrapper.find(Input).simulate('change', {target: {value: 'bar'}});
      setFieldValue.should.calledWith('foo', 'bar');
    });
  });

  describe('handleChangeInputNumber', () => {
    it('should have been called and changed field value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <InputWidget
          schema={{type: ['number']}}
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

      wrapper.find(InputNumber).simulate('change', 1);
      setFieldValue.should.calledWith('foo', 1);
    });

    it('should have been called and changed field value to null when input is cleared', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <InputWidget
          schema={{type: ['number']}}
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

      wrapper.find(InputNumber).simulate('change', undefined);
      setFieldValue.should.calledWith('foo', null);
    });
  });
});
