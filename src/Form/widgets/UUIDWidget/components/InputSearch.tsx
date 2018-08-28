import * as React from 'react';

import {Input} from 'antd';

import 'antd/lib/input/style';

import styles from './InputSearch.css';

export const InputSearch = (props: any) => (
  <Input.Search className={styles.input} {...props} />
);

export default InputSearch;
