import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import CodeEditorWidget from './CodeEditorWidget';

chai.should();
chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<CodeEditorWidget/>', () => {
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
    it('should match snapshot for minimal number of props', () => {
      const wrapper = shallow(
        <CodeEditorWidget
          schema={{
            format: 'text',
          }}
          form={formikFormProps}
          field={{
            value: '',
            onChange: () => null,
            onBlur: () => null,
            name: 'foo',
          }}
          isRequired={false}
        />,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
