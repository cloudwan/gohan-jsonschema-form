import {safeLoad} from 'js-yaml';
import * as React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/text';
import 'brace/mode/yaml';
import 'brace/theme/github';

import Errors from '../components/Errors';

interface TCodeEditorWidgetProps {
  format: string;
  isRequired: boolean;
  value: any;
  schema?: any;
}

interface TCodeEditorWidgetState {
  value: any;
  errors: any[];
}

export default class CodeEditorWidget extends React.Component<
  TCodeEditorWidgetProps,
  TCodeEditorWidgetState
> {
  private static defaultProps = {
    format: 'text',
    isRequired: false,
    value: undefined,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value,
      errors: [],
    };
  }

  public get value() {
    const {value} = this.state;

    if (this.props.schema.type === 'object') {
      if (value === '') {
        return {};
      }
      try {
        const data = safeLoad(value);

        if (typeof data === 'object') {
          return data;
        }
        return {};
      } catch (error) {
        return {};
      }
    }

    return this.state.value;
  }

  public get isValid() {
    const {isRequired} = this.props;
    const {value} = this.state;
    const errors = [];

    if (isRequired && !value) {
      errors.push({
        message: 'required',
      });
    }

    if (value !== '') {
      if (this.props.schema.type === 'object') {
        try {
          if (typeof safeLoad(value) !== 'object') {
            errors.push({
              message: 'wrong format',
            });
          }
        } catch (error) {
          errors.push({
            message: error.message,
          });
        }
      }
    }

    this.setState({errors});

    return errors.length === 0;
  }

  public render(): React.ReactNode {
    const {
      schema: {title},
    } = this.props;
    const {value, errors} = this.state;

    return (
      <div>
        <AceEditor
          mode={this.getFormat()}
          value={value}
          theme="github"
          name={title}
          onChange={this.handleChangeCodeEditor}
          editorProps={{$blockScrolling: true}}
        />
        <Errors errors={errors} />
      </div>
    );
  }

  private handleChangeCodeEditor = value => {
    this.setState({value}, () => this.isValid);
  };

  private getFormat() {
    const {format} = this.props;

    switch (format) {
      case 'js':
        return 'javascript';
      case 'yaml':
        return 'yaml';
      default:
        return 'text';
    }
  }
}
