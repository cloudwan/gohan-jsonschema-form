import * as React from 'react';

import {Input as AntInput} from 'antd';

import 'antd/lib/input/style';

import styles from './Input.css';

export const Input = props => <AntInput className={styles.input} {...props} />;

export default Input;
