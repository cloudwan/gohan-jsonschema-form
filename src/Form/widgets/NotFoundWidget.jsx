import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class NotFoundWidget extends Component {
  static defaultProps = {
    uiSchema: {},
  };

  get value() {
    return undefined;
  }

  get isValid() {
    return false;
  }

  render() {
    return (
      <div style={{background: '#ff0000'}}>
        <p>{'Not Found widget'}</p>
        <p>{JSON.stringify(this.props.schema)}</p>
        <p>{JSON.stringify(this.props.uiSchema)}</p>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  NotFoundWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
  };
}
