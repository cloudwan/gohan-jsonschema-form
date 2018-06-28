import * as React from 'react';

import * as styles from './ArrayItemSort.css';

const ArrayItemSort = ({children}: {children: React.ReactNode}) => (
  <div className={styles.sort}>{children}</div>
);

export default ArrayItemSort;
