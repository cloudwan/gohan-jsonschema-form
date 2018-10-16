import * as React from 'react';

import styles from './Fieldset.css';

interface TFieldsetProps {
  children: React.ReactNode;
  id: string;
  isTab?: boolean;
}

export const Fieldset = ({
  children,
  id,
  isTab = false,
}: TFieldsetProps): JSX.Element => (
  <fieldset id={id} className={isTab ? '' : styles.fieldset}>
    {children}
  </fieldset>
);

export default Fieldset;
