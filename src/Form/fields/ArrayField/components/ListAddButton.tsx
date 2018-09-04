import {Button, Icon} from 'antd';
import * as React from 'react';

import styles from './ListAddButton.css';

interface TListAddButtonProps {
  onClick: () => void;
}

export const ListAddButton = ({onClick}: TListAddButtonProps): JSX.Element => (
  <Button
    className={styles.addButton}
    type="primary"
    onClick={onClick}
    ghost={true}
  >
    <Icon type="plus-circle" />
  </Button>
);

export default ListAddButton;
