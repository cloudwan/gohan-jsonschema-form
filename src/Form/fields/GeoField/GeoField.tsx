import {Field} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import GeoWidget from '../../widgets/GeoWidget';

export default class GeoField extends React.Component<IWidget> {
  public render() {
    const {id, schema, isRequired} = this.props;

    return (
      <Field
        name={id}
        schema={schema}
        isRequired={isRequired}
        component={GeoWidget}
      />
    );
  }
}
