import {FieldProps} from 'formik';
import {LatLngExpression} from 'leaflet';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import GeoMap from './components/GeoMap';

export default class GeoWidget extends React.Component<IWidget & FieldProps> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  public render() {
    return (
      <GeoMap onChange={this.handleChange} value={this.props.field.value} />
    );
  }

  private handleChange = (value: LatLngExpression): void => {
    this.props.form.setFieldValue('lat', value.lat);
    this.props.form.setFieldValue('lng', value.lng);
  };
}
