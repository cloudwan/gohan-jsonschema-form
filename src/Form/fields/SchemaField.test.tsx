import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import {SchemaField} from './SchemaField';
chai.use(chaiEnzyme);
chai.should();

describe('<SchemaField />', () => {
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
    it('should match snapshot when uischema widget defined as function', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
          }}
          uiSchema={{
            'ui:widget': props => <div>test</div>,
          }}
          formik={formikFormProps}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when uischema widget is hidden', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
          }}
          uiSchema={{
            'ui:widget': 'Hidden',
          }}
          formik={formikFormProps}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when uischema widget defined as string', () => {
      const wrapper = shallow(
        <SchemaField
          schema={{
            title: 'test string',
            type: 'string',
          }}
          uiSchema={{
            'ui:widget': 'CodeEditor',
          }}
          formik={formikFormProps}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is object', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is object w/o properties', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'object',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    // it('should match snapshot when schema type is array', () => {
    //   const wrapper = shallow(
    //     <SchemaField
    //       schema={{
    //         title: 'test string',
    //         type: 'array',
    //       }}
    //     />,
    //   );

    //   wrapper.should.to.matchSnapshot();
    // });

    it('should match snapshot when schema type is boolean', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'boolean',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema has enum', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'string',
            enum: ['test1', 'test2'],
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is string', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'string',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is integer', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'integer',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is number', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'integer',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });

    it('should match snapshot when schema type is incorrect', () => {
      const wrapper = shallow(
        <SchemaField
          formik={formikFormProps}
          schema={{
            title: 'test string',
            type: 'void',
          }}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
