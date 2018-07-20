import React, {Component} from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/mode/yaml';
import 'brace/mode/javascript';
import 'brace/theme/chrome';

export default class SchemaEditor extends Component {
  static defaultPorps() {
    return {
      readOnly: false,
    };
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  handleChangeCodeEditor = value => {
    this.setState({value});
    this.props.onChange(this.state.value);
  };

  render() {
    const {value} = this.state;
    const {readOnly} = this.props;

    return (
      <AceEditor
        readOnly={readOnly}
        mode={'yaml'}
        value={value}
        width="100%"
        theme="dracula"
        name={'schemaEditor'}
        onChange={this.handleChangeCodeEditor}
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}
