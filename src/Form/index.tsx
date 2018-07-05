import * as React from 'react';

import {ObjectWidget} from './widgets';

interface TFormPorps {
  uiSchema?: object;
  formData: object;
  schema: object;
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
