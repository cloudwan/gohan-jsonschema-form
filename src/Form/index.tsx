import {JSONSchema4} from 'json-schema';
import * as React from 'react';

import {IUiSchema} from '../typings/IUiSchema';
import SchemaField from './fields/SchemaField';

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

  private field = undefined;

  public get value() {
    return this.field.value;
  }

  public get isValid() {
    return this.field.isValid;
  }

  public render(): JSX.Element {
    return (
      <form>
        <SchemaField
          ref={c => {
            this.field = c;
          }}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          value={this.props.formData}
        />
      </form>
    );
  }
}
