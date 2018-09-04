import {Button, Icon} from 'antd';
import * as React from 'react';

import styles from './TabBarButton.css';

interface TTabBarButtonProps {
  disabled?: boolean;
  iconType: string;
  prefix?: string;
  postfix?: string;
  onClick: () => void;
}

export const TabBarButton = ({
  disabled = false,
  iconType,
  prefix = '',
  postfix = '',
  onClick,
}: TTabBarButtonProps) => (
  <Button
    className={styles.moveButton}
    type="primary"
    size="small"
    disabled={disabled}
    onClick={onClick}
    ghost={true}
  >
    {prefix}
    {Boolean(iconType) && <Icon type={iconType} />}
    {postfix}
  </Button>
);

export default TabBarButton;
