import React, {Component} from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/text';
import 'brace/mode/yaml';
import 'brace/mode/javascript';
import 'brace/theme/dracula';

export default class SchemaEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value,
    };
  }

  handleChangeCodeEditor = value => {
    this.setState({value});
    this.props.onChange(this.state.value);
  };

  render() {
    const {value} = this.state;

    return (
      <div style={{float: 'left'}}>
        <AceEditor
          mode={'yaml'}
          value={value}
          theme="dracula"
          name={'schemaEditor'}
          onChange={this.handleChangeCodeEditor}
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}
