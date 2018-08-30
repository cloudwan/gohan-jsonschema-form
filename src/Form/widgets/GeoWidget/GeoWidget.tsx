import {LatLngExpression} from 'leaflet';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';
import GeoMap from './components/GeoMap';

interface TGeoWidgetState {
  value?: LatLngExpression | undefined | null;
  errors: any[];
}

export default class GeoWidget extends React.Component<
  IWidget,
  TGeoWidgetState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  constructor(props) {
    super(props);

    const {
      value,
      schema: {properties},
    } = props;

    if (!isEmpty(value)) {
      this.state = {
        errors: [],
        value,
      };
    } else {
      this.state = {
        errors: [],
        value: {
          lat: properties.lat.default,
          lng: properties.lng.default,
        },
      };
    }
  }

  public get value(): LatLngExpression {
    return this.state.value;
  }

  public get isValid(): boolean {
    const {schema} = this.props;
    const errors = [];

    validator.validate(schema, this.value);

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    this.setState({errors});

    return errors.length === 0;
  }

  public render() {
    return (
      <React.Fragment>
        <Errors errors={this.state.errors} />
        <GeoMap onChange={this.handleChange} value={this.state.value} />
      </React.Fragment>
    );
  }

  private handleChange = (value: LatLngExpression): void => {
    this.setState({value});
  };
}
