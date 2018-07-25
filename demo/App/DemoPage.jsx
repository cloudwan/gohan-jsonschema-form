import React, {Component} from 'react';
import {safeLoad, safeDump, FAILSAFE_SCHEMA} from 'js-yaml';
import {Button, Row, Col, Card} from 'antd';

import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/card/style';

import SchemaEditor from '../components/SchemaEditor';
import {Form} from '../../src';

export default class DemoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'schema',
      data: this.props.formData,
      schema: this.props.schema,
      uiSchema: this.props.uiSchema,
    };
  }

  handlerSchemaChange = schema => {
    try {
      this.setState({schema: safeLoad(schema)});
    } catch (e) {
      console.log(e);
    }
  };

  handlerUISchemaChange = uiSchema => {
    try {
      this.setState({uiSchema: safeLoad(uiSchema)});
    } catch (e) {
      console.log(e);
    }
  };

  handlerDataChange = data => {
    try {
      this.setState({data: safeLoad(data)});
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmit = () => {
    this.setState({data: this.form.value});
  };
  handleValid = () => {
    this.form.isValid;
  };

  handleTabChange = key => {
    this.setState({activeTab: key});
  };

  render() {
    const {schema, uiSchema, data} = this.state;

    const tabs = {
      schema: (
        <SchemaEditor
          key="schema"
          value={safeDump(schema, {skipInvalid: true, schema: FAILSAFE_SCHEMA})}
          onChange={this.handlerSchemaChange}
        />
      ),
      uiSchema: (
        <SchemaEditor
          key="uiSchema"
          value={safeDump(uiSchema, {
            skipInvalid: true,
            schema: FAILSAFE_SCHEMA,
          })}
          onChange={this.handlerUISchemaChange}
        />
      ),
    };
    const tabList = [
      {
        key: 'schema',
        tab: 'Schema definition',
      },
      {
        key: 'uiSchema',
        tab: 'UI schema definition',
      },
    ];

    return (
      <Row gutter={8} justify="space-around">
        <Col xl={8} lg={12} md={24}>
          <Card
            tabList={tabList}
            onTabChange={this.handleTabChange}
            activeTabKey={this.state.activeTab}
          >
            {tabs[this.state.activeTab]}
          </Card>
        </Col>
        <Col xl={8} lg={12} md={24}>
          <Card title="Form data">
            <SchemaEditor
              key="data"
              value={safeDump(data, {
                skipInvalid: true,
              })}
              readOnly={true}
              onChange={this.handlerDataChange}
            />
          </Card>
        </Col>
        <Col xl={8} lg={12} md={24}>
          <Card title="Form component">
            <div style={{height: 500, overflow: 'auto'}}>
              <Form
                schema={schema}
                uiSchema={uiSchema}
                ref={c => {
                  this.form = c;
                }}
                formData={data}
              />
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={{marginRight: '10px'}}
                >
                  Submit
                </Button>
                <Button type="primary" onClick={this.handleValid}>
                  Valid
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
