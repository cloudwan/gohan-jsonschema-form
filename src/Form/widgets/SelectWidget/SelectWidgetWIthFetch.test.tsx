import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinon from 'sinon';

import Select from './components/Select';
import SelectWidgetWithFetch, {
  getSelectOptions,
  parseLabelTemplate,
} from './SelectWidgetWithFetch';

chai.use(chaiEnzyme());
const should = chai.should();

describe('<SelectWidgetWithFetch />', () => {
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
        <SelectWidgetWithFetch
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
        <SelectWidgetWithFetch
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
        <SelectWidgetWithFetch
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
        <SelectWidgetWithFetch
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
      const instance = wrapper.instance() as SelectWidgetWithFetch;
      instance.errors.should.deep.equal([{message: 'Cannot fetch data!'}]);
    });
  });

  describe('listener handleFocus', () => {
    it("shouldn't change state", async () => {
      const wrapper = shallow(
        <SelectWidgetWithFetch
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
      const instance = wrapper.instance() as SelectWidgetWithFetch;
      await instance.handleFocus();
      wrapper.state().should.deep.equal(state);
      wrapper.should.to.matchSnapshot();
    });

    it('should update options in state', async () => {
      const wrapper = shallow(
        <SelectWidgetWithFetch
          schema={{
            title: 'test string',
            type: 'string',
            relation: 'test',
          }}
          fetcher={async () => ({test: [{id: 'foo', name: 'Foo'}]})}
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
      const instance = wrapper.instance() as SelectWidgetWithFetch;

      await instance.handleFocus();
      wrapper.state().should.deep.equal(state);
      wrapper.should.to.matchSnapshot();
    });

    it('should handle error message state', async () => {
      const wrapper = shallow(
        <SelectWidgetWithFetch
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
      const instance = wrapper.instance() as SelectWidgetWithFetch;

      await instance.handleFocus();
      wrapper.state().should.deep.equal(state);
      wrapper.should.to.matchSnapshot();
    });
  });
});

describe('getSelectOptions', () => {
  it('should fetch options', async () => {
    const result = await getSelectOptions(
      'www.test.com',
      {},
      async () =>
        new Promise(resolve => {
          resolve({
            test: [{name: 'Foo', id: 'foo'}, {name: 'Bar', id: 'bar'}],
          });
        }),
    );

    const expected = [
      {label: 'Foo', value: 'foo'},
      {label: 'Bar', value: 'bar'},
    ];

    result.should.deep.equal(expected);
  });

  it('should fetch options and adjust it to template', async () => {
    const result = await getSelectOptions(
      'www.test.com',
      {},
      async () =>
        new Promise(resolve => {
          resolve({
            test: [
              {name: 'Foo', number: 1, id: 'foo'},
              {name: 'Bar', number: 2, id: 'bar'},
            ],
          });
        }),
      '<%name%> : <%id%> : <%number%>',
    );

    const expected = [
      {label: 'Foo : foo : 1', value: 'foo'},
      {label: 'Bar : bar : 2', value: 'bar'},
    ];

    result.should.deep.equal(expected);
  });
});

describe('parseLabelTemplate', () => {
  it('should parse label', () => {
    const result = parseLabelTemplate('<%test1.name%>-<%test2.name%>', {
      test1: {name: 'Foo'},
      test2: {name: 'Bar'},
    });

    const expected = 'Foo-Bar';

    result.should.equal(expected);
  });
});
