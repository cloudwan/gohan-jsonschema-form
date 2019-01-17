import {Button, Icon, Tabs as AntTabs} from 'antd';
import {TabsType} from 'antd/lib/tabs';
import {FieldArrayRenderProps, getIn} from 'formik';
import {JSONSchema4} from 'json-schema';
import * as React from 'react';

import {IWidget} from '../../../../typings/IWidget';
import SchemaField from '../../../fields/SchemaField';

import TabBar from './TabBar';
import TabBarButton from './TabBarButton';

import 'antd/lib/tabs/style';
import './Tabs.css';

interface TTabsProps extends IWidget, FieldArrayRenderProps {
  onEditTab?: (targetKey: string, action: string) => void;
  type?: TabsType;
}

interface TTabsState {
  activeKey: string;
}

export class Tabs extends React.Component<TTabsProps, TTabsState> {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: `${props.name}.0`,
    };
  }

  public render(): React.ReactNode {
    const {onEditTab, schema, name, form} = this.props;

    const restProps: {
      activeKey?: string;
      onChange?: (key: string) => void;
    } = {};

    if (this.state.activeKey) {
      restProps.activeKey = this.state.activeKey;
      restProps.onChange = this.handleTabChange;
    }

    const fieldValue = getIn(form.values, name);

    return (
      <div className="card-container">
        <AntTabs
          type={'editable-card'}
          onEdit={onEditTab}
          hideAdd={true}
          tabBarExtraContent={
            <Button
              size="small"
              type="primary"
              onClick={this.handleAddClick}
              ghost={true}
            >
              <Icon type="plus-circle" />
            </Button>
          }
          {...restProps}
        >
          {fieldValue &&
            fieldValue.map((item, index) => (
              <AntTabs.TabPane
                key={`${name}.${index}`}
                tab={`Item ${index + 1}`}
              >
                <TabBar>
                  <TabBarButton
                    disabled={index === 0}
                    iconType="left"
                    postfix="Move Left"
                    onClick={this.handleReorderClick(index, index - 1)}
                  />
                  <TabBarButton
                    disabled={index === fieldValue.length - 1}
                    iconType="right"
                    postfix="Move Right"
                    onClick={this.handleReorderClick(index, index + 1)}
                  />
                </TabBar>
                <SchemaField id={`${name}.${index}`} schema={schema.items} />
              </AntTabs.TabPane>
            ))}
        </AntTabs>
      </div>
    );
  }

  private handleAddClick = (): void => {
    const items = this.props.schema.items as JSONSchema4;
    const values = getIn(this.props.form.values, this.props.name);
    const index = values && values.length > 0 ? values.length : 0;

    this.props.push(items.default);
    this.setState({
      activeKey: `${this.props.name}.${index}`,
    });
  };

  private handleReorderClick = (indexA: number, indexB: number) => () => {
    this.props.swap(indexA, indexB);
    this.setState({
      activeKey: `${this.props.name}.${indexB}`,
    });
  };

  private handleTabChange = (targetKey: string): void => {
    this.setState({
      activeKey: targetKey,
    });
  };
}

export default Tabs;
