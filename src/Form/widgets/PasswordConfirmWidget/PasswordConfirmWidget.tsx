import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';

import Template from '../../fields/Template';
import InputWidget from './../InputWidget';

interface TInputWidgetState {
  errors: any[];
}

export class PasswordConfirmWidget extends React.Component<
  IWidget,
  TInputWidgetState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  private fieldA = undefined;
  private fieldB = undefined;

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  public get value() {
    const valueA = this.fieldA.value;
    const valueB = this.fieldB.value;

    if (valueA !== valueB) {
      throw new Error(`These ${this.props.schema.title} don't match`);
    }

    return valueA;
  }

  public get isValid() {
    const valueA = this.fieldA.value;
    const valueB = this.fieldB.value;
    const aValid = this.fieldA.isValid;
    const bValid = this.fieldB.isValid;

    const errors = [];

    if (valueA !== valueB) {
      errors.push({
        message: `These ${this.props.schema.title} don't match`,
      });
    }

    this.setState({errors});
    return errors.length === 0 && aValid && bValid;
  }

  public render() {
    const {schema, uiSchema, isRequired, value} = this.props;

    return (
      <React.Fragment>
        <Errors errors={this.state.errors} />
        <React.Fragment>
          <InputWidget
            ref={c => {
              this.fieldA = c;
            }}
            schema={schema}
            uiSchema={uiSchema}
            isRequired={isRequired}
            value={value}
          />
          <Template
            title={`Confirm ${schema.title}`}
            isRequired={this.props.isRequired}
            id={`${this.props.id}.confirm`}
          >
            <InputWidget
              ref={c => {
                this.fieldB = c;
              }}
              schema={schema}
              uiSchema={uiSchema}
              isRequired={isRequired}
              value={value}
            />
          </Template>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default PasswordConfirmWidget;
