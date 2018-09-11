import moment from 'moment';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

import DateTimePicker from './components/DateTimePicker';

interface TDateTimeWidgetState {
  value?: moment.Moment | null | undefined;
  errors: any[];
}

export class DateTimeWidget extends React.Component<
  IWidget,
  TDateTimeWidgetState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  constructor(props) {
    super(props);

    const {value, schema} = props;

    let initialValue;

    if (!value) {
      if (value === null) {
        initialValue = value;
      } else if (schema.default !== undefined) {
        initialValue = moment(schema.default);
      }
    } else {
      initialValue = moment(value);
    }

    this.state = {
      errors: [],
      value: initialValue,
    };
  }

  public get value(): string | null | undefined {
    const {value} = this.state;
    const type: string | string[] = this.props.schema.type;

    if (!value) {
      return type.includes('null') && value === null ? null : undefined;
    }
    return value.format();
  }

  public get isValid(): boolean {
    const {isRequired, schema} = this.props;
    const errors = [];

    if (isRequired && !this.value) {
      errors.push({
        message: 'required',
      });
    }

    if (this.value !== undefined) {
      validator.validate(schema, this.value);
    }

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    this.setState({errors});

    return errors.length === 0;
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <Errors errors={this.state.errors} />
        <DateTimePicker
          onChange={this.handleInputChange}
          onOk={this.handleSubmitClick}
          value={this.state.value}
        />
      </React.Fragment>
    );
  }

  private handleInputChange = (value: moment.Moment): void => {
    this.setState({
      value,
    });
  };

  private handleSubmitClick = (value: moment.Moment): void => {
    this.setState({
      value: value ? value : null,
    });
  };
}

export default DateTimeWidget;
