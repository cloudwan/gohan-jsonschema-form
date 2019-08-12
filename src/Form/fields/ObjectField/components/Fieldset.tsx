import {Button, Icon, Tabs as AntdTabs} from 'antd';
import {FieldProps} from 'formik';
import {JSONSchema4} from 'json-schema';
import * as React from 'react';

import {IWidget} from '../../../../typings/IWidget';
import Asterisk from '../../../components/Asterisk';
import Tabs from '../../../components/Tabs';
import {isEmptyObject} from '../../../utils';
import SchemaField from '../../SchemaField';

import styles from './Fieldset.css';

interface TFieldsetProps extends FieldProps, IWidget {
  children: React.ReactNode;
  isTab?: boolean;
}

interface TFieldsetState {
  areFieldsVisible: boolean;
}

export const orderProperties = (
  properties: string[] = [],
  order: string[] = [],
): string[] => {
  const extraneous = order.filter(prop => !properties.includes(prop));

  if (extraneous.length) {
    const errorPropList =
      extraneous.length > 1
        ? `properties '${extraneous.join(', ')}'`
        : `property '${extraneous[0]}'`;

    throw new Error(`uiSchema order list contains extraneous ${errorPropList}`);
  }

  const rest = properties.filter(prop => !order.includes(prop));

  return [...order, ...rest];
};

class Fieldset extends React.Component<TFieldsetProps, TFieldsetState> {
  private hasTabs;

  constructor(props) {
    super(props);

    const {
      field: {value},
      schema: {type, properties},
      isRequired,
    } = props;

    this.state = {
      areFieldsVisible: !(
        (value === undefined || isEmptyObject(value)) &&
        type.includes('null') &&
        !isRequired
      ),
    };

    this.hasTabs = this.countTabs(properties) > 1;
  }

  public shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.field.name !== this.props.field.name ||
      nextState.areFieldsVisible !== this.state.areFieldsVisible
    );
  }

  public render(): JSX.Element {
    const {
      schema,
      schema: {properties, propertiesOrder},
      field: {name},
      isTab = false,
    } = this.props;
    const type: string | string[] = schema.type;
    const {areFieldsVisible} = this.state;
    const orderedProperties = orderProperties(
      Object.keys(properties),
      propertiesOrder,
    );
    const primitiveProperties = this.getPrimitiveProperties(orderedProperties);
    const tabProperties = this.getTabProperties(orderedProperties);

    return (
      <React.Fragment>
        {type.includes('null') && (
          <Button
            type="primary"
            onClick={this.handleToggleButtonClick}
            ghost={true}
            className={styles.toggleButton}
          >
            <Icon type={`${!areFieldsVisible ? 'plus' : 'minus'}-circle`} />
            {`${!areFieldsVisible ? 'Add' : 'Remove'} ${schema.title}`}
          </Button>
        )}
        {areFieldsVisible && (
          <fieldset id={name} className={isTab ? '' : styles.fieldset}>
            {primitiveProperties.concat(
              tabProperties.length > 0 ? (
                <Tabs key="tabs">{tabProperties}</Tabs>
              ) : (
                []
              ),
            )}
          </fieldset>
        )}
      </React.Fragment>
    );
  }

  private handleToggleButtonClick = () => {
    const {areFieldsVisible} = this.state;
    if (this.props.field.value === undefined) {
      this.props.form.setFieldValue(this.props.field.name, {});
    } else {
      this.props.form.setFieldValue(
        this.props.field.name,
        !areFieldsVisible ? {} : null,
      );
    }

    this.setState({areFieldsVisible: !areFieldsVisible});
  };

  private getPrimitiveProperties = (orderedProperties: any): any[] => {
    const {
      schema: {properties, required},
      uiSchema = {},
      field: {name},
    } = this.props;

    return orderedProperties
      .filter((key: string): boolean => {
        const fieldType: string | string[] = properties[key].type;

        if (this.hasTabs && properties[key]) {
          return !fieldType.includes('object') && !fieldType.includes('array');
        }

        return true;
      })
      .map((key: string): React.ReactNode[] | JSX.Element => (
        <SchemaField
          id={!name ? key : `${name}.${key}`}
          key={!name ? key : `${name}.${key}`}
          schema={properties[key]}
          uiSchema={uiSchema[key]}
          isRequired={Array.isArray(required) && required.includes(key)}
        />
      ));
  };

  private getTabProperties = (orderedProperties: any): any[] => {
    const {
      schema: {properties, required},
      uiSchema = {},
      field: {name},
    } = this.props;
    return orderedProperties
      .filter((key: string): boolean => {
        const fieldType: string | string[] = properties[key].type;

        if (this.hasTabs && properties[key]) {
          return fieldType.includes('object') || fieldType.includes('array');
        }

        return false;
      })
      .map((key: string): React.ReactNode[] | JSX.Element => (
        <AntdTabs.TabPane
          key={!name ? key : `${name}.${key}`}
          tab={
            <React.Fragment>
              {properties[key] && properties[key].title
                ? properties[key].title
                : key}
              {Array.isArray(required) && required.includes(key) && (
                <Asterisk />
              )}
            </React.Fragment>
          }
          className={styles.tab}
          forceRender={true}
        >
          <SchemaField
            id={!name ? key : `${name}.${key}`}
            schema={properties[key]}
            isRequired={Array.isArray(required) && required.includes(key)}
            uiSchema={{
              ...(uiSchema[key] || {}),
              'ui:title': '',
              'ui:description': '',
              'ui:options': {
                isTab: true,
              },
            }}
          />
        </AntdTabs.TabPane>
      ));
  };

  private countTabs = (properties: {[k: string]: JSONSchema4} = {}): number =>
    Object.keys(properties).reduce((result, key) => {
      const type: string | string[] = properties[key].type;

      return type.includes('object') || type.includes('array')
        ? result + 1
        : result;
    }, 0);
}

export default Fieldset;
