import React, {Component} from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

import {Layout, Menu} from 'antd';

import 'antd/lib/layout/style';
import 'antd/lib/icon/style';
import 'antd/lib/menu/style';

const {Header, Sider, Content} = Layout;

import DemoPage from './DemoPage';

const examples = schemas.map(item => require(`./../schemas/${item}`));

export default class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={{height: '100%'}}>
          <Header>
            <Menu theme="dark" mode="horizontal" style={{lineHeight: '64px'}} />
          </Header>
          <Layout>
            <Sider>
              <Menu theme="light">
                {examples.map(item => (
                  <Menu.Item key={item.id}>
                    <Link to={item.id}>{item.title}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
            <Content>
              {examples.map(item => (
                <Route
                  key={item.id}
                  path={`/${item.id}`}
                  component={() => (
                    <DemoPage
                      schema={item.schema}
                      uiSchema={item.uiSchema}
                      data={item.data}
                    />
                  )}
                />
              ))}
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
