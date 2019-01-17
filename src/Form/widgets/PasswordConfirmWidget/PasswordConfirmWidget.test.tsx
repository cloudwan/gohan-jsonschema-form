import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';

import Input from '../../components/Input';
import PasswordConfirmWidget from './PasswordConfirmWidget';

chai.use(chaiEnzyme());
chai.should();

describe('<PasswordConfirmWidget />', () => {
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
      <PasswordConfirmWidget
        schema={{
          type: ['string'],
          format: 'password-confirm',
        }}
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

  describe('render method', () => {
    it('should render elements', () => {
      const wrapper = shallow(
        <PasswordConfirmWidget
          schema={{
            type: ['string'],
            format: 'password-confirm',
          }}
          form={formikFormProps}
          field={{
            value: '',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );

      wrapper.should.not.equal(undefined);
    });
  });

  describe('handleChangePassword', () => {
    it('should have been called and changed state value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <PasswordConfirmWidget
          schema={{
            type: ['string'],
            format: 'password-confirm',
          }}
          form={{
            ...formikFormProps,
            setFieldValue,
          }}
          field={{
            value: '',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );
      const event = {target: {value: 'bar'}};
      wrapper
        .find(Input)
        .first()
        .simulate('change', event);
      setFieldValue.should.calledWith('foo', 'bar');
    });
  });

  describe('handleChangeConfirmPassword', () => {
    it('should have been called and changed state value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <PasswordConfirmWidget
          schema={{
            type: ['string'],
            format: 'password-confirm',
          }}
          form={{
            ...formikFormProps,
            setFieldValue,
          }}
          field={{
            value: '',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );
      const event = {target: {value: 'bar'}};
      wrapper
        .find(Input)
        .last()
        .simulate('change', event);
      wrapper.state('confirmValue').should.equal('bar');
    });
  });

  describe('errors', () => {
    it('should return array of errors when values are not equal', () => {
      const wrapper = shallow(
        <PasswordConfirmWidget
          schema={{
            title: 'Password Confirm',
            type: ['string'],
            format: 'password-confirm',
          }}
          form={formikFormProps}
          field={{
            value: 'baz',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );
      wrapper.setState({confirmValue: 'bar'});
      wrapper
        .instance()
        .errors.should.deep.equal([
          {message: "These Password Confirm values don't match"},
        ]);
    });

    it('should return empty array when values are equal', () => {
      const wrapper = shallow(
        <PasswordConfirmWidget
          schema={{
            title: 'Password Confirm',
            type: ['string'],
            format: 'password-confirm',
          }}
          form={formikFormProps}
          field={{
            value: 'bar',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );
      wrapper.setState({confirmValue: 'bar'});
      wrapper.instance().errors.should.deep.equal([]);
    });
  });
});
