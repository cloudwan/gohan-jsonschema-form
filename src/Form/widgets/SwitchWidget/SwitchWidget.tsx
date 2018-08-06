import * as React from 'react';

import {IWidget} from '../../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';
import Switch from './components/Switch';

interface TSwitchWidgetState {
  value?: boolean | null | undefined;
  errors: any[];
}

export class SwitchWidget extends React.Component<IWidget, TSwitchWidgetState> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  constructor(props) {
    super(props);

    if (props.value === undefined && props.schema.default === undefined) {
      this.state = {
        errors: [],
      };
    } else {
      this.state = {
        errors: [],
        value: props.value || props.schema.default,
      };
    }
  }

  public get value(): boolean {
    return this.state.value;
  }

  public get isValid(): boolean {
    const {isRequired, schema} = this.props;
    const errors = [];

    if (isRequired && this.value === undefined) {
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

  public render() {
    const disabled = this.props.uiSchema['ui:disabled'];

    return (
      <React.Fragment>
        <Errors errors={this.state.errors} />
        <Switch
          checked={this.state.value}
          onChange={this.handleChange}
          disabled={disabled}
        />
      </React.Fragment>
    );
  }

  private handleChange = () => {
    this.setState(
      prevState => ({
        value: !prevState.value,
      }),
      () => this.isValid,
    );
  };
}

export default SwitchWidget;
