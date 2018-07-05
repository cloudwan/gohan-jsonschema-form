import {Select} from 'antd';
import * as React from 'react';

import {asNumber} from './utils';

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
  multiple?: boolean;
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
    multiple: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value:
        this.props.value ||
        this.props.schema.default ||
        (this.props.multiple ? [] : ''),
      errors: [],
    };
  }

  get value() {
    const {value} = this.state;
    const isInputEmpty = !value || (Array.isArray(value) && value.length === 0);

    if (isInputEmpty && this.props.schema.type.includes('null')) {
      return null;
    }

    return value;
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
    this.setState(
      {
        value: this.processValue(this.props.schema, value),
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
      multiple,
    } = this.props;

    const {value, errors} = this.state;

    const enums = enumItems || items.enum;
    const haystack = type.includes('string')
      ? enums
      : enums.map(i => i.toString());

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
          value={value}
          disabled={disabled || readonly}
          placeholder="Not selected"
          onChange={this.handleChangeInput}
          showSearch={haystack.length >= searchThreshold}
          mode={multiple ? 'multiple' : 'default'}
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

  private processValue = ({type, items}, value) => {
    if (value === '') {
      return undefined;
    } else if (
      type === 'array' &&
      items &&
      ['number', 'integer'].includes(items.type)
    ) {
      return value.map(asNumber);
    } else if (type === 'boolean') {
      return value === 'true';
    } else if (type === 'number') {
      return asNumber(value);
    }
    return value;
  };
}
