import React from 'react';
import ProtoTypes from 'prop-types';

import styles from './ArrayItemActions.css';

const ArrayItemActions = ({children}) => (
  <div className={styles.actions}>{children}</div>
);

export default ArrayItemActions;

if (process.env.NODE_ENV !== 'production') {
  ArrayItemActions.propTypes = {
    children: ProtoTypes.node.isRequired,
  };
}
