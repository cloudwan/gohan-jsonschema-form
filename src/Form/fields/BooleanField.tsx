import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import SwitchWidget from '../widgets/SwitchWidget';

export class BooleanField extends React.Component<IWidget> {
  private field = undefined;

  public get value(): boolean | null | undefined {
    return this.field.value;
  }

  public get isValid(): boolean {
    return this.field.isValid;
  }

  public render(): React.ReactNode {
    const {schema, uiSchema, isRequired, value} = this.props;

    return (
      <SwitchWidget
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

export default BooleanField;
