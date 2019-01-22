import {FieldProps} from 'formik';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Range from './components/Range';

export class RangeWidget extends React.Component<IWidget & FieldProps> {
  public static defaultProps = {
    uiSchema: {},
  };

  public render() {
    const {
      schema: {properties},
      uiSchema,
      field: {value},
    } = this.props;
    const uiOptions = uiSchema['ui:options'] || {};
    const {minKey, maxKey} = uiOptions;
    const currentValues = !isEmpty(value)
      ? [value[minKey], value[maxKey]]
      : [
          properties[minKey].default || properties[minKey].minimum,
          properties[maxKey].default || properties[maxKey].maximum,
        ];

    return (
      <Range
        onChange={this.handleChange}
        value={currentValues}
        min={properties[minKey].minimum}
        max={properties[maxKey].maximum}
      />
    );
  }

  private handleChange = value => {
    this.props.form.setFieldValue(
      this.props.uiSchema['ui:options'].minKey,
      value[0],
    );
    this.props.form.setFieldValue(
      this.props.uiSchema['ui:options'].maxKey,
      value[1],
    );
  };
}

export default RangeWidget;
