import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';

import Select from './components/Select';
import SelectWidget from './SelectWidget';

chai.use(chaiEnzyme());
const should = chai.should();

describe('<SelectWidget />', () => {
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
        <SelectWidget
          schema={{
            type: ['string'],
            enum: ['foo', 'bar', 'baz'],
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

    it('should render elements for multiple choice select', () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{
            type: ['array'],
            items: {
              type: ['string'],
              enum: ['foo', 'bar', 'baz'],
            },
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

  describe('handleChangeInput', () => {
    it('should have been called and changed field value', () => {
      const setFieldValue = sinon.spy();
      const wrapper = shallow(
        <SelectWidget
          schema={{
            type: ['string'],
            enum: ['foo', 'bar', 'baz'],
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

      wrapper.find(Select).simulate('change', 'bar');
      should.equal(setFieldValue.calledWith('foo', 'bar'), true);
    });
  });

  describe('errors', () => {
    it('should return errors array', () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{
            title: 'test string',
            type: 'string',
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

      wrapper.setState({errors: [{message: 'Cannot fetch data!'}]});
      const instance = wrapper.instance() as SelectWidget;
      instance.errors.should.deep.equal([{message: 'Cannot fetch data!'}]);
    });
  });

  describe('listener handleFocus', () => {
    it("shouldn't change state", async () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{
            title: 'test string',
            type: 'string',
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

      const state = wrapper.state();
      const instance = wrapper.instance() as SelectWidget;
      await instance.handleFocus();
      wrapper.state().should.deep.equal(state);
      wrapper.should.to.matchSnapshot();
    });

    it('should update options in state', async () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{
            title: 'test string',
            type: 'string',
          }}
          fetcher={() => [{value: 'foo', label: 'Foo'}]}
          form={formikFormProps}
          field={{
            value: undefined,
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );
      const state = {
        ...wrapper.state(),
        options: [{value: 'foo', label: 'Foo'}],
      };
      const instance = wrapper.instance() as SelectWidget;

      await instance.handleFocus();
      wrapper.state().should.deep.equal(state);
      wrapper.should.to.matchSnapshot();
    });

    it('should handle error message state', async () => {
      const wrapper = shallow(
        <SelectWidget
          schema={{
            title: 'test string',
            type: 'string',
          }}
          fetcher={async () => new Promise((undefined, reject) => reject())}
          form={formikFormProps}
          field={{
            value: undefined,
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
        />,
      );
      const state = {
        ...wrapper.state(),
        errors: [{message: 'Cannot fetch data!'}],
      };
      const instance = wrapper.instance() as SelectWidget;

      await instance.handleFocus();
      wrapper.state().should.deep.equal(state);
      wrapper.should.to.matchSnapshot();
    });
  });
});
