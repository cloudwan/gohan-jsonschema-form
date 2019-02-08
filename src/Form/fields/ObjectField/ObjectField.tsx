import {Field} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import ErrorMessage from '../../components/ErrorMessage';
import {validateField} from '../../utils';
import Fieldset from './components/Fieldset';

export default class ObjectField extends React.Component<IWidget> {
  public render(): JSX.Element {
    const {id, schema, uiSchema, isRequired} = this.props;

    return (
      <React.Fragment>
        <ErrorMessage name={id} />
        <Field
          name={id}
          schema={schema}
          uiSchema={uiSchema}
          isRequired={isRequired}
          component={Fieldset}
          validate={this.validate}
        />
      </React.Fragment>
    );
  }

  private validate = value => {
    if (this.props.isRequired && !value) {
      return [{message: 'Required'}];
    }

    return undefined;
  };
}
