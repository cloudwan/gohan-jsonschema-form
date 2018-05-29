import React from 'react';
import PropTypes from 'prop-types';

import styles from './Errors.css';

const Errors = ({errors}) => {
  if (errors && errors.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {errors.map(error => <div key={error.message}>{error.message}</div>)}
    </div>
  );
};

Errors.defaultProps = {
  errors: [],
};

export default Errors;

if (process.env.NODE_ENV !== 'production') {
  Errors.propTypes = {
    errors: PropTypes.array,
  };
}
