import {Button, Icon} from 'antd';
import * as React from 'react';

import styles from './ListItem.css';

interface TListItemProps {
  children: React.ReactNode;
  onRemoveButtonClick: () => void;
  onMoveUpButtonClick: () => void;
  onMoveDownButtonClick: () => void;
  itemsCount: number;
  index: number;
}

export const ListItem = ({
  onRemoveButtonClick,
  onMoveUpButtonClick,
  onMoveDownButtonClick,
  index,
  itemsCount,
  children,
}: TListItemProps): JSX.Element => (
  <li className={styles.listItem}>
    <div className={styles.actions}>
      <Button
        className={styles.itemButton}
        onClick={onRemoveButtonClick}
        type="primary"
        size="small"
        ghost={true}
      >
        <Icon type="minus-circle" />
      </Button>
    </div>
    <div className={styles.body}>{children}</div>
    <div className={styles.sort}>
      <Button
        className={styles.itemButton}
        onClick={onMoveUpButtonClick}
        type="primary"
        size="small"
        ghost={true}
        disabled={index === 0}
      >
        <Icon type="up" />Up
      </Button>
      <Button
        className={styles.itemButton}
        onClick={onMoveDownButtonClick}
        type="primary"
        size="small"
        ghost={true}
        disabled={index === itemsCount - 1}
      >
        <Icon type="down" />Down
      </Button>
    </div>
  </li>
);

export default ListItem;
