import * as React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import * as styles from './SortableListItem.css';

const SortableListItem = SortableElement(
  (props: {children: React.ReactNode}) => (
    <li className={styles.listItem}>{props.children}</li>
  ),
);

export default SortableListItem;
