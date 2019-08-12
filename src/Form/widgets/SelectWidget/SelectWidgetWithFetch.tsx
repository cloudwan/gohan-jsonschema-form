import {FieldProps} from 'formik';
import {get} from 'lodash';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Select from './components/Select';

const PROP_REGEX = /<%([^%>]+)?%>/g;
const SYMBOL_REGEX = /^(<%)|(%>)$/g;

type TFetcher = (
  url: string,
  query?: {[key: string]: any},
) => Promise<{[key: string]: any}>;

interface ISelectWidgetState {
  errors: any[];
  options: any[];
  isLoading: boolean;
}

interface ISelectWidgetProps extends IWidget, FieldProps {
  fetcher?: TFetcher;
}

/*
  TODO:
    * Better fetch on demand
    * Better custom labels handling for updating existing data
*/

export const getSelectOptions = async (
  url: string,
  baseQuery: {[key: string]: any},
  fetcher: TFetcher,
  template?: string,
  propRegEx: RegExp = PROP_REGEX,
  symbolRegEx: RegExp = SYMBOL_REGEX,
): Promise<Array<{value: string; label: string}>> => {
  let data;
  let id;

  if (template) {
    const props = template
      .match(propRegEx)
      .map(matched => matched.replace(symbolRegEx, ''));

    const query = {
      ...baseQuery,
      _fields: ['id', ...props],
    };

    data = await fetcher(url, query);

    id = Object.keys(data)[0];

    return data[id].map(option => ({
      value: option.id,
      label: parseLabelTemplate(template, option),
    }));
  }

  data = await fetcher(url);

  id = Object.keys(data)[0];

  return data[id].map(option => ({
    value: option.id,
    label: option.name || option.id,
  }));
};

export const parseLabelTemplate = (
  template: string = '',
  data: object = {},
  propRegEx: RegExp = PROP_REGEX,
  symbolRegEx: RegExp = SYMBOL_REGEX,
): string =>
  template.match(propRegEx).reduce((result, propTemplate) => {
    if (propTemplate) {
      return result.replace(
        propTemplate,
        get(data, propTemplate.replace(symbolRegEx, '').split('.')),
      );
    }

    return result;
  }, template);

export default class SelectWidget extends React.Component<
  ISelectWidgetProps,
  ISelectWidgetState
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

  public async componentDidMount() {
    const {
      schema: {request = {}},
      fetcher,
      uiSchema,
      field,
    } = this.props;

    if (
      request.url &&
      fetcher &&
      field.value !== undefined &&
      !(Array.isArray(field.value) && field.value.length === 0)
    ) {
      this.setState({isLoading: true});

      const options = await getSelectOptions(
        request.url,
        request.query,
        fetcher,
        uiSchema['ui:label'] ? uiSchema['ui:label'].template : undefined,
      );

      this.setState({options, isLoading: false});
    }
  }

  public render(): React.ReactNode {
    const {schema} = this.props;
    const type: string | string[] = schema.type;
    let options = [];

    if (this.state.options && this.state.options.length > 0) {
      options = this.state.options;
    } else {
      if (schema.options) {
        options = schema.options;
      } else if (schema.enum) {
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
        onChange={this.handleChangeInput}
        onFocus={this.handleFocus}
        options={this.state.isLoading ? [] : selectOptions}
        showSearch={haystack.length >= 5}
        optionFilterProp="children"
        notFoundContent={this.state.isLoading ? 'Loading...' : undefined}
        loading={this.state.isLoading}
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
      schema: {request = {}},
      uiSchema,
      fetcher,
    } = this.props;

    try {
      if (!this.state.options || this.state.options.length === 0) {
        this.setState({isLoading: true});

        const options = await getSelectOptions(
          request.url,
          request.query,
          fetcher,
          uiSchema['ui:label'] ? uiSchema['ui:label'].template : undefined,
        );

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
