import {FieldProps} from 'formik';
import moment from 'moment';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';

import DateTimePicker from './components/DateTimePicker';

interface TDateTimeWidgetState {
  value?: moment.Moment | null | undefined;
  errors: any[];
}

export class DateTimeWidget extends React.Component<
  IWidget & FieldProps,
  TDateTimeWidgetState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  public render(): React.ReactNode {
    const {
      field: {value},
    } = this.props;

    return (
      <DateTimePicker
        onChange={this.handleInputChange}
        onOk={this.handleInputChange}
        value={!value ? value : moment(value)}
      />
    );
  }

  private handleInputChange = (value: moment.Moment): void => {
    const type: string | string[] = this.props.schema.type;
    const fieldValue = value
      ? value.format()
      : type.includes('null') && value === null
        ? null
        : undefined;

    this.props.form.setFieldValue(this.props.field.name, fieldValue);
  };
}

export default DateTimeWidget;
