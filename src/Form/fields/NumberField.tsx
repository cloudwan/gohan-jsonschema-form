import {ErrorMessage, FastField} from 'formik';
import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import Errors from '../components/Errors';
import validator from '../Validator';
import InputWidget from '../widgets/InputWidget';

export class NumberField extends React.Component<IWidget> {
  public render(): React.ReactNode {
    const {schema, uiSchema, id} = this.props;

    return (
      <React.Fragment>
        <ErrorMessage name={id} />
        <FastField
          name={id}
          schema={schema}
          uiSchema={uiSchema}
          validate={this.validate}
          component={InputWidget}
        />
      </React.Fragment>
    );
  }

  private validate = value => {
    const {isRequired, schema} = this.props;
    const errors = [];

    if (isRequired && !value) {
      errors.push({message: 'Required'});
    }

    if (value !== undefined) {
      validator.validate(schema, value);
    }

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    return errors.length > 0 ? <Errors errors={errors} /> : undefined;
  };
}

export default NumberField;
