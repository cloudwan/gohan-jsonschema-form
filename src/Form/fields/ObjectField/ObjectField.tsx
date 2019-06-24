import {FastField} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Fieldset from './components/Fieldset';

export default class ObjectField extends React.Component<IWidget> {
  public render(): JSX.Element {
    const {id, schema, uiSchema, isRequired} = this.props;

    return (
      <FastField
        name={id}
        schema={schema}
        uiSchema={uiSchema}
        isRequired={isRequired}
        component={Fieldset}
      />
    );
  }
}
