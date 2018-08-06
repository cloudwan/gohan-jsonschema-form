import {Button, Icon, Tabs} from 'antd';
import * as React from 'react';

import Asterisk from '../components/Asterisk';
import Description from '../components/Description';
import Errors from '../components/Errors';
import Label from '../components/Label';
import SortableList from '../components/SortableList';
import SortableListItem from '../components/SortableListItem';

import Checkbox from './CheckboxWidget';
import InputWidget from './InputWidget';
import Select from './SelectWidget';

import ArrayItemActions from './components/ArrayItemActions';
import ArrayItemBar from './components/ArrayItemBar';
import ArrayItemBody from './components/ArrayItemBody';
import ArrayItemSort from './components/ArrayItemSort';
import {selectWidget} from './index';
import ObjectField from './ObjectWidget';

import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import 'antd/lib/tabs/style';

import {SortEvent, SortEventWithTag} from 'react-sortable-hoc';
import SchemaField from '../fields/SchemaField';
import * as styles from './ArrayWidget.css';

const {TabPane} = Tabs;

interface TArrayWidgetProps {
  schema: any;
  isRequired: boolean;
  uiSchema: object;
  value: any;
  id: string;
}

interface TArrayWidgetState {
  value: any;
  errors: any;
  activeTabKey: string;
  selectedTabId: number;
}

export default class ArrayWidget extends React.Component<
  TArrayWidgetProps,
  TArrayWidgetState
