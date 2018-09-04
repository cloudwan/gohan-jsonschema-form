import * as React from 'react';

import styles from './List.css';

interface TListProps {
  children: React.ReactNode;
}

const List = ({children}: TListProps): JSX.Element => (
  <ul className={styles.listContainer}>{children}</ul>
);

export default List;
