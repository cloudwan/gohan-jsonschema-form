import {JSONSchema4} from 'json-schema';
import * as React from 'react';
import {IUiSchema} from '../../typings/IUiSchema';
import {ObjectWidget} from './widgets';

interface TFormPorps {
  uiSchema?: {
    [key: string]: IUiSchema;
  };
  formData: object;
  schema: JSONSchema4;
}

export class Form extends React.Component<TFormPorps> {
  public static defaultProps = {
    uiSchema: {},
    formData: {},
  };

  private object = undefined;

  public get value() {
    return this.object.value;
  }

  public get isValid() {
    return this.object.isValid;
  }

  public render(): JSX.Element {
    return (
      <form>
        <ObjectWidget
          ref={c => {
            this.object = c;
          }}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          value={this.props.formData}
        />
      </form>
    );
  }
}
