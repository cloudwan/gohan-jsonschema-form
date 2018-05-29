import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, InputNumber} from 'antd';

import validator from '../Validator';

import Asterisk from '../components/Asterisk';
import Label from '../components/Label';
import Description from '../components/Description';
import Errors from '../components/Errors';

import 'antd/lib/input/style';
import 'antd/lib/input-number/style';
import styles from './InputWidget.css';

export default class InputWidget extends Component {
  static defaultProps = {
    uiSchema: {},
    isRequired: false,
    value: '',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value === undefined ? '' : this.props.value,
      errors: [],
    };
  }

  get value() {
    const {
      schema: {type},
    } = this.props;
    const {value} = this.state;

    if (type.includes('null') && !value) {
      return null;
    }
    if (type.includes('string')) {
      return value;
    }
    return Number(value);
  }

  get isValid() {
    const {
      isRequired,
      schema,
      schema: {type},
    } = this.props;
    const {value} = this.state;
    const errors = [];

    if (isRequired && !value) {
      errors.push({
        message: 'required',
      });
    }

    if (type.includes('string')) {
      validator.validate(schema, value);
    } else {
      validator.validate(schema, Number(value));
    }

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    this.setState({errors});

    return errors.length === 0;
  }

  handleChangeInput = event => {
    event.preventDefault();
    const value = event.target.value;

    this.setState({value}, () => this.isValid);
  };

  handleChangeInputNumber = value => {
    this.setState(
      {
        value: value === '' ? 0 : value,
      },
      () => this.isValid,
    );
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      isRequired,
      schema,
      schema: {title, description, type},
      uiSchema,
    } = this.props;
    const {'ui:title': uiTitle, 'ui:description': uiDescription} = uiSchema;
    const {value, errors} = this.state;
    const additionalProps = {};

    if (type.includes('number')) {
      additionalProps.max = schema.maximum;
      additionalProps.min = schema.min;
      additionalProps.step = schema.step || 0.00001;
    } else if (type.includes('integer')) {
      additionalProps.max = schema.maximum;
      additionalProps.min = schema.minimum;
      additionalProps.step = schema.step || 1;
    } else {
      additionalProps.maxLength = schema.maxLength;
    }

    return (
      <div className={styles.inputWidget}>
        <Label htmlFor={title}>
          {uiTitle || title}
          {isRequired && <Asterisk />}
        </Label>
        <Description>{uiDescription || description}</Description>
        {(type === 'number' || type === 'integer') && (
          <InputNumber
            id={title}
            className={styles.inputNumber}
            value={value}
            onChange={this.handleChangeInputNumber}
            {...additionalProps}
          />
        )}
        {type !== 'number' &&
          type !== 'integer' && (
            <Input
              id={title}
              type={Array.isArray(type) ? type[0] : type}
              value={value}
              onChange={this.handleChangeInput}
              {...additionalProps}
            />
          )}
        <Errors errors={errors} />
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  InputWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    isRequired: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
}
