import * as React from 'react';

import * as styles from './Label.css';

const Label = (props: {
  children: JSX.Element | any[];
  htmlFor: string;
}): JSX.Element => (
  <label className={styles.label} {...{htmlFor: props.htmlFor}}>
    {props.children}
  </label>
);

export default Label;
