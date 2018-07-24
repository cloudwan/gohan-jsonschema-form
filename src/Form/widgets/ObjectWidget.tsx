import {Button, Icon} from 'antd';
import uniq from 'lodash/uniq';
import * as React from 'react';

import {SchemaField} from '../fields/SchemaField';

interface TObjectWidgetProps {
  schema: any;
  uiSchema?: any;
  value?: any;
  isRequired?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  searchThreshold?: number;
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
  private properties = {};

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value,
    };
  }

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

  private handleAddRemoveButton = (): void => {
    const {value} = this.state;

    if (value === null) {
      this.setState({value: {}}, () => (this.properties = {}));
    } else {
      this.setState({value: null}, () => (this.properties = {}));
    }
  };

  public render(): JSX.Element {
    // tslint:disable-line
    const {uiSchema} = this.props;
    const {'ui:order': uiOrder} = this.props.uiSchema;
    const {
      properties,
      propertiesOrder = [],
      required,
      type,
    } = this.props.schema;

    return uniq(
      (uiOrder || propertiesOrder).concat(Object.keys(properties)),
    ).map(key => {
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

      if (value !== null) {
        return (
          <React.Fragment key={key}>
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
            {value !== null && (
              <SchemaField
                ref={c => {
                  this.properties[key] = c;
                }}
                schema={property}
                uiSchema={uiProperty}
                required={isRequired}
                formData={value}
              />
            )}
          </React.Fragment>
        );
      }
    });
  }
}
