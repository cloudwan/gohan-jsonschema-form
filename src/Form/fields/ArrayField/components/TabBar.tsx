import * as React from 'react';

import styles from './TabBar.css';

interface TTabBarProps {
  children: React.ReactNode;
}

const TabBar = ({children}: TTabBarProps): JSX.Element => (
  <div className={styles.bar}>{children}</div>
);

export default TabBar;
