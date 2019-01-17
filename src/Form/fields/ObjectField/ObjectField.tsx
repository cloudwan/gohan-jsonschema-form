import {ErrorMessage, Field} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';
import Fieldset from './components/Fieldset';

interface TObjectFieldState {
  errors: any[];
  isNull?: boolean;
}

export default class ObjectField extends React.Component<
  IWidget,
  TObjectFieldState
> {
  public render(): JSX.Element {
    const {id, schema, isRequired} = this.props;

    return (
      <React.Fragment>
        {id && <ErrorMessage name={id} />}
        <Field
          name={id}
          schema={schema}
          isRequired={isRequired}
          validate={this.validate}
          component={Fieldset}
        />
      </React.Fragment>
    );
  }

  private validate = value => {
    const {schema, isRequired} = this.props;
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
