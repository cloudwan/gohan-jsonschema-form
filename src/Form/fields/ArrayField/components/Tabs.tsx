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
  type?: TabsType;
}

interface TTabsState {
  activeKey: string;
}

const getTargetIndex = (key: string) => {
  if (key) {
    const indexRegex = /\d+$/;
    const results = key.match(indexRegex);

    return results && results.length > 0 ? Number(results[0]) : undefined;
  }

  return undefined;
};

export class Tabs extends React.Component<TTabsProps, TTabsState> {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: `${props.name}.0`,
    };
  }

  public shouldComponentUpdate(nextProps, newState) {
    const newFieldValue = getIn(nextProps.form.values, nextProps.name);
    const oldFieldValue = getIn(this.props.form.values, this.props.name);

    const newLength =
      newFieldValue && Array.isArray(newFieldValue) ? newFieldValue.length : 0;
    const oldLength =
      newFieldValue && Array.isArray(oldFieldValue) ? oldFieldValue.length : 0;

    return (
      newLength !== oldLength || newState.activeKey !== this.state.activeKey
    );
  }

  public render(): React.ReactNode {
    const {schema, name, form, uiSchema} = this.props;

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
          onEdit={this.handleEdit}
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
                <SchemaField
                  id={`${name}.${index}`}
                  schema={schema.items}
                  uiSchema={uiSchema}
                />
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

  private handleEdit = (targetKey: string, action: string): void => {
    if (action === 'remove') {
      this.handleRemove(targetKey);
    }
  };

  private handleRemove = (targetKey): void => {
    const {activeKey} = this.state;
    const tabs = getIn(this.props.form.values, this.props.name);
    const targetIndex = getTargetIndex(targetKey);
    const activeIndex = getTargetIndex(activeKey);
    const lastIndex = tabs.length > 0 ? tabs.length - 1 : undefined;
    let newActiveIndex;

    if (targetIndex > activeIndex) {
      newActiveIndex = activeIndex;
    } else if (targetIndex === activeIndex) {
      newActiveIndex =
        activeIndex === lastIndex ? activeIndex - 1 : activeIndex;
    } else if (targetIndex < activeIndex) {
      newActiveIndex = activeIndex - 1;
    }

    this.props.remove(targetIndex);
    this.setState({
      activeKey: newActiveIndex
        ? `${this.props.name}.${newActiveIndex}`
        : undefined,
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
