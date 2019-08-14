import {FastField} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import validator from '../../Validator';
import {CodeEditorWidget} from '../../widgets';

import SchemaHint from './components/SchemaHint';

export class YamlField extends React.Component<IWidget> {
  private widget;
  public render(): React.ReactNode {
    const {schema, uiSchema, id} = this.props;

    return (
      <React.Fragment>
        <FastField name={id} validate={this.validate}>
          {({field, form}) => (
            <React.Fragment>
              <CodeEditorWidget
                schema={schema}
                uiSchema={uiSchema}
                field={field}
                form={form}
              />
            </React.Fragment>
          )}
        </FastField>
        {schema.type && schema.type.includes('object') && (
          <SchemaHint schema={schema.properties} />
        )}
      </React.Fragment>
    );
  }

  private validate = value => {
    const {schema, isRequired} = this.props;
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

    if (this.widget && this.widget.errors && this.widget.errors.length > 0) {
      errors.push(...this.widget.errors);
    }

    return errors.length > 0 ? errors : undefined;
  };
}

export default YamlField;
