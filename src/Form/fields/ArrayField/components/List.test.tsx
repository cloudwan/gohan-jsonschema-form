import * as chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';
import * as React from 'react';

import List from './List';

chai.use(chaiEnzyme());
chai.should();

describe('<List/>', () => {
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

  const arrayHelpers = {
    push: () => null,
    handlePush: () => () => null,
    swap: () => null,
    handleSwap: () => () => null,
    move: () => null,
    handleMove: () => () => null,
    insert: () => null,
    handleInsert: () => () => null,
    replace: () => null,
    handleReplace: () => () => null,
    unshift: () => null,
    handleUnshift: () => () => null,
    handleRemove: () => () => null,
    handlePop: () => () => null,
    remove: () => null,
    pop: () => null,
  };

  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <List
          name="foo"
          schema={{
            type: ['array'],
            items: {
              type: ['string'],
              default: 'bar',
            },
          }}
          form={{
            ...formikFormProps,
            values: {
              foo: [],
            },
          }}
          {...arrayHelpers}
        >
          test
        </List>,
      );

      wrapper.should.to.matchSnapshot();
    });
  });
});
