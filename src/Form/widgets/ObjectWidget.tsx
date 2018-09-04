import {Button, Icon} from 'antd';
import {uniq} from 'lodash';
import * as React from 'react';

import SchemaField from '../fields/SchemaField';

interface TObjectWidgetProps {
  schema: any;
  uiSchema?: any;
  value?: any;
  isRequired?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  searchThreshold?: number;
  id: string;
}

interface TObjectWidgetState {
  value: any;
}

export default class ObjectWidget extends React.Component<
  TObjectWidgetProps,
  TObjectWidgetState
> {
  public static defaultProps = {
    value: {},
    uiSchema: {},
    isRequired: false,
  };

  public static getDerivedStateFromProps(props) {
    return {
      value: props.value,
    };
  }

  private properties = {};

  public get value() {
    const {properties} = this.props.schema;

    if (this.state.value === null) {
      return this.state.value;
    }
    return Object.keys(properties).reduce((result, key) => {
      result[key] = this.properties[key].value;
      return result;
    }, {});
  }

  public get isValid(): boolean {
    return Object.keys(this.properties).reduce((result, key) => {
      const testedField = this.properties[key].isValid;

      if (result === false) {
        return result;
      } else if (testedField === false) {
        return false;
      }

      return result;
    }, true);
  }

  public render(): JSX.Element {
    const {
      isRequired,
      schema: {title, type, description},
      id,
    } = this.props;
    const {value} = this.state;
    // TODO move fieldset to dump component
    return (
      <fieldset id={id}>
        {type.includes('null') && (
          <Button
            type="primary"
            size="small"
            onClick={this.handleAddRemoveButton}
            ghost={true}
          >
            <Icon type={value === null ? 'plus-circle' : 'minus-circle'} />
          </Button>
        )}
        {value !== null && this.renderFields()}
      </fieldset>
    );
  }

  private handleAddRemoveButton = (): void => {
    const {value} = this.state;

    if (value === null) {
      this.setState({value: {}}, () => (this.properties = {}));
    } else {
      this.setState({value: null}, () => (this.properties = {}));
    }
  };

  private renderFields(): React.ReactNode {
    const {uiSchema, id} = this.props;
    const {'ui:order': uiOrder} = this.props.uiSchema;
    const {properties, propertiesOrder = [], required} = this.props.schema;

    return uniq(
      (uiOrder || propertiesOrder).concat(Object.keys(properties)),
    ).map((key: string) => {
      const property = properties[key];
      const uiProperty = uiSchema[key];
      const value =
        this.state.value && this.state.value[key] !== undefined
          ? this.state.value[key]
          : property.default;
      const isRequired = Array.isArray(required) && required.includes(key);

      if (uiProperty && uiProperty['ui:hidden'] === true) {
        return null;
      }

      return (
        <SchemaField
          id={`${id}.${key}`}
          key={`${id}.${key}`}
          ref={c => {
            this.properties[key] = c;
          }}
          schema={property}
          uiSchema={uiProperty}
          isRequired={isRequired}
          value={value}
        />
      );
    });
  }
}
