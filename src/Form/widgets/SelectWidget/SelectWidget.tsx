import {FieldProps} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Select from './components/Select';

interface TSelectWidgetState {
  errors: any[];
  options: any[];
  isLoading: boolean;
}

interface ISelectWidgetProps extends IWidget, FieldProps {
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
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      options: [],
      errors: [],
      isLoading: false,
    };
  }

  public get errors() {
    return this.state.errors;
  }

  public render(): React.ReactNode {
    const {schema} = this.props;
    const type: string | string[] = schema.type;
    let options = [];

    if (this.state.options && this.state.options.length > 0) {
      options = this.state.options;
    } else {
      if (schema.enum) {
        options = schema.enum;
      } else if (schema.items && !Array.isArray(schema.items)) {
        options = schema.items.options || schema.items.enum;
      }
    }
    const haystack = Array.isArray(options)
      ? options
      : Object.keys(options).map(i => ({
          value: i,
          label: options[i],
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
      <Select
        value={this.props.field.value}
        mode={type.includes('array') ? 'multiple' : 'default'}
        onFocus={this.handleFocus}
        onChange={this.handleChangeInput}
        options={this.state.isLoading ? [] : selectOptions}
        showSearch={haystack.length >= 5}
        optionFilterProp="children"
        notFoundContent={this.state.isLoading ? 'Loading...' : undefined}
      />
    );
  }

  private handleChangeInput = (value: string | number | null): void => {
    const type: string | string[] = this.props.schema.type;
    this.props.form.setFieldValue(
      this.props.field.name,
      value === '' && type.includes('null') ? null : value,
    );
  };

  private handleFocus = async () => {
    if (!this.props.fetcher) {
      return;
    }

    const {
      schema: {relation},
    } = this.props;

    try {
      if (!this.state.options || this.state.options.length === 0) {
        this.setState({isLoading: true});
        const options = await this.props.fetcher(relation);
        this.setState({options, isLoading: false});
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
      const errors = [{message: 'Cannot fetch data!'}];

      this.setState({errors, isLoading: false});
    }
  };
}
