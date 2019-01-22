import {Field} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
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
        <Field
          name={id}
          schema={schema}
          isRequired={isRequired}
          component={Fieldset}
        />
      </React.Fragment>
    );
  }
}
