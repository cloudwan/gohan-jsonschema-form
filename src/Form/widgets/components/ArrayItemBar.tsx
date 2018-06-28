import * as React from 'react';

import * as styles from './ArrayItemBar.css';

const ArrayItemBar = ({children}: {children: JSX.Element | any[]}) => (
  <div className={styles.bar}>{children}</div>
);

export default ArrayItemBar;
