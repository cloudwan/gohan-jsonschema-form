import React, {Component} from 'react';

import {Button} from 'antd';
import {safeDump} from 'js-yaml';
import {JSONSchema4} from 'json-schema';
import AceEditor from 'react-ace';

import 'brace/mode/yaml';
import 'brace/theme/github';

interface ISchemaHintProps {
  schema: JSONSchema4;
}

interface ISchemaHintState {
  show: boolean;
}

class SchemaHint extends Component<ISchemaHintProps, ISchemaHintState> {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  public render() {
    const {schema} = this.props;
    const {show} = this.state;
    let content;

    try {
      content = schema
        ? safeDump(schema)
        : 'This property does not have schema.';
    } catch (e) {
      console.error(e);
      content = 'This property has invalid schema.';
    }

    return (
      <div>
        <div className="pt-button-group pt-minimal">
          <Button size="small" onClick={this.handleShowHideClick}>
            {show ? 'Hide' : 'Show'} schema definition
          </Button>
        </div>
        {show && (
          <AceEditor
            mode={'yaml'}
            value={content}
            theme="github"
            readOnly={true}
            height="250px"
            editorProps={{$blockScrolling: true}}
          />
        )}
      </div>
    );
  }

  private handleShowHideClick = () => {
    this.setState({show: !this.state.show});
  };
}

export default SchemaHint;
