import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/text';
import 'brace/mode/yaml';
import 'brace/mode/javascript';
import 'brace/theme/github';
import {safeLoad} from 'js-yaml';

import Asterisk from '../components/Asterisk';
import Label from '../components/Label';
import Description from '../components/Description';
import Errors from '../components/Errors';

export default class CodeEditorWidget extends Component {
  static defaultProps = {
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

  get value() {
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

  get isValid() {
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

  handleChangeCodeEditor = value => {
    this.setState({value}, () => this.isValid);
  };

  getFormat() {
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

  render() {
    const {
      isRequired,
      schema: {title, description},
    } = this.props;
    const {value, errors} = this.state;

    return (
      <div>
        <Label htmlFor={title}>
          {title}
          {isRequired && <Asterisk />}
        </Label>
        <Description>{description}</Description>
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
}

if (process.env.NODE_ENV !== 'production') {
  CodeEditorWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    format: PropTypes.string,
    isRequired: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };
}
