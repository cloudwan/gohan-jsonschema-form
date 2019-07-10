import {JSONSchema4} from 'json-schema';
import {isNil, isPlainObject} from 'lodash';

export const isEmptyObject = obj => {
  let isEmpty = true;

  if (isPlainObject(obj)) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      if (isPlainObject(obj[key])) {
        if (!isEmptyObject(obj[key])) {
          isEmpty = false;
        }
      } else if (obj[key] !== undefined) {
        isEmpty = false;
      }
    });
  }

  return isEmpty;
};

export const getObjectTypeValue = (
  schema: JSONSchema4,
  value: object,
  hasInitialValue: boolean = false,
) => {
  if (!schema.properties) {
    return {};
  } else if (isNil(value) && schema.type.includes('null')) {
    return null;
  }

  const data = isNil(value) && !schema.type.includes('null') ? {} : value;

  const values = {};
  for (const key in schema.properties) {
    if (schema.properties.hasOwnProperty(key)) {
      values[key] = getInitialValues(
        schema.properties[key],
        data[key],
        hasInitialValue,
      );
    }
  }

  return values;
};

export const getArrayTypeValue = (
  schema: JSONSchema4,
  value?: any[],
  hasInitialData: boolean = false,
) => {
  if (value !== undefined) {
    if (Array.isArray(value)) {
      if (schema.items && Array.isArray(schema.items)) {
        return value.map((item, index) =>
          getInitialValues(schema.items[index], item, hasInitialData),
        );
      } else if (schema.items && !Array.isArray(schema.items)) {
        return value.map(item =>
          getInitialValues(schema.items, item, hasInitialData),
        );
      }
    }

    return value;
  } else if (hasInitialData || !schema.items) {
    return [];
  } else if (schema.default !== undefined) {
    if (Array.isArray(schema.default)) {
      return schema.default.map((item, index) => {
        if (Array.isArray(schema.items)) {
          if (schema.items[index].type.includes('object')) {
            return getInitialValues(schema.items[index], item, hasInitialData);
          } else {
            return item;
          }
        } else if (schema.items.type.includes('object')) {
          return getInitialValues(schema.items, item, hasInitialData);
        } else {
          return item;
        }
      });
    }

    return schema.default;
  } else if (Array.isArray(schema.items)) {
    return schema.items.map(item =>
      getInitialValues(item, undefined, hasInitialData),
    );
  }

  const itemsValue = getInitialValues(schema.items, undefined, hasInitialData);

  if (itemsValue !== undefined) {
    const ct = schema.minItems || 1;
    const values = [];

    for (let i = 0; i < ct; i++) {
      values.push(JSON.parse(JSON.stringify(itemsValue)));
    }

    return values;
  }

  return [];
};

export const getSimpleTypeValue = (
  schema: JSONSchema4,
  value?: string | number | boolean,
  hasInitialData: boolean = false,
) => {
  if (typeof value !== 'undefined') {
    return value;
  } else if (hasInitialData) {
    return undefined;
  } else if (typeof schema.default !== 'undefined') {
    return schema.default;
  }

  return undefined;
};

export const getInitialValues = (
  schema: JSONSchema4,
  data?: any,
  hasInitialData?: boolean,
  getValue = getSimpleTypeValue,
  getArrayValue = getArrayTypeValue,
  getObjectValue = getObjectTypeValue,
) => {
  if (!schema || isEmptyObject(schema)) {
    return {};
  }

  const initialData: boolean =
    hasInitialData !== undefined ? hasInitialData : data !== undefined;

  if (schema.type.includes('array')) {
    return getArrayValue(schema, data, initialData);
  } else if (schema.type.includes('object')) {
    if (!data && typeof schema.default === 'object') {
      return getObjectValue(schema, schema.default, initialData);
    }

    return getObjectValue(schema, data, initialData);
  }

  return getValue(schema, data, initialData);
};

export const matchValue = (value, regex) => {
  let result = false;

  if (typeof value !== 'object') {
    result = regex.test(value);
  } else if (typeof value === 'object' && Array.isArray(value)) {
    value.forEach(item => {
      if (matchValue(item, regex)) {
        result = true;
      }
    });
  }

  return result;
};

export const getFieldValue = (source, id, values, getValue) => {
  if (source.startsWith('.')) {
    const idPath = id.split('.');

    idPath.pop();
    idPath.push(source.replace('.', ''));

    return getValue(values, idPath.join('.'));
  }

  return getValue(values, source);
};
