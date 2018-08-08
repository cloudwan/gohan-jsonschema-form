import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import InputWidget from '../widgets/InputWidget';

export class NumberField extends React.Component<IWidget> {
  private field = undefined;

  public get value(): number | null | undefined {
    return this.field.value;
  }

  public get isValid(): boolean {
    return this.field.isValid;
  }

  public render(): React.ReactNode {
    const {schema, uiSchema, isRequired, value} = this.props;

    return (
      <InputWidget
        ref={c => {
          this.field = c;
        }}
        schema={schema}
        uiSchema={uiSchema}
        isRequired={isRequired}
        value={value}
      />
    );
  }
}

export default NumberField;
