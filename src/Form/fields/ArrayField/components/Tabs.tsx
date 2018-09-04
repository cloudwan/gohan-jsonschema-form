import {Button, Icon, Tabs as AntdTabs} from 'antd';
import * as React from 'react';

import 'antd/lib/tabs/style';
import './Tabs.css';

interface TTabsProps {
  activeTabKey: string;
  onAddTab: () => void;
  onChangeTab: (targetKey: string) => void;
  onEditTab: (targetKey: string, action: string) => void;
  children: React.ReactNode;
}

export class Tabs extends React.Component<TTabsProps> {
  public render(): React.ReactNode {
    const {
      activeTabKey,
      onAddTab,
      onChangeTab,
      onEditTab,
      children,
    } = this.props;

    const AddButton = (
      <Button size="small" type="primary" onClick={onAddTab} ghost={true}>
        <Icon type="plus-circle" />
      </Button>
    );

    return (
      <div className="card-container">
        <AntdTabs
          activeKey={activeTabKey}
          tabBarExtraContent={AddButton}
          onChange={onChangeTab}
          type="editable-card"
          onEdit={onEditTab}
          hideAdd={true}
        >
          {children}
        </AntdTabs>
      </div>
    );
  }
}

export default Tabs;
