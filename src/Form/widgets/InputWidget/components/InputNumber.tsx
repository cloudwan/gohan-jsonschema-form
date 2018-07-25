import * as React from 'react';

import {InputNumber as AntInputNumber} from 'antd';

import 'antd/lib/input-number/style';
import styles from './InputNumber.css';

export const InputNumber = props => (
  <AntInputNumber className={styles.inputNumber} {...props} />
);

export default InputNumber;
