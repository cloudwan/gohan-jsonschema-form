import * as React from 'react';

import {Select as AntSelect} from 'antd';
import {SelectProps} from 'antd/lib/select/index';

import 'antd/lib/select/style';
import styles from './Select.css';

const {Option} = AntSelect;

interface TSelectProps extends SelectProps {
  options: any[];
}

export const Select = ({
  options = [],
  placeholder = 'Not selected',
  ...props
}: TSelectProps) => (
  <AntSelect
    className={styles.select}
    placeholder={placeholder}
    getPopupContainer={() => document.getElementById('goha-jsonschema-form')}
    {...props}
  >
    {options.map((option, i) => (
      <Option key={i} value={option.value}>
        {option.label}
      </Option>
    ))}
  </AntSelect>
);

export default Select;
