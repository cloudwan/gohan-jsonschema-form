import {Select} from 'antd';
import * as React from 'react';

import Asterisk from '../components/Asterisk';
import Description from '../components/Description';
import Errors from '../components/Errors';
import Label from '../components/Label';

import validator from '../Validator';

import 'antd/lib/select/style';
import * as styles from './SelectWidget.css';

const {Option} = Select;

interface TSelectWidgetProps {
  schema: any;
  uiSchema?: any;
  value?: any;
  isRequired?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  searchThreshold?: number;
}

interface TSelectWidgetState {
  errors: any[];
  value: any;
}
export default class SelectWidget extends React.Component<
  TSelectWidgetProps,
  TSelectWidgetState
> {
  public static defaultProps = {
    value: '',
    searchThreshold: 6,
    disabled: false,
    readonly: false,
    isRequired: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value:
        this.props.value === undefined &&
        this.props.schema.type.includes('null')
          ? null
          : this.props.value,
      errors: [],
    };
  }

  get value() {
    return this.state.value;
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

    if (type.includes('string') || type.includes('array')) {
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

  public handleChangeInput = value => {
    const {
      schema: {type},
    } = this.props;

    this.setState(
      {
        value:
          type.includes('string') || type.includes('array')
            ? value === undefined && type.includes('null')
              ? null
              : value
            : Number(value),
      },
      () => this.isValid,
    );
  };

  public render() {
    const {
      schema: {title, description, type, enum: enumItems, items},
      isRequired,
      searchThreshold,
      disabled,
      readonly,
    } = this.props;

    const {value, errors} = this.state;

    const enums = enumItems || items.enum;
    const haystack = type.includes('string')
      ? enums
      : enums.map(i => i.toString());
    const inputValue =
      type.includes('string') || type.includes('array')
        ? value
        : value.toString();

    return (
      <div className={styles.selectWidget}>
        <Label htmlFor={title}>
          {title}
          {isRequired && <Asterisk />}
        </Label>
        <Description>{description}</Description>
        <Select
          className={styles.select}
          allowClear={type.includes('null')}
          value={inputValue}
          disabled={disabled || readonly}
          placeholder="Not selected"
          onChange={this.handleChangeInput}
          showSearch={haystack.length >= searchThreshold}
          mode={Array.isArray(value) ? 'multiple' : 'default'}
        >
          {haystack.map(item => {
            if (typeof item === 'object') {
              return (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              );
            } else if (typeof item === 'string') {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            }

            return (
              <Option key={item} value={item}>
                {`Unsupported type of haystack items (${typeof item})`}
              </Option>
            );
          })}
        </Select>
        <Errors errors={errors} />
      </div>
    );
  }
}
