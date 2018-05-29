import React from 'react';
import ProtoTypes from 'prop-types';

import styles from './ArrayItemSort.css';

const ArrayItemSort = ({children}) => (
  <div className={styles.sort}>{children}</div>
);

export default ArrayItemSort;

if (process.env.NODE_ENV !== 'production') {
  ArrayItemSort.propTypes = {
    children: ProtoTypes.node.isRequired,
  };
}