> {
  private static defaultProps = {
    isRequired: false,
    uiSchema: {},
    value: [],
  };

  private static reorderList(items, oldIndex, newIndex) {
    const array = [...items];

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

  private items: any = [];

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value === undefined ? [] : this.props.value,
      errors: [],
      activeTabKey: '0',
      selectedTabId: 0,
    };
  }

  public get value(): any[] {
    if (Array.isArray(this.items)) {
      if (this.items.length === 0) {
        return [];
      }

      return this.items.filter(item => Boolean(item)).map(item => item.value);
    }
    return this.items.value;
  }

  public get isValid() {
    const value = this.value;

    const errors = [];
    const {isRequired} = this.props;

    if (isRequired && Array.isArray(value) && value.length === 0) {
      errors.push({
        message: 'required',
      });
    }

    this.setState({errors});

    if (Array.isArray(this.items)) {
      return this.items.filter(item => Boolean(item)).reduce((result, item) => {
        const testedItem = item.isValid;

        if (result === false) {
          return result;
        } else if (testedItem === false) {
          return false;
        }

        return result;
      }, errors.length === 0);
    }
    return this.items.isValid;
  }

  public render(): JSX.Element {
    const {schema, isRequired, uiSchema} = this.props;
    const {value} = this.state;

    if (schema.items && schema.items.type === 'object') {
      return this.renderObjectArray();
    } else if (
      !schema.uniqueItems || !schema.items
        ? false
        : Array.isArray(schema.items.enum)
    ) {
      const Widget = selectWidget('Select');

      return (
        <Widget
          ref={c => (this.items = c)}
          schema={schema}
          uiSchema={uiSchema}
          isRequired={isRequired}
          value={value}
          multiple={true}
        />
      );
    }

    return this.renderNormalArray();
  }

  private handleAddButtonClick = (): void => {
    const newValue = this.value.concat([this.props.schema.items.default]);

    this.setState({value: newValue});
  };

  private handleRemoveButtonClick = itemIndex => (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    event.preventDefault();
    event.stopPropagation();

    const newValue = this.value.filter((_, index) => index !== itemIndex);
    let {selectedTabId} = this.state;

    if (selectedTabId >= newValue.length && selectedTabId !== 0) {
      selectedTabId -= 1;
    }

    this.setState({value: newValue, selectedTabId});
  };

  private handleReorderClick = (oldIndex, newIndex) => (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    event.preventDefault();

    const newValue = this.value;

    this.setState(
      {
        activeTabKey: newIndex.toString(),
        value: ArrayWidget.reorderList(newValue, oldIndex, newIndex),
      },
      () => this.isValid,
    );
  };

  private handleReorderMoved = ({oldIndex, newIndex}) => {
    const newValue = this.value;

    this.setState({
      value: ArrayWidget.reorderList(newValue, oldIndex, newIndex),
    });
  };

  private handleReorderStarted = (
    event: SortEvent | SortEventWithTag,
  ): boolean => {
    this.setState({value: this.value});

    return true;
  };

  private handleTabChange = indexTab => {
    this.setState({
      activeTabKey: indexTab,
      value: this.value,
    });
  };

  private handleTabEdit = (key, action) => {
    this[`handle${action.charAt(0).toUpperCase() + action.slice(1)}Tab`](key);
  };

  private handleAddTab = () => {
    const newValue = this.state.value.concat([this.props.schema.items.default]);

    this.setState({
      value: newValue,
      activeTabKey: `${newValue.length - 1}`,
    });
  };

  private renderArrayWidgetItem(index, value) {
    const {id} = this.props;
    const {items} = this.props.schema;

    const property = items;
    const type = Array.isArray(property.type)
      ? property.type[0]
      : property.type;
    const isNullable =
      Array.isArray(property.type) && property.type.includes('null');

    if (type === 'boolean') {
      return (
        <Checkbox
          ref={c => {
            this.items[index] = c;
          }}
          id={`${id}.${index}`}
          schema={property}
          value={value}
        />
      );
    } else if (property.enum) {
      return (
        <Select
          ref={c => {
            this.items[index] = c;
          }}
          id={`${id}.${index}`}
          schema={property}
          value={value}
        />
      );
    }
    return (
      <InputWidget
        ref={c => {
          this.items[index] = c;
        }}
        id={`${id}.${index}`}
        schema={property}
        value={value}
      />
    );
  }

  private renderObjectArray() {
    const {
      schema,
      id,
      schema: {description, title},
      isRequired,
    } = this.props;
    const {value, errors, activeTabKey} = this.state;

    return (
      <Tabs
        activeKey={activeTabKey}
        tabBarExtraContent={
          <Button
            className={styles.addButton}
            size="small"
            type="primary"
            onClick={this.handleAddTab}
            ghost={true}
          >
            <Icon type="plus-circle" />
          </Button>
        }
        onChange={this.handleTabChange}
        type="editable-card"
        onEdit={this.handleTabEdit}
        hideAdd={true}
      >
        {value.map((item, index) => (
          <TabPane
            key={index.toString()}
            tab={`Item ${index + 1}`}
            closable={true}
          >
            <ArrayItemBar>
              <Button
                className={styles.moveButton}
                type="primary"
                size="small"
                disabled={index === 0}
                onClick={this.handleReorderClick(index, index - 1)}
                ghost={true}
              >
                <Icon type="left" />Move Left
              </Button>
              <Button
                className={styles.moveButton}
                type="primary"
                size="small"
                disabled={index === value.length - 1}
                onClick={this.handleReorderClick(index, index + 1)}
                ghost={true}
              >
                Move Right<Icon type="right" />
              </Button>
            </ArrayItemBar>
            <SchemaField
              ref={c => {
                this.items[index] = c;
              }}
              id={`${id}.${index}`}
              uiSchema={{}} // TODO
              schema={schema.items}
              value={item}
            />
          </TabPane>
        ))}
      </Tabs>
    );
  }

  private renderNormalArray() {
    const {
      schema: {title, description},
      isRequired,
    } = this.props;
    const {value, errors} = this.state;

    return (
      <SortableList
        pressDelay={500}
        // eslint-disable-next-line react/jsx-handler-names
        shouldCancelStart={this.handleReorderStarted}
        onSortEnd={this.handleReorderMoved}
        helperClass={'list-sortable-active'}
        lockAxis={'y'}
        lockToContainerEdges={true}
      >
        <Button
          className={styles.addButton}
          type="primary"
          onClick={this.handleAddButtonClick}
          ghost={true}
        >
          <Icon type="plus-circle" />
        </Button>
        {value.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SortableListItem index={index} key={index}>
            <ArrayItemActions>
              <Button
                className={styles.removeButton}
                type="primary"
                size="small"
                onClick={this.handleRemoveButtonClick(index)}
                ghost={true}
              >
                <Icon type="minus-circle" />
              </Button>
            </ArrayItemActions>
            <ArrayItemBody>
              {this.renderArrayWidgetItem(index, item)}
            </ArrayItemBody>
            <ArrayItemSort>
              <Button
                className={styles.moveButton}
                type="primary"
                size="small"
                disabled={index === 0}
                onClick={this.handleReorderClick(index, index - 1)}
                ghost={true}
              >
                <Icon type="up" />Up
              </Button>
              <Button
                className={styles.moveButton}
                type="primary"
                size="small"
                disabled={index === value.length - 1}
                onClick={this.handleReorderClick(index, index + 1)}
                ghost={true}
              >
                <Icon type="down" />Down
              </Button>
            </ArrayItemSort>
          </SortableListItem>
        ))}
      </SortableList>
    );
  }
}
