import {Button} from 'antd';
import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';

import InputSearch from './components/InputSearch';
import UUIDWidget from './UUIDWidget';

chai.use(chaiEnzyme());
chai.should();

const should = chai.should();

describe('<UUIDWidget />', () => {
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
    it('should match snapshot when schema type is string', () => {
      const wrapper = shallow(
        <UUIDWidget
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

    it('should match snapshot when schema type is string and widget has value', () => {
      const wrapper = shallow(
        <UUIDWidget
          schema={{type: ['string']}}
          form={formikFormProps}
          field={{
            value: 'bar',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is string and widget value is null', () => {
      const wrapper = shallow(
        <UUIDWidget
          schema={{type: ['string', 'null']}}
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
  });

  describe('handleChange', () => {
    it('should have been called and changed value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <UUIDWidget
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
      const event = {target: {value: 'test'}};

      wrapper.find(InputSearch).simulate('change', event);
      setFieldValue.should.calledWith('foo', 'test');
    });
  });

  describe('handleGenerateUUID', () => {
    it('should have been called and changed value when button is clicked', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <UUIDWidget
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

      wrapper.instance().handleGenerateUUID();
      should.equal(setFieldValue.calledOnce, true);
      should.equal(setFieldValue.neverCalledWith(undefined), true);
    });
  });
});
