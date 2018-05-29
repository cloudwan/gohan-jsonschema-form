import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ObjectWidget} from './widgets';

export class Form extends Component {
  static defaultProps = {
    uiSchema: {},
    formData: {},
  };

  get value() {
    return this.object.value;
  }

  get isValid() {
    return this.object.isValid;
  }

  render() {
    return (
      <form>
        <ObjectWidget
          ref={c => {
            this.object = c;
          }}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          value={this.props.formData}
        />
      </form>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Form.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.object,
  };
}
