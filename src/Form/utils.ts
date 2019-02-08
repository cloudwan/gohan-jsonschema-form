import {JSONSchema4} from 'json-schema';
import isPlainObject from 'lodash/isPlainObject';
import validator from './Validator';

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

export const validateField = (
  value: any,
  schema: JSONSchema4,
  isRequired: boolean,
): object[] | undefined => {
  const errors = [];

  if (isRequired && !value) {
    errors.push({message: 'Required'});
  }

  if (value !== undefined) {
    validator.validate(schema, value);
  }

  if (validator.errors) {
    errors.push(...validator.errors);
    validator.errors = [];
  }

  return errors.length > 0 ? errors : undefined;
};
