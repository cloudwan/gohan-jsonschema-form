import {FieldProps} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Switch from './components/Switch';

export class SwitchWidget extends React.Component<IWidget & FieldProps> {
  public static defaultProps = {
    uiSchema: {},
  };

  public render() {
    const disabled = this.props.uiSchema['ui:disabled'];

    return (
      <Switch
        checked={this.props.field.value}
        onChange={this.handleChange}
        disabled={disabled}
      />
    );
  }

  private handleChange = () => {
    this.props.form.setFieldValue(
      this.props.field.name,
      !this.props.field.value,
    );
  };
}

export default SwitchWidget;
