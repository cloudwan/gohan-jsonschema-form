import * as React from 'react';

import * as styles from './ArrayItemActions.css';

const ArrayItemActions = ({children}: {children: JSX.Element}) => (
  <div className={styles.actions}>{children}</div>
);

export default ArrayItemActions;
