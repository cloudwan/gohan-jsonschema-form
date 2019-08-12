import {ErrorMessage, FastField} from 'formik';
import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import Errors from '../components/Errors';
import validator from '../Validator';
import {selectWidget} from '../widgets';

export class StringField extends React.Component<IWidget> {
  private widget;
  public render(): React.ReactNode {
    const {
      schema,
      schema: {format},
      uiSchema,
      id,
    } = this.props;

    const Widget = selectWidget(format || 'Input');

    return (
      <React.Fragment>
        <ErrorMessage name={id} />
        <FastField name={id} validate={this.validate}>
          {({field, form}) => (
            <Widget
              schema={schema}
              uiSchema={uiSchema}
              ref={c => {
                this.widget = c;
              }}
              field={field}
              form={form}
            />
          )}
        </FastField>
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

      if (validator.errors) {
        errors.push(...validator.errors);
      }
    }

    if (this.widget && this.widget.errors && this.widget.errors.length > 0) {
      errors.push(...this.widget.errors);
    }

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    return errors.length > 0 ? <Errors errors={errors} /> : undefined;
  };
}

export default StringField;
