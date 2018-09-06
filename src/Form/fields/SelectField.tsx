import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import SelectWidget from '../widgets/SelectWidget';
import FormContext from './../FormContext';

interface ISelectFieldProps extends IWidget {
  fetcher?: (
    relation: string,
  ) => Promise<Array<{label: string; value: string}>>;
}
export class SelectField extends React.Component<ISelectFieldProps> {
  private field = undefined;

  public get value(): string | number | any[] | null | undefined {
    return this.field.value;
  }

  public get isValid(): boolean {
    return this.field.isValid;
  }

  public render(): React.ReactNode {
    const {schema, uiSchema, isRequired, value} = this.props;

    if (!schema.enum && schema.relation) {
      return (
        <FormContext.Consumer>
          {(
            fetcher: (
              relation: string,
            ) => Promise<Array<{label: string; value: string}>>,
          ) => (
            <SelectWidget
              ref={c => {
                this.field = c;
              }}
              schema={schema}
              uiSchema={uiSchema}
              isRequired={isRequired}
              value={value}
              fetcher={fetcher}
            />
          )}
        </FormContext.Consumer>
      );
    }

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
