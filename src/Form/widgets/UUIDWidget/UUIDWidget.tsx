import * as React from 'react';
import uuid from 'uuid/v4';

import InputSearch from './components/InputSearch';

import Errors from '../../components/Errors';

import InputWidget from './../InputWidget';

export class UUIDWidget extends InputWidget {
  public render() {
    const {uiSchema} = this.props;
    const uiOptions = uiSchema['ui:options'] || {};

    return (
      <React.Fragment>
        <Errors errors={this.state.errors} />
        <InputSearch
          value={this.state.value}
          enterButton="Generate"
          onChange={this.handleChange}
          onSearch={this.handleGenerateUUID}
          onPressEnter={void 0}
          {...uiOptions}
        />
      </React.Fragment>
    );
  }

  private handleGenerateUUID = (): void => {
    this.setState({value: uuid()}, () => this.isValid);
  };

  private handleChange = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;

    this.setState({value: target.value}, () => this.isValid);
  };
}

export default UUIDWidget;
