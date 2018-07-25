import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import InputWidget from '../widgets/InputWidget';

export class StringField extends React.Component<IWidget> {
  private field = undefined;

  public get value(): string | null | undefined {
    return this.field.value;
  }

  public get isValid(): boolean {
    return this.field.isValid;
  }

  public render(): React.ReactNode {
    const {schema, uiSchema, required, value} = this.props;

    return (
      <InputWidget
        ref={c => {
          this.field = c;
        }}
        schema={schema}
        uiSchema={uiSchema}
        required={required}
        value={value}
      />
    );
  }
}

export default StringField;
