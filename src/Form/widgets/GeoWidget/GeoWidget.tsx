import * as React from 'react';
import {Map} from 'react-leaflet';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

export default class GeoWidget extends React.Component<IWidget> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div>geo widget</div>
        <Map />
      </div>
    );
  }
}
