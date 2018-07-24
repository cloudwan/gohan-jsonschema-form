import React from 'react';
import {getWidget} from '../widgets';
import {getWidgetName} from '../widgets/utils';

import {JSONSchema4} from 'json-schema';
import {IUiSchema} from '../../../typings/IUiSchema';

import Asterisk from '../components/Asterisk';
import Description from '../components/Description';
import Fieldset from '../components/Fieldset';
import Label from '../components/Label';

interface TSchemaFieldProps {
  uiSchema?: {
    [key: string]: IUiSchema;
  };
  formData?: object;
  schema: JSONSchema4;
  required?: boolean;
}

export class SchemaField extends React.Component<TSchemaFieldProps> {
  public static defaultProps = {
    uiSchema: {},
    required: false,
  };

  private FieldComponent = getWidget(
    getWidgetName(this.props.schema, this.props.uiSchema),
  );

  private field = undefined;

  public get value() {
    return this.field.value;
  }

  public get isValid() {
    return this.field.isValid;
  }

  public render() {
    const {schema, uiSchema, formData, required} = this.props;
    const {title, description} = schema;
    const {FieldComponent} = this;

    return (
      <Fieldset>
        {title && (
          <Label htmlFor={title}>
            {title}
            {required && <Asterisk />}
          </Label>
        )}
        {description && <Description>{description}</Description>}
        <FieldComponent
          ref={c => {
            this.field = c;
          }}
          schema={schema}
          uiSchema={uiSchema}
          required={required}
          value={formData}
        />
      </Fieldset>
    );
  }
}
