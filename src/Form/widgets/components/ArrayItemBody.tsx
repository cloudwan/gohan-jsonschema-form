import * as React from 'react';

import * as styles from './ArrayItemBody.css';

const ArrayItemBody = ({children}: {children: JSX.Element}) => (
  <div className={styles.body}>{children}</div>
);

export default ArrayItemBody;
