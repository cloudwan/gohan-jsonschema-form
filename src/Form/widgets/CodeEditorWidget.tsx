import {FieldProps} from 'formik';
import * as React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/text';
import 'brace/mode/yaml';
import 'brace/theme/github';

interface TCodeEditorWidgetProps extends FieldProps {
  format: string;
  isRequired: boolean;
  schema?: any;
}

export default class CodeEditorWidget extends React.Component<
  TCodeEditorWidgetProps
> {
  public render(): React.ReactNode {
    const {
      schema: {title},
      field: {value},
    } = this.props;

    return (
      <AceEditor
        mode={this.getFormat()}
        value={value}
        theme="github"
        name={title}
        onChange={this.handleChangeCodeEditor}
        editorProps={{$blockScrolling: true}}
        height="300px"
      />
    );
  }

  private handleChangeCodeEditor = value => {
    this.props.form.setFieldValue(this.props.field.name, value);
  };

  private getFormat() {
    const {format} = this.props;

    switch (format) {
      case 'js':
        return 'javascript';
      default:
        return 'text';
    }
  }
}
