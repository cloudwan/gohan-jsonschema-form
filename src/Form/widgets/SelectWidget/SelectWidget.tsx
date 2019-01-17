import {FieldProps} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Select from './components/Select';

interface TSelectWidgetState {
  errors: any[];
  options: any[];
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
    const {
      schema,
      schema: {options, items},
    } = this.props;

    this.state = {
      options:
        options ||
        schema.enum ||
        (items ? items['options'] || items['enum'] : []), //tslint:disable-line
      errors: [],
    };
  }

  public get errors() {
    return this.state.errors;
  }

  public render(): React.ReactNode {
    const {
      schema: {type, items},
    } = this.props;
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
      <Select
        value={this.props.field.value}
        mode={mode}
        onFocus={this.handleFocus}
        onChange={this.handleChangeInput}
        options={selectOptions}
        showSearch={haystack.length >= 5}
        optionFilterProp="children"
        notFoundContent={!this.props.fetcher ? undefined : 'Loading...'}
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
      const options = await this.props.fetcher(relation);
      this.setState({options});
    } catch (error) {
      console.error(error);
      const errors = [{message: 'Cannot fetch data!'}];

      this.setState({errors});
    }
  };
}
