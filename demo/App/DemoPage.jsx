import React, {Component} from 'react';
import {safeLoad, safeDump, FAILSAFE_SCHEMA} from 'js-yaml';
import {Row, Col, Card, Radio, Menu, Checkbox} from 'antd';

import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/card/style';
import 'antd/lib/radio/style';
import 'antd/lib/menu/style';
import 'antd/lib/checkbox/style';

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
      formLayout: 'vertical',
      isSchemaVisible: true,
      isDataVisible: true,
      isFormVisible: true,
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

  handleSubmit = values => {
    this.setState({data: values});
  };

  handleTabChange = key => {
    this.setState({activeTab: key});
  };

  handleLayoutChange = e => {
    this.setState({formLayout: e.target.value});
  };

  handleSchemaToggle = () => {
    this.setState(state => ({
      isSchemaVisible: !state.isSchemaVisible,
    }));
  };

  handleDataToggle = () => {
    this.setState(state => ({
      isDataVisible: !state.isDataVisible,
    }));
  };

  handleFormToggle = () => {
    this.setState(state => ({
      isFormVisible: !state.isFormVisible,
    }));
  };

  render() {
    const {
      schema,
      uiSchema,
      data,
      formLayout,
      isSchemaVisible,
      isDataVisible,
      isFormVisible,
    } = this.state;

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

    const visibleTabsCount = [
      isSchemaVisible,
      isDataVisible,
      isFormVisible,
    ].filter(d => d).length;

    const colSize = {
      xl: visibleTabsCount === 1 ? 24 : visibleTabsCount === 2 ? 12 : 8,
      lg: visibleTabsCount === 1 ? 24 : 12,
      md: 24,
    };

    return (
      <React.Fragment>
        <Row>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              lineHeight: '64px',
              display: 'flex',
              justifyContent: 'center',
            }}
            selectable={false}
          >
            <Menu.Item>
              <label style={{cursor: 'pointer'}}>
                <Checkbox
                  checked={this.state.isSchemaVisible}
                  onChange={this.handleSchemaToggle}
                />{' '}
                Schema
              </label>
            </Menu.Item>
            <Menu.Item>
              <label style={{cursor: 'pointer'}}>
                <Checkbox
                  checked={this.state.isDataVisible}
                  onChange={this.handleDataToggle}
                />{' '}
                Data
              </label>
            </Menu.Item>
            <Menu.Item>
              <label style={{cursor: 'pointer'}}>
                <Checkbox
                  checked={this.state.isFormVisible}
                  onChange={this.handleFormToggle}
                />{' '}
                Form
              </label>
            </Menu.Item>
          </Menu>
        </Row>
        <Row gutter={8} justify="space-around">
          {
            <Col
              {...colSize}
              style={{display: isSchemaVisible ? 'block' : 'none'}}
            >
              <Card
                tabList={tabList}
                onTabChange={this.handleTabChange}
                activeTabKey={this.state.activeTab}
              >
                {tabs[this.state.activeTab]}
              </Card>
            </Col>
          }
          {
            <Col
              {...colSize}
              style={{display: isDataVisible ? 'block' : 'none'}}
            >
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
          }
          {
            <Col
              {...colSize}
              style={{display: isFormVisible ? 'block' : 'none'}}
            >
              <Card
                title="Form component"
                bodyStyle={{
                  height: 840,
                  overflow: 'auto',
                  padding: 0,
                }}
                extra={
                  <Radio.Group
                    onChange={this.handleLayoutChange}
                    value={formLayout}
                    buttonStyle="solid"
                  >
                    <Radio.Button value="horizontal">Horizontal</Radio.Button>
                    <Radio.Button value="vertical">Vertical</Radio.Button>
                  </Radio.Group>
                }
              >
                <div style={{padding: '24px'}}>
                  <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={data}
                    layout={formLayout}
                    wrapperCol={
                      formLayout === 'horizontal' ? {span: 18} : undefined
                    }
                    labelCol={
                      formLayout === 'horizontal' ? {span: 6} : undefined
                    }
                    fetcher={() =>
                      new Promise(resolve =>
                        setTimeout(
                          () =>
                            resolve({
                              test: [
                                {name: 'Foo', id: 'foo'},
                                {name: 'Bar', id: 'bar'},
                              ],
                            }),
                          5000,
                        ),
                      )
                    }
                    onSubmit={this.handleSubmit}
                  />
                </div>
              </Card>
            </Col>
          }
        </Row>
      </React.Fragment>
    );
  }
}
