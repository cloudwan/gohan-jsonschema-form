import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import Fieldset, {orderProperties} from './Fieldset';

chai.use(chaiEnzyme());
chai.should();

describe('<Fieldset/>', () => {
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
    it('should match snapshot when Fieldset is tab', () => {
      const wrapper = shallow(
        <Fieldset
          isTab={true}
          form={formikFormProps}
          field={{
            value: '',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
          schema={{
            type: ['object'],
            properties: {
              baz: {
                title: 'Baz',
                type: ['string'],
              },
              bar: {
                title: 'Bar',
                type: ['number'],
              },
            },
            required: ['baz'],
            propertiesOrder: ['bar', 'baz'],
          }}
          isRequired={false}
        >
          test
        </Fieldset>,
      );

      wrapper.should.to.matchSnapshot();
    });

    it("should match snapshot when Fieldset isn't tab", () => {
      const wrapper = shallow(
        <Fieldset
          isTab={false}
          form={formikFormProps}
          field={{
            value: '',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
          schema={{
            type: ['object'],
            properties: {
              baz: {
                title: 'Baz',
                type: ['string'],
              },
              bar: {
                title: 'Bar',
                type: ['number'],
              },
            },
            required: ['baz'],
            propertiesOrder: ['bar', 'baz'],
          }}
          isRequired={false}
        >
          test
        </Fieldset>,
      );

      wrapper.should.to.matchSnapshot();
    });
  });

  // describe('handleToggleButtonClick', () => {
  //   it('should create empty object when value is undefined', () => {
  //     const wrapper = shallow(
  //       <ObjectField
  //         schema={{
  //           type: ['object'],
  //           properties: {
  //             foo: {
  //               title: 'Foo',
  //               type: ['string'],
  //             },
  //           },
  //           propertiesOrder: ['foo'],
  //         }}
  //       />,
  //     );
  //     const instance = wrapper.instance() as ObjectField;
  //     instance.handleToggleButtonClick();
  //     wrapper.state().isNull.should.equal(false);
  //     wrapper.state().value.should.deep.equal({});
  //   });

  //   it('should change value to null and isNull flag to true when object exists', () => {
  //     const wrapper = shallow(
  //       <ObjectField
  //         schema={{
  //           type: ['object'],
  //           properties: {
  //             foo: {
  //               title: 'Foo',
  //               type: ['string'],
  //             },
  //           },
  //           propertiesOrder: ['foo'],
  //         }}
  //       />,
  //     );
  //     const instance = wrapper.instance() as ObjectField;
  //     wrapper.setState({value: {}});
  //     instance.handleToggleButtonClick();
  //     wrapper.state().isNull.should.equal(true);
  //     should.equal(wrapper.state().value, null);
  //   });
  // });

  describe('orderProperties', () => {
    it('should return empty array when there are no properties', () => {
      const result = orderProperties();
      const expected = [];

      result.should.deep.equal(expected);
    });

    it('should return sorted properties', () => {
      const result = orderProperties(['foo', 'bar', 'baz'], ['bar', 'baz']);
      const expected = ['bar', 'baz', 'foo'];

      result.should.deep.equal(expected);
    });

    it("should return return unsorted properties when order isn't defined", () => {
      const result = orderProperties(['foz', 'foo', 'bar']);
      const expected = ['foz', 'foo', 'bar'];

      result.should.deep.equal(expected);
    });

    it('should throw an error when order contains property which is not included in properties passed to function', () => {
      (() => orderProperties(['foz'], ['foo', 'foz'])).should.throw(
        Error,
        "uiSchema order list contains extraneous property 'foo'",
      );
    });

    it('should throw an error when order contains properties which are not included in properties passed to function', () => {
      (() => orderProperties([], ['foo', 'foz'])).should.throw(
        Error,
        "uiSchema order list contains extraneous properties 'foo, foz'",
      );
    });
  });
});
