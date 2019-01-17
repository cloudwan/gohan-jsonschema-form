import * as React from 'react';
import uuid from 'uuid/v4';

import InputWidget from './../InputWidget';
import InputSearch from './components/InputSearch';

export class UUIDWidget extends InputWidget {
  public render() {
    const {uiSchema} = this.props;
    const uiOptions = uiSchema['ui:options'] || {};

    return (
      <InputSearch
        value={this.props.field.value}
        enterButton="Generate"
        onChange={this.handleChange}
        onSearch={this.handleGenerateUUID}
        onPressEnter={void 0}
        {...uiOptions}
      />
    );
  }

  private handleGenerateUUID = (): void => {
    this.props.form.setFieldValue(this.props.field.name, uuid());
  };

  private handleChange = (event: React.FormEvent<EventTarget>): void => {
    const target = event.target as HTMLInputElement;
    this.props.form.setFieldValue(this.props.field.name, target.value);
  };
}

export default UUIDWidget;
