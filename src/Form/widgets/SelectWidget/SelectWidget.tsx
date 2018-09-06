import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

import Select from './components/Select';

interface TSelectWidgetState {
  errors: any[];
  value: any;
  options: any[];
}

interface ISelectWidgetProps extends IWidget {
  fetcher?: (
    relation: string,
  ) => Promise<Array<{label: string; value: string}>>;
}
export default class SelectWidget extends React.Component<
  ISelectWidgetProps,
  TSelectWidgetState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  constructor(props, context) {
    super(props, context);
    const {
      schema,
      schema: {options, items},
    } = this.props;

    this.state = {
      options:
        options ||
        schema.enum ||
        (items ? items['options'] || items['enum'] : []), //tslint:disable-line
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
      schema: {type, items},
    } = this.props;
    const {value, errors} = this.state;
    const mode =
      String.prototype.includes.call(type, 'array') && items !== undefined
        ? 'multiple'
        : 'default';
    const haystack = Array.isArray(this.state.options)
      ? this.state.options
      : Object.keys(this.state.options).map(i => ({
          value: i,
          label: this.state.options[i],
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
          onFocus={this.handleFocus}
          onChange={this.handleChangeInput}
          options={selectOptions}
          showSearch={haystack.length >= 5}
          optionFilterProp="children"
          notFoundContent={!this.props.fetcher ? undefined : 'Loading...'}
        />
        <Errors errors={errors} />
      </React.Fragment>
    );
  }

  private handleFocus = async () => {
    if (!this.props.fetcher) {
      return;
    }

    const {
      schema: {relation},
    } = this.props;

    try {
      const options = await this.props.fetcher(relation);

      this.setState({options});
    } catch (error) {
      console.error(error);
      const errors = [{message: 'Cannot fetch data!'}];

      this.setState({errors});
    }
  };
}
