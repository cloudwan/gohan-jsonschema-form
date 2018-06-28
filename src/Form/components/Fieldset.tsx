import * as React from 'react';

import * as styles from './Fieldset.css';

const Fieldset = (props: {children?: React.ReactNode | null}): JSX.Element => (
  <fieldset className={styles.objectField}>{props.children}</fieldset>
);

export default Fieldset;
