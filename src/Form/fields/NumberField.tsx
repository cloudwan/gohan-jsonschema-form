import {Field} from 'formik';
import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import ErrorMessage from '../components/ErrorMessage';
import {validateField} from '../utils';
import InputWidget from '../widgets/InputWidget';

export class NumberField extends React.Component<IWidget> {
  public render(): React.ReactNode {
    const {schema, uiSchema, id} = this.props;

    return (
      <React.Fragment>
        <ErrorMessage name={id} />
        <Field
          name={id}
          schema={schema}
          uiSchema={uiSchema}
          validate={this.validate}
          component={InputWidget}
        />
      </React.Fragment>
    );
  }

  private validate = value =>
    validateField(value, this.props.schema, this.props.isRequired);
}

export default NumberField;
