import {FieldProps} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Input from '../../components/Input';
import InputNumber from './components/InputNumber';

export class InputWidget extends React.Component<IWidget & FieldProps> {
  public static defaultProps = {
    uiSchema: {},
  };

  public render() {
    const {
      schema,
      uiSchema,
      field: {value},
    } = this.props;
    const uiOptions = uiSchema['ui:options'] || {};
    const type: string | string[] = schema.type;

    return (
      <React.Fragment>
        {(type.includes('number') || type.includes('integer')) && (
          <InputNumber
            value={value}
            onChange={this.handleChangeInputNumber}
            disabled={uiSchema['ui:disabled']}
            min={schema.minimum}
            max={schema.maximum}
            step={schema.multipleOf}
            {...uiOptions}
          />
        )}
        {type.includes('string') && (
          <Input
            value={value}
            onChange={this.handleChangeInput}
            disabled={uiSchema['ui:disabled']}
            minLength={schema.minLength}
            maxLength={schema.maxLength}
            {...uiOptions}
          />
        )}
      </React.Fragment>
    );
  }

  private handleChangeInput = event => {
    const type: string | string[] = this.props.schema.type;
    const value =
      type.includes('null') && !event.target.value ? null : event.target.value;

    this.props.form.setFieldValue(this.props.field.name, value);
  };

  private handleChangeInputNumber = (value?: number) => {
    this.props.form.setFieldValue(
      this.props.field.name,
      value === undefined ? null : value,
    );
  };
}

export default InputWidget;
