import {FastField} from 'formik';
import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import validator from '../Validator';
import SwitchWidget from '../widgets/SwitchWidget';

export class BooleanField extends React.Component<IWidget> {
  public render(): React.ReactNode {
    const {schema, uiSchema, id} = this.props;

    return (
      <React.Fragment>
        <FastField
          name={id}
          schema={schema}
          uiSchema={uiSchema}
          validate={this.validate}
          component={SwitchWidget}
        />
      </React.Fragment>
    );
  }

  private validate = value => {
    const {isRequired, schema} = this.props;
    const errors = [];

    if (isRequired && !value) {
      errors.push({message: 'This field cannot be empty'});
    }

    if (value !== undefined) {
      validator.validate(schema, value);

      if (validator.errors) {
        errors.push(...validator.errors);
      }
    }

    return errors.length > 0 ? errors : undefined;
  };
}

export default BooleanField;
