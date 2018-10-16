import {Button, Icon, Tabs as AntdTabs} from 'antd';
import {JSONSchema4} from 'json-schema';
import {isEmpty} from 'lodash';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Asterisk from '../../components/Asterisk';
import Tabs from '../../components/Tabs';
import SchemaField from '../SchemaField';
import Fieldset from './components/Fieldset';

import styles from './ObjectField.css';

interface TObjectFieldState {
  value: any;
  errors: any[];
  isNull?: boolean;
}

export default class ObjectField extends React.Component<
  IWidget,
  TObjectFieldState
> {
  public static defaultProps = {
    uiSchema: {},
    isRequired: false,
  };

  public static getDerivedStateFromProps(props, state) {
    if (state.value === undefined) {
      return {
        value: isEmpty(props.value) ? props.schema.default : props.value,
      };
    }

    return null;
  }

  private fields = {};
  private hasTabs;

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      value: undefined,
      isNull: false,
    };

    this.hasTabs = this.countTabs(this.props.schema.properties) > 1;
  }

  public get value(): any {
    if (this.state.isNull) {
      return null;
    }

    return Object.keys(this.fields).reduce(
      (result: object | undefined, key: string) => {
        const field = this.fields[key];

        if (field && field.value !== undefined) {
          if (result === undefined) {
            result = {};
          }

          result[key] = field.value;
        }

        return result;
      },
      undefined,
    );
  }

  public get isValid(): boolean {
    return Object.keys(this.fields)
      .filter(key => this.fields[key])
      .reduce((result, key) => {
        return !this.fields[key].isValid ? false : result;
      }, true);
  }

  public render(): JSX.Element {
    this.fields = {};
    const {
      id,
      uiSchema: {'ui:options': uiOptions = {}},
      schema,
      schema: {properties, propertiesOrder, required},
      isRequired,
    } = this.props;
    const {value, isNull} = this.state;
    const type: string | string[] = schema.type;
    const orderedProperties = this.orderProperties(
      Object.keys(properties),
      propertiesOrder,
    );
    let showFields = true;

    if (
      isNull ||
      (value === undefined && type.includes('null') && !isRequired)
    ) {
      showFields = false;
    }

    const primitiveProperties = orderedProperties
      .filter((key: string): boolean => {
        const fieldType: string | string[] = properties[key].type;

        if (this.hasTabs && properties[key]) {
          return !fieldType.includes('object') && !fieldType.includes('array');
        }

        return true;
      })
      .map((key: string): React.ReactNode[] | JSX.Element => (
        <SchemaField
          id={`${id}.${key}`}
          key={`${id}.${key}`}
          ref={c => {
            this.fields[key] = c;
          }}
          schema={properties[key]}
          isRequired={Array.isArray(required) && required.includes(key)}
          value={
            value && value[key] !== undefined
              ? value[key]
              : properties[key].default
          }
        />
      ));

    const tabProperties = orderedProperties
      .filter((key: string): boolean => {
        const fieldType: string | string[] = properties[key].type;

        if (this.hasTabs && properties[key]) {
          return fieldType.includes('object') || fieldType.includes('array');
        }

        return false;
      })
      .map((key: string): React.ReactNode[] | JSX.Element => (
        <AntdTabs.TabPane
          key={`${id}.${key}`}
          tab={
            <React.Fragment>
              {properties[key] && properties[key].title
                ? properties[key].title
                : key}
              {Array.isArray(required) &&
                required.includes(key) && <Asterisk />}
            </React.Fragment>
          }
          className={styles.tab}
          forceRender={true}
        >
          <SchemaField
            id={`${id}.${key}`}
            ref={c => {
              this.fields[key] = c;
            }}
            schema={properties[key]}
            isRequired={Array.isArray(required) && required.includes(key)}
            value={
              value && value[key] !== undefined
                ? value[key]
                : properties[key].default
            }
            uiSchema={{
              'ui:title': '',
              'ui:description': '',
              'ui:options': {
                isTab: true,
              },
            }}
          />
        </AntdTabs.TabPane>
      ));

    return (
      <Fieldset id={id} isTab={uiOptions.isTab}>
        {type.includes('null') && (
          <Button
            type="primary"
            onClick={this.handleToggleButtonClick}
            ghost={true}
            className={styles.toggleButton}
          >
            <Icon type={`${!showFields ? 'plus' : 'minus'}-circle`} />
            {`${!showFields ? 'Add' : 'Remove'} ${schema.title}`}
          </Button>
        )}
        {showFields &&
          primitiveProperties.concat(
            tabProperties.length > 0 ? (
              <Tabs key="tabs">{tabProperties}</Tabs>
            ) : (
              []
            ),
          )}
      </Fieldset>
    );
  }

  private orderProperties = (
    properties: string[],
    order: string[],
  ): string[] => {
    if (!Array.isArray(order)) {
      return properties;
    }

    const arrayToHash = arr =>
      arr.reduce((prev, curr) => {
        prev[curr] = true;
        return prev;
      }, {});
    const errorPropList = arr =>
      arr.length > 1
        ? `properties '${arr.join(', ')}'`
        : `property '${arr[0]}'`;
    const propertyHash = arrayToHash(properties);
    const orderHash = arrayToHash(order);
    const extraneous = order.filter(
      prop => prop !== '*' && !propertyHash[prop],
    );
    if (extraneous.length) {
      throw new Error(
        `uiSchema order list contains extraneous ${errorPropList(extraneous)}`,
      );
    }
    const rest = properties.filter(prop => !orderHash[prop]);
    const restIndex = order.indexOf('*');
    if (restIndex === -1) {
      if (rest.length) {
        throw new Error(
          `uiSchema order list does not contain ${errorPropList(rest)}`,
        );
      }
      return order;
    }
    if (restIndex !== order.lastIndexOf('*')) {
      throw new Error(
        'uiSchema order list contains more than one wildcard item',
      );
    }

    const complete = [...order];
    complete.splice(restIndex, 1, ...rest);
    return complete;
  };

  private countTabs = (properties: {[k: string]: JSONSchema4} = {}): number =>
    Object.keys(properties).reduce((result, key) => {
      const type: string | string[] = properties[key].type;

      return type.includes('object') || type.includes('array')
        ? result + 1
        : result;
    }, 0);

  private handleToggleButtonClick = (): void => {
    this.setState(({value, isNull}) => {
      if (value === undefined) {
        return {value: {}};
      }

      return {
        value: isNull ? {} : null,
        isNull: !isNull,
      };
    });
  };
}
