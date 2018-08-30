import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

export default class GeoWidget extends React.Component<IWidget> {
  constructor(props) {
    super(props);
  }

  public render() {
    return <div>geo widget</div>;
  }
}
