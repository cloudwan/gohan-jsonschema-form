import React from 'react';
import ProtoTypes from 'prop-types';

import styles from './ArrayItemBar.css';

const ArrayItemBar = ({children}) => (
  <div className={styles.bar}>{children}</div>
);

export default ArrayItemBar;

if (process.env.NODE_ENV !== 'production') {
  ArrayItemBar.propTypes = {
    children: ProtoTypes.node.isRequired,
  };
}
