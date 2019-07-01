import isPlainObject from 'lodash/isPlainObject';

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

export const getInitialValues = schema => {
  if (isEmptyObject(schema)) {
    return {};
  }

  if (typeof schema.default !== 'undefined') {
    return schema.default;
  } else if (schema.type.includes('object')) {
    if (!schema.properties) {
      return {};
    }

    const values = {};
    for (const key in schema.properties) {
      if (schema.properties.hasOwnProperty(key)) {
        if (schema.properties.hasOwnProperty(key)) {
          values[key] = getInitialValues(schema.properties[key]);

          if (typeof schema.properties[key] === 'undefined') {
            values[key] = undefined;
          }
        }
      }
    }

    return values;
  } else if (schema.type.includes('array')) {
    if (!schema.items) {
      return [];
    }

    if (Array.isArray(schema.items)) {
      return schema.items.map(getInitialValues);
    }

    const value = getInitialValues(schema.items);

    if (typeof value === 'undefined') {
      return [];
    } else {
      const ct = schema.minItems || 1;
      const values = [];

      for (let i = 0; i < ct; i++) {
        values.push(JSON.parse(JSON.stringify(value)));
      }

      return values;
    }
  }
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
