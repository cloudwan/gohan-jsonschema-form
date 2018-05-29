import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tabs, Button, Icon} from 'antd';

import Asterisk from '../components/Asterisk';
import Label from '../components/Label';
import Description from '../components/Description';
import Errors from '../components/Errors';
import SortableList from '../components/SortableList';
import SortableListItem from '../components/SortableListItem';

import Input from './InputWidget';
import Checkbox from './CheckboxWidget';
import Select from './SelectWidget';

import ArrayItemActions from './components/ArrayItemActions';
import ArrayItemBody from './components/ArrayItemBody';
import ArrayItemSort from './components/ArrayItemSort';
import ArrayItemBar from './components/ArrayItemBar';
import ObjectField from './ObjectWidget';
import {getWidget} from './index';

import 'antd/lib/tabs/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import styles from './ArrayWidget.css';

const {TabPane} = Tabs;

export default class ArrayWidget extends Component {
  static defaultProps = {
    isRequired: false,
    uiSchema: {},
    value: undefined,
  };
  static reorderList(items, oldIndex, newIndex) {
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

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value === undefined ? [] : this.props.value,
      errors: [],
      activeTabKey: '0',
    };
  }

  items = [];

  get value() {
    if (Array.isArray(this.items)) {
      if (this.items.length === 0) {
        return [];
      }

      return this.items.filter(item => Boolean(item)).map(item => item.value);
    }
    return this.items.value;
  }

  get isValid() {
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

  handleAddButtonClick = () => {
    const newValue = this.value.concat([this.props.schema.items.default]);

    this.setState({value: newValue});
  };

  handleRemoveButtonClick = itemIndex => event => {
    event.preventDefault();
    event.stopPropagation();

    const newValue = this.value.filter((_, index) => index !== itemIndex);
    let {selectedTabId} = this.state;

    if (selectedTabId >= newValue.length && selectedTabId !== 0) {
      selectedTabId -= 1;
    }

    this.setState({value: newValue, selectedTabId});
  };
  handleReorderClick = (oldIndex, newIndex) => event => {
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

  handleReorderMoved = ({oldIndex, newIndex}) => {
    const newValue = this.value;

    this.setState({
      value: ArrayWidget.reorderList(newValue, oldIndex, newIndex),
    });
  };

  handleReorderStarted = () => {
    this.setState({value: this.value});
  };

  handleTabChange = indexTab => {
    this.setState({
      activeTabKey: indexTab,
      value: this.value,
    });
  };

  handleTabEdit = (key, action) => {
    this[`handle${action.charAt(0).toUpperCase() + action.slice(1)}Tab`](key);
  };

  handleAddTab = () => {
    const newValue = this.state.value.concat([this.props.schema.items.default]);

    this.setState({
      value: newValue,
      activeTabKey: `${newValue.length - 1}`,
    });
  };

  handleemoveTab = targetKey => {
    const {value, activeTabKey} = this.state;
    const targetIndex = Number(targetKey);
    const activeTabIndex = Number(activeTabKey);
    const newValue = value.filter((item, index) => index !== targetIndex);
    let newActiveTabIndex = activeTabKey;

    if (value.length - 1 === activeTabIndex) {
      newActiveTabIndex = newValue.length - 1;
    }

    this.setState({
      value: newValue,
      activeTabKey: newActiveTabIndex.toString(),
    });
  };

  renderArrayWidgetItem(index, value) {
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
          name={property.title || index}
          description={property.description}
          schema={property}
          type={type}
          value={value}
        />
      );
    } else if (property.enum) {
      return (
        <Select
          ref={c => {
            this.items[index] = c;
          }}
          name={property.title || index}
          description={property.description}
          schema={property}
          haystack={property.enum}
          type={type}
          value={value}
          isNullable={isNullable}
        />
      );
    }
    return (
      <Input
        ref={c => {
          this.items[index] = c;
        }}
        name={property.title || index}
        description={property.description}
        schema={property}
        type={type}
        value={value}
        isNullable={isNullable}
      />
    );
  }

  renderObjectArray() {
    const {
      schema,
      schema: {description, title},
      isRequired,
    } = this.props;
    const {value, errors, activeTabKey} = this.state;

    return (
      <div>
        <Label htmlFor={title}>
          {title}
          {isRequired && <Asterisk />}
        </Label>
        <Description>{description}</Description>
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
              <ObjectField
                ref={c => {
                  this.items[index] = c;
                }}
                schema={schema.items}
                value={item}
              />
            </TabPane>
          ))}
        </Tabs>
        <Errors errors={errors} />
      </div>
    );
  }

  renderNormalArray() {
    const {
      schema: {title, description},
      isRequired,
    } = this.props;
    const {value, errors} = this.state;

    return (
      <div>
        <Label htmlFor={title}>
          {title}
          {isRequired && <Asterisk />}
        </Label>
        <Description>{description}</Description>
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
        <Errors errors={errors} />
      </div>
    );
  }

  render() {
    const {schema, isRequired, uiSchema} = this.props;
    const {value} = this.state;

    if (Boolean(schema.items) && schema.items.type === 'object') {
      return this.renderObjectArray();
    } else if (schema.items.enum) {
      const Widget = getWidget('SelectWidget');

      return (
        <Widget
          ref={c => (this.items = c)}
          schema={schema}
          uiSchema={uiSchema}
          isRequired={isRequired}
          value={value}
        />
      );
    }

    return this.renderNormalArray();
  }
}

if (process.env.NODE_ENV !== 'production') {
  ArrayWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    isRequired: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };
}
