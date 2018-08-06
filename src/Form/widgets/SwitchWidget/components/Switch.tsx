import * as React from 'react';

import {Switch as AntSwitch} from 'antd';

import 'antd/lib/switch/style';
import styles from './Switch.css';

export const Switch = props => (
  <AntSwitch className={styles.switchComponent} {...props} />
);

export default Switch;
