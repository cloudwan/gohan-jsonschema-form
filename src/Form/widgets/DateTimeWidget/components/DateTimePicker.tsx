import {DatePicker} from 'antd';
import * as React from 'react';

import 'antd/lib/date-picker/style';
import styles from './DateTimePicker.css';

export const DateTimePicker = (props): JSX.Element => (
  <DatePicker
    className={styles.dateTimePicker}
    showTime={true}
    format="YYYY-MM-DD HH:mm:ss"
    placeholder="Select Time"
    {...props}
  />
);

export default DateTimePicker;
