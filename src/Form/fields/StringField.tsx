import {Field} from 'formik';
import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import ErrorMessage from '../components/ErrorMessage';
import {validateField} from '../utils';
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
        <Field name={id} validate={this.validate}>
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
        </Field>
      </React.Fragment>
    );
  }

  private validate = value => {
    const errors = validateField(
      value,
      this.props.schema,
      this.props.isRequired,
    );

    return errors;
  };
}

export default StringField;
