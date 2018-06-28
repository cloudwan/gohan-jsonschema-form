import * as React from 'react';
import {SortableContainer, SortableContainerProps} from 'react-sortable-hoc';
import * as styles from './SortableList.css';

interface SortableListProps extends SortableContainerProps {
  children: React.ReactNode;
}
const SortableList = SortableContainer(
  (props: {children: React.ReactNode}): JSX.Element => (
    <ul className={styles.listContainer}>{props.children}</ul>
  ),
);

export default (props: SortableListProps) => (
  <SortableList helperClass={styles.listContainerActive} {...props} />
);
