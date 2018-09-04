import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import {selectField} from './';
import Template from './Template';

export default class SchemaField extends React.Component<IWidget> {
  public static defaultProps = {
    value: undefined,
    id: '#',
    uiSchema: {},
    isRequired: false,
  };

  private field;

  public get value() {
    if (this.props.uiSchema['ui:widget'] === 'Hidden') {
      return undefined;
    }

    return this.field.value;
  }

  public get isValid(): boolean {
    if (this.props.uiSchema['ui:widget'] === 'Hidden') {
      return true;
    }

    return this.field.isValid;
  }

  public render(): React.ReactNode {
    const {
      schema,
      uiSchema,
      uiSchema: {'ui:title': uiTitle, 'ui:description': uiDescription},
      isRequired,
      value,
      id,
    } = this.props;
    const type: string | string[] = schema.type;
    const title = uiTitle || schema.title;
    const description = uiDescription || schema.description;

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
          ref={c => {
            this.field = c;
          }}
          id={id}
          schema={schema}
          uiSchema={uiSchema}
          isRequired={isRequired}
          value={value}
        />
      </Template>
    );
  }
}
