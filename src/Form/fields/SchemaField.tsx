import {JSONSchema4} from 'json-schema';
import * as React from 'react';

import {IUiSchema} from '../../typings/IUiSchema';
import {selectField} from './';
import Template from './Template';

interface IFieldProps {
  id?: string;
  schema: JSONSchema4;
  uiSchema?: IUiSchema;
  isRequired?: boolean;
}

export default class SchemaField extends React.Component<IFieldProps> {
  public static defaultProps = {
    id: '',
    uiSchema: {},
    isRequired: false,
  };

  public render(): React.ReactNode {
    const {
      schema,
      uiSchema,
      uiSchema: {'ui:title': uiTitle, 'ui:description': uiDescription},
      isRequired,
      id,
    } = this.props;
    const type: string | string[] = schema.type;
    let title = schema.title;
    let description = schema.description;

    if (uiTitle !== undefined && typeof uiTitle === 'string') {
      title = uiTitle;
    }

    if (uiDescription !== undefined && typeof uiDescription === 'string') {
      description = uiDescription;
    }

    let Field;

    if (uiSchema['ui:widget']) {
      if (typeof uiSchema['ui:widget'] === 'function') {
        Field = uiSchema['ui:widget'];
      } else if (uiSchema['ui:widget'] === 'Hidden') {
        return null;
      } else {
        Field = selectField(uiSchema['ui:widget']);
      }
    } else {
      if (type.includes('object')) {
        Field = selectField('Object');
        if (!schema.properties) {
          Field = selectField('Code');
        }
      } else if (schema.enum) {
        Field = selectField('Select');
      } else if (type.includes('array')) {
        Field = selectField('Array');
      } else if (type.includes('boolean')) {
        Field = selectField('Boolean');
      } else if (schema.enum || schema.relation) {
        Field = selectField('Select');
      } else if (type.includes('string')) {
        Field = selectField('String');
      } else if (type.includes('integer') || type.includes('number')) {
        Field = selectField('Number');
      } else {
        Field = selectField('NotFound');
      }
    }

    return (
      <Template
        title={title}
        description={description}
        isRequired={isRequired}
        id={id}
      >
        <Field
          id={id}
          schema={schema}
          uiSchema={uiSchema}
          isRequired={isRequired}
        />
      </Template>
    );
  }
}
