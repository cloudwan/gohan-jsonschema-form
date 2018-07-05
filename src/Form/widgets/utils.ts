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

export const asNumber = (value: string): number | string | undefined => {
  if (value === '') {
    return undefined;
  }
  if (/\.$/.test(value)) {
    return value;
  }
  if (/\.0$/.test(value)) {
    return value;
  }
  if (/\.\d*0$/.test(value)) {
    return value;
  }

  const n = Number(value);
  const valid = typeof n === 'number' && !Number.isNaN(n);

  return valid ? n : value;
};
