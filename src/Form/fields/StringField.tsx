import * as React from 'react';

import {IWidget} from '../../typings/IWidget';

import {selectWidget} from '../widgets';

export class StringField extends React.Component<IWidget> {
  private field = undefined;

  public get value(): string | null | undefined {
    return this.field.value;
  }

  public get isValid(): boolean {
    return this.field.isValid;
  }

  public render(): React.ReactNode {
    const {
      schema,
      schema: {format},
      uiSchema,
      isRequired,
      value,
    } = this.props;

    const Widget = selectWidget(format || 'Input');

    return (
      <Widget
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

export default StringField;
