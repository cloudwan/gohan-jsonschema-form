import React from 'react';
import ProtoTypes from 'prop-types';

import styles from './ArrayItemBody.css';

const ArrayItemBody = ({children}) => (
  <div className={styles.body}>{children}</div>
);

export default ArrayItemBody;

if (process.env.NODE_ENV !== 'production') {
  ArrayItemBody.propTypes = {
    children: ProtoTypes.node.isRequired,
  };
}
