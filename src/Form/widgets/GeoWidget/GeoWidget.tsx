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
    const value = this.props.field.value
      ? {
          lat: this.props.field.value.lat,
          lng: this.props.field.value.lon,
        }
      : this.props.field.value;

    return <GeoMap onChange={this.handleChange} value={value} />;
  }

  private handleChange = (value: LatLngExpression): void => {
    if (!Array.isArray(value)) {
      const path = this.props.field.name ? `${this.props.field.name}.` : '';
      this.props.form.setFieldValue(`${path}lat`, value.lat);
      this.props.form.setFieldValue(`${path}lon`, value.lng);
    }
  };
}
