import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import SelectWidget from '../widgets/SelectWidget';

export class SelectField extends React.Component<IWidget> {
  private field = undefined;

  public get value(): string | number | any[] | null | undefined {
    return this.field.value;
  }

  public get isValid(): boolean {
    return this.field.isValid;
  }

  public render(): React.ReactNode {
    const {schema, uiSchema, isRequired, value} = this.props;

    return (
      <SelectWidget
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

export default SelectField;
