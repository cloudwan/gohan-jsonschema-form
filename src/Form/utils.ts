import isPlainObject from 'lodash/isPlainObject';

export const isEmptyObject = obj => {
  let isEmpty = true;
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

  return isEmpty;
};
