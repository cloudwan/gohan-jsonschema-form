import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';
import sinonChai from 'sinon-chai';

import CodeEditorWidget, {getStringValue, getMode} from './CodeEditorWidget';

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
          uiSchema={{}}
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

describe('getStringValue', () => {
  it('should return unmodified string value', () => {
    const result = getStringValue('test');
    const expected = 'test';

    result.should.equal(expected);
  });

  it('should return empty string for empty object value', () => {
    const result = getStringValue({});
    const expected = '';

    result.should.equal(expected);
  });

  it('should return empty string for object with keys and undefined values', () => {
    const result = getStringValue({
      foo: undefined,
      bar: {
        baz: undefined,
      },
    });
    const expected = '';

    result.should.equal(expected);
  });

  it('should return parsed string for object value', () => {
    const result = getStringValue({
      foo: 'foz',
      bar: {
        baz: false,
      },
    });
    const expected = 'bar:\n  baz: false\nfoo: foz\n';

    result.should.equal(expected);
  });
});

describe('getMode', () => {
  it('should return text format', () => {
    const result = getMode();
    const expected = 'text';

    result.should.equal(expected);
  });

  it('should return javascript format', () => {
    const result = getMode('js');
    const expected = 'javascript';

    result.should.equal(expected);
  });

  it('should return yaml format', () => {
    const result = getMode('yaml');
    const expected = 'yaml';

    result.should.equal(expected);
  });
});
