import {Field} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import RangeWidget from '../../widgets/RangeWidget';

interface TRangeFieldState {
  value?: number[] | undefined | null;
  errors: any[];
}

export default class RangeField extends React.Component<
  IWidget,
  TRangeFieldState
> {
  public render() {
    const {id, schema, uiSchema} = this.props;

    return (
      <Field
        name={id}
        schema={schema}
        uiSchema={uiSchema}
        component={RangeWidget}
      />
    );
  }
}
