import * as React from 'react';

import {IWidget} from '../../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

import Input from './components/Input';
import InputNumber from './components/InputNumber';

interface TInputWidgetState {
  value?: string | number | null | undefined;
  errors: any[];
}

export class InputWidget extends React.Component<IWidget, TInputWidgetState> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  constructor(props) {
    super(props);

    const {value, schema} = props;

    if (value === null && props.schema.type.includes('null')) {
      this.state = {
        errors: [],
        value: null,
      };
    } else {
      this.state = {
        errors: [],
        value: value ? value : schema.default,
      };
    }
  }

  public get value() {
    const {value} = this.state;
    const {type} = this.props.schema;

    if (value === '' && String.prototype.includes.call(type, 'null')) {
      return null;
    }

    return value;
  }

  public get isValid() {
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

  private handleChangeInput = event => {
    this.setState(
      {
        value: event.target.value,
      },
      () => this.isValid,
    );
  };

  private handleChangeInputNumber = value => {
    this.setState(
      {
        value: value === undefined ? null : value,
      },
      () => this.isValid,
    );
  };

  public render() {
    // tslint:disable-line
    const {
      schema,
      schema: {type},
      uiSchema,
    } = this.props;
    const uiOptions = uiSchema['ui:options'] || {};

    return (
      <React.Fragment>
        <Errors errors={this.state.errors} />
        {(String.prototype.includes.call(type, 'number') ||
          String.prototype.includes.call(type, 'integer')) && (
          <InputNumber
            value={this.state.value}
            onChange={this.handleChangeInputNumber}
            disabled={uiSchema['ui:disabled']}
            min={schema.minimum}
            max={schema.maximum}
            step={schema.multipleOf}
            {...uiOptions}
          />
        )}
        {String.prototype.includes.call(type, 'string') && (
          <Input
            value={this.state.value}
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
}

export default InputWidget;
