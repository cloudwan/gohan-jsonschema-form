import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox} from 'antd';

import Asterisk from '../components/Asterisk';
import Description from '../components/Description';

import 'antd/lib/checkbox/style';
import styles from './CheckboxWidget.css';

export default class CheckboxWidget extends Component {
  static defaultProps = {
    value: false,
    isRequired: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      checked: this.props.value,
    };
  }

  get value() {
    return this.state.checked;
  }

  handleChangeCheckbox = event => {
    this.setState({checked: event.target.checked});
  };

  render() {
    const {
      schema: {title, description},
      isRequired,
    } = this.props;
    const {checked} = this.state;

    return (
      <div className={styles.checkboxWidget}>
        <Checkbox checked={checked} onChange={this.handleChangeCheckbox}>
          {title}
          {isRequired && <Asterisk />}
        </Checkbox>
        {description && <Description>{description}</Description>}
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    isRequired: PropTypes.bool,
    value: PropTypes.bool,
  };
}
