import {Button, Icon, Tabs as AntdTabs} from 'antd';
import {TabsType} from 'antd/lib/tabs';
import * as React from 'react';

import 'antd/lib/tabs/style';
import './Tabs.css';

interface TTabsProps {
  activeTabKey?: string;
  onChangeTab?: (targetKey: string) => void;
  onEditTab?: (targetKey: string, action: string) => void;
  children: React.ReactNode;
  type?: TabsType;
  tabBarExtraContent?: React.ReactNode;
}

export class Tabs extends React.Component<TTabsProps> {
  public static defaultProps = {
    type: 'card',
  };

  public shouldComponentUpdate(nextProps) {
    const nextChildrenCount = React.Children.count(nextProps.children);
    const previousChildrenCount = React.Children.count(this.props.children);
    return nextChildrenCount !== previousChildrenCount;
  }

  public render(): React.ReactNode {
    const {
      activeTabKey,
      onChangeTab,
      onEditTab,
      children,
      type,
      tabBarExtraContent,
    } = this.props;

    const restProps: {
      activeKey?: string;
      onChange?: (key: string) => void;
    } = {};

    if (activeTabKey) {
      restProps.activeKey = activeTabKey;
      restProps.onChange = onChangeTab;
    }

    return (
      <div className="card-container">
        <AntdTabs
          tabBarExtraContent={tabBarExtraContent}
          type={type}
          onEdit={onEditTab}
          hideAdd={true}
          {...restProps}
        >
          {children}
        </AntdTabs>
      </div>
    );
  }
}

export default Tabs;
