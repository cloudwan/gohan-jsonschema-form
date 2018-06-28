import * as React from 'react';

import * as styles from './Legend.css';

const Legend = (props: {children?: React.ReactNode}): JSX.Element => (
  <legend className={styles.legend}>{props.children}</legend>
);

export default Legend;
