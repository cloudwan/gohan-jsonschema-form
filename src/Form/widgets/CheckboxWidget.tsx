import {Checkbox} from 'antd';
import * as React from 'react';

import Asterisk from '../components/Asterisk';
import Description from '../components/Description';

import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';
import * as styles from './CheckboxWidget.css';

interface TCheckboxWidgetProps {
  ref: (c: React.ReactNode) => void;
  value?: any;
  schema: any;
  isRequired?: boolean;
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
    const {
      schema: {title, description},
      isRequired,
    } = this.props;
    const {checked} = this.state;

    return (
      <div className={styles.checkboxWidget}>
        <Checkbox checked={checked} onChange={this.handleChangeCheckbox}>
          {title}
          {isRequired && <Asterisk />}
        </Checkbox>
        {description && <Description>{description}</Description>}
      </div>
    );
  }

  private handleChangeCheckbox = (event: CheckboxChangeEvent): void => {
    this.setState({checked: event.target.checked});
  };
}
