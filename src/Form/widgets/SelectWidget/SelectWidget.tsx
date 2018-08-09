import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

import Select from './components/Select';

interface TSelectWidgetState {
  errors: any[];
  value: any;
}

export default class SelectWidget extends React.Component<
  IWidget,
  TSelectWidgetState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value:
        props.value === null && props.schema.type.includes('null')
          ? null
          : props.value || props.schema.default,
      errors: [],
    };
  }

  public get value(): string | number | null | undefined {
    const {value} = this.state;
    const {type} = this.props.schema;

    if (value === '' && String.prototype.includes.call(type, 'null')) {
      return null;
    }

    return value;
  }

  public get isValid(): boolean {
    const {isRequired, schema} = this.props;
    const {value} = this.state;

    const errors = [];

    if (isRequired && !value) {
      errors.push({
        message: 'required',
      });
    }

    if (value !== undefined) {
      validator.validate(schema, value);
    }

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    this.setState({errors});

    return errors.length === 0;
  }

  private handleChangeInput = (value: string | number | null): void => {
    this.setState(
      {
        value,
      },
      () => this.isValid,
    );
  };

  public render(): React.ReactNode {
    // tslint:disable-line
    const {
      schema,
      schema: {type, options, items},
    } = this.props;
    const {value, errors} = this.state;
    const mode =
      String.prototype.includes.call(type, 'array') && items !== undefined
        ? 'multiple'
        : 'default';
    const enums = options || schema.enum || items['options'] || items['enum']; //tslint:disable-line
    const haystack = Array.isArray(enums)
      ? enums
      : Object.keys(enums).map(i => ({
          value: i,
          label: enums[i],
        }));

    const selectOptions = haystack.map((enumValue, i) => {
      let optionLabel = enumValue;
      let optionValue = enumValue;

      if (enumValue === null) {
        optionLabel = 'Not selected';
      } else if (typeof enumValue === 'object') {
        optionLabel = enumValue.label;
        optionValue = enumValue.value;
      }

      return {
        value: optionValue,
        label: optionLabel,
      };
    });

    return (
      <React.Fragment>
        <Select
          value={value}
          mode={mode}
          onChange={this.handleChangeInput}
          options={selectOptions}
          showSearch={haystack.length >= 5}
          optionFilterProp="children"
        />
        <Errors errors={errors} />
      </React.Fragment>
    );
  }
}
