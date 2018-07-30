import {Checkbox} from 'antd';
import * as React from 'react';

import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import * as styles from './CheckboxWidget.css';

interface TCheckboxWidgetProps {
  ref: (c: React.ReactNode) => void;
  value?: any;
  schema: any;
  isRequired?: boolean;
  id: string;
}

interface TCheckboxWidgetState {
  checked: boolean;
}
export default class CheckboxWidget extends React.Component<
  TCheckboxWidgetProps,
  TCheckboxWidgetState
> {
  private static defaultProps = {
    value: false,
    isRequired: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      checked: this.props.value,
    };
  }

  public get value(): boolean {
    return this.state.checked;
  }

  public render(): React.ReactNode {
    const {checked} = this.state;

    return (
      <div className={styles.checkboxWidget}>
        <Checkbox checked={checked} onChange={this.handleChangeCheckbox} />
      </div>
    );
  }

  private handleChangeCheckbox = (event: CheckboxChangeEvent): void => {
    this.setState({checked: event.target.checked});
  };
}
