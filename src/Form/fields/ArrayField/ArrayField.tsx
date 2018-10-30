import {Tabs as AntTabs} from 'antd';
import * as React from 'react';

import {JSONSchema4} from 'json-schema';
import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import SchemaField from '../../fields/SchemaField';
import validator from '../../Validator';
import List from './components/List';
import ListAddButton from './components/ListAddButton';
import ListItem from './components/ListItem';
import TabBar from './components/TabBar';
import TabBarButton from './components/TabBarButton';
import Tabs from './components/Tabs';

interface TTabsWidgetProps extends IWidget {
  value?: any[] | null;
}

interface TArrayFieldState {
  value?: any[] | null;
  errors: any[];
  activeTabKey?: string;
}

export class ArrayField extends React.Component<
  TTabsWidgetProps,
  TArrayFieldState
> {
  private static reorderList(
    items: any[],
    oldIndex: number,
    newIndex: number,
  ): any[] {
    const array = items;

    if (newIndex === oldIndex) {
      return array;
    }

    const target = array[oldIndex];
    const step = newIndex < oldIndex ? -1 : 1;

    for (let k = oldIndex; k !== newIndex; k += step) {
      array[k] = array[k + step];
    }
    array[newIndex] = target;
    return array;
  }

  private items = [];

  private isObjectArray = false;

  constructor(props) {
    super(props);

    const items = this.props.schema.items as JSONSchema4;
    const type: string | string[] = this.props.schema.type;
    let value;

    if (items && items.type) {
      const itemType: string | string[] = items.type;
      this.isObjectArray = itemType.includes('object');
    }

    if (this.props.value === null && type.includes('null')) {
      value = null;
    } else {
      value = !this.props.value
        ? []
        : this.props.value.map((v, i) => ({
            value: v,
            key: `${i}${new Date().valueOf()}`,
          }));
    }

    this.state = {
      errors: [],
      activeTabKey: value && value[0] ? value[0].key : undefined,
      value,
    };
  }

  public get value(): any[] | null | undefined {
    const previousValue = this.props.value;
    const type: string | string[] = this.props.schema.type;
    const {
      state: {value},
      items,
    } = this;

    if ((!items || items.length === 0) && type.includes('null')) {
      return null;
    }

    const currentValue =
      value === undefined
        ? value
        : items.filter(item => item).map(item => item.value);

    if (this.isObjectArray) {
      return currentValue;
    }

    if (
      previousValue === undefined &&
      (currentValue === undefined || currentValue.length === 0)
    ) {
      return undefined;
    }

    return currentValue;
  }

  public get isValid(): boolean {
    const {isRequired, schema} = this.props;
    const value = this.value;
    const errors = [];

    if (
      isRequired &&
      ((Array.isArray(value) && value.length === 0) || value === undefined)
    ) {
      errors.push({
        message: 'required',
      });
    }

    if (value !== undefined) {
      validator.validate(schema, value);
    }

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    this.setState({
      errors,
    });

    return errors.length === 0;
  }

  public render(): React.ReactNode {
    this.items = [];

    if (this.isObjectArray) {
      return this.renderTabs();
    }

    return this.renderList();
  }

  private handleTabChange = (targetKey: string): void => {
    this.setState({
      activeTabKey: targetKey,
    });
  };

  private handleTabEdit = (targetKey: string, action: string): void => {
    if (action === 'remove') {
      this.handleRemoveButtonClick(targetKey)();
    }
  };

  private handleAddButtonClick = (): void => {
    const items = this.props.schema.items as JSONSchema4;
    const currentValue = this.state.value ? this.state.value : [];
    const key = `${currentValue.length}${new Date().valueOf()}`;
    const newState: {value: any[]; activeTabKey?: string} = {
      value: currentValue.concat([
        {
          value: items.default,
          key,
        },
      ]),
    };

    if (this.isObjectArray) {
      newState.activeTabKey = key;
    }

    this.setState(newState);
  };

  private handleRemoveButtonClick = (targetKey: string) => (): void => {
    const newState: {value: any[]; activeTabKey?: string} = {
      value: this.state.value.filter(item => item.key !== targetKey),
    };

    if (this.isObjectArray) {
      let lastIndex;

      this.state.value.forEach((item, index) => {
        if (item.key === targetKey) {
          lastIndex = index - 1;
        }
      });

      if (lastIndex >= 0 && this.state.activeTabKey === targetKey) {
        newState.activeTabKey = newState.value[lastIndex].key;
      }
    }

    this.setState(newState);
  };

  private handleReorderClick = (
    oldIndex: number,
    newIndex: number,
  ) => (): void => {
    const currentState = ArrayField.reorderList(
      this.state.value,
      oldIndex,
      newIndex,
    );
    const currentValue = ArrayField.reorderList(this.value, oldIndex, newIndex);

    const newState: {value: any[]; activeTabKey?: string} = {
      value: currentValue.map((item, index) => ({
        value: item,
        key: currentState[index].key,
      })),
    };

    if (this.isObjectArray) {
      newState.activeTabKey = this.state.value[newIndex].key;
    }

    this.setState(newState);
  };

  private renderList() {
    const {id, schema} = this.props;
    const {value, errors} = this.state;

    return (
      <React.Fragment>
        <Errors errors={errors} />
        <ListAddButton onClick={this.handleAddButtonClick} />
        <List>
          {value &&
            value.map((item, index) => {
              return (
                <ListItem
                  index={index}
                  key={item.key}
                  itemsCount={value.length}
                  onMoveUpButtonClick={this.handleReorderClick(
                    index,
                    index - 1,
                  )}
                  onMoveDownButtonClick={this.handleReorderClick(
                    index,
                    index + 1,
                  )}
                  onRemoveButtonClick={this.handleRemoveButtonClick(item.key)}
                >
                  <SchemaField
                    ref={c => {
                      if (c) {
                        this.items.push(c);
                      }
                    }}
                    id={`${id}.${index}`}
                    schema={schema.items}
                    value={item.value}
                    uiSchema={{}} // TODO
                  />
                </ListItem>
              );
            })}
        </List>
      </React.Fragment>
    );
  }

  private renderTabs(): React.ReactNode {
    const {value, errors, activeTabKey} = this.state;
    const {schema, id} = this.props;

    return (
      <React.Fragment>
        <Errors errors={errors} />
        <Tabs
          activeTabKey={activeTabKey}
          onAddTab={this.handleAddButtonClick}
          onChangeTab={this.handleTabChange}
          onEditTab={this.handleTabEdit}
        >
          {value &&
            value.map((item, index) => (
              <AntTabs.TabPane key={item.key} tab={`Item ${index + 1}`}>
                <TabBar>
                  <TabBarButton
                    disabled={index === 0}
                    iconType="left"
                    postfix="Move Left"
                    onClick={this.handleReorderClick(index, index - 1)}
                  />
                  <TabBarButton
                    disabled={index === value.length - 1}
                    iconType="right"
                    postfix="Move Right"
                    onClick={this.handleReorderClick(index, index + 1)}
                  />
                </TabBar>
                <SchemaField
                  ref={c => {
                    if (c) {
                      this.items.push(c);
                    }
                  }}
                  id={`${id}.${index}`}
                  schema={schema.items}
                  value={item.value}
                  uiSchema={{}} // TODO
                />
              </AntTabs.TabPane>
            ))}
        </Tabs>
      </React.Fragment>
    );
  }
}

export default ArrayField;
