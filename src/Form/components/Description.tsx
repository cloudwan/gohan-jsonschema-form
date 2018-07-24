import * as React from 'react';

import * as styles from './Description.css';

const Description = (props: {children: string | JSX.Element}): JSX.Element => (
  <span className={styles.description}>{props.children}</span>
);

export default Description;
