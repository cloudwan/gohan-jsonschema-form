import * as React from 'react';

import * as styles from './Errors.css';

interface TError {
  message: string;
}

const Errors = (props: {errors: TError[]} = {errors: []}): JSX.Element => {
  if (props.errors && props.errors.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {props.errors.map(error => (
        <div key={error.message}>{error.message}</div>
      ))}
    </div>
  );
};

export default Errors;
