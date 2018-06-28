/* eslint-disable complexity */
export const getWidgetName = (schema, uiSchema): string => {
  if (uiSchema && uiSchema['ui:widget']) {
    return uiSchema['ui:widget'];
  }

  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;

  if (type === 'object') {
    if (!schema.properties) {
      return 'CodeEditorWidget';
    }
    return 'ObjectWidget';
  } else if (type === 'array') {
    return 'ArrayWidget';
  } else if (type === 'boolean') {
    return 'CheckboxWidget';
  } else if (schema.enum) {
    return 'SelectWidget';
  } else if (schema.format) {
    return 'CodeEditorWidget';
  } else if (type === 'string' || type === 'integer' || type === 'number') {
    return 'InputWidget';
  }

  return 'NotFoundWidget';
};
