import {FieldProps} from 'formik';
import {safeDump, safeLoad} from 'js-yaml';
import {isEmpty} from 'lodash';
import * as React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/text';
import 'brace/mode/yaml';
import 'brace/theme/github';

import {IWidget} from '../../typings/IWidget';
import {omitByRecursively, removeEmptyObjects} from '../utils';

interface ICodeEditorWidgetProps extends IWidget, FieldProps {}

export const getStringValue = value => {
  try {
    if (typeof value !== 'string') {
      const objectValue = removeEmptyObjects(omitByRecursively(value));

      return isEmpty(objectValue) ? '' : safeDump(objectValue);
    }

    return value;
  } catch (error) {
    return value;
  }
};

export const getMode = (format?: string) => {
  switch (format) {
    case 'js':
      return 'javascript';
    case 'yaml':
      return 'yaml';
    default:
      return 'text';
  }
};

export default class CodeEditorWidget extends React.Component<
  ICodeEditorWidgetProps
> {
  public shouldComponentUpdate() {
    return false;
  }

  public render(): React.ReactNode {
    const {
      schema,
      uiSchema,
      schema: {title},
      field: {value},
    } = this.props;

    return (
      <AceEditor
        mode={getMode(uiSchema['ui:format'] || schema.format)}
        value={getStringValue(value)}
        theme="github"
        name={title}
        onChange={this.handleChange}
        editorProps={{$blockScrolling: true}}
        height="300px"
        width="auto"
      />
    );
  }

  private handleChange = value => {
    const {
      schema: {type},
      form,
      field,
    } = this.props;

    try {
      form.setFieldValue(
        field.name,
        type.includes('object') ? safeLoad(value) : value,
      );
    } catch (e) {
      form.setFieldValue(field.name, value);
    }
  };
}
