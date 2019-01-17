import {FieldProps} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Input from '../../components/Input';
import Template from '../../fields/Template';

interface TInputWidgetState {
  confirmValue: string;
}

export class PasswordConfirmWidget extends React.Component<
  IWidget & FieldProps,
  TInputWidgetState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      confirmValue: '',
    };
  }

  public get errors() {
    const {
      field: {value},
    } = this.props;
    const {confirmValue} = this.state;
    const errors = [];

    if (value !== confirmValue) {
      errors.push({
        message: `These ${this.props.schema.title} values don't match`,
      });
    }

    return errors;
  }

  public render() {
    const {
      schema,
      uiSchema,
      field: {value},
    } = this.props;
    const restProps = {
      ...uiSchema['ui:options'],
      type: 'password',
    };

    return (
      <React.Fragment>
        <Input
          value={value}
          onChange={this.handleChangePassword}
          {...restProps}
        />
        <Template
          title={`Confirm ${schema.title}`}
          isRequired={this.props.isRequired}
          id={`${this.props.id}.confirm`}
        >
          <Input
            value={this.state.confirmValue}
            onChange={this.handleChangeConfirmPassword}
            minLength={schema.minLength}
            maxLength={schema.maxLength}
            disabled={uiSchema['ui:disabled']}
            {...restProps}
          />
        </Template>
      </React.Fragment>
    );
  }

  private handleChangePassword = event => {
    this.props.form.setFieldValue(this.props.field.name, event.target.value);
  };

  private handleChangeConfirmPassword = event => {
    this.setState({
      confirmValue: event.target.value,
    });
  };
}

export default PasswordConfirmWidget;
