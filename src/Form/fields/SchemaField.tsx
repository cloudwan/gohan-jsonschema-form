import {connect, FormikProps, getIn} from 'formik';
import {JSONSchema4} from 'json-schema';
import {isEqual} from 'lodash';
import * as React from 'react';

import {IUiSchema} from '../../typings/IUiSchema';
import {withHide} from '../components/withHide';
import {getFieldValue, matchValue} from '../utils';
import {selectField} from './';
import Template from './Template';

interface IFieldProps {
  id?: string;
  schema: JSONSchema4;
  uiSchema?: IUiSchema;
  isRequired?: boolean;
  formik: FormikProps<any>;
}

interface IFieldState {
  hidden: boolean;
}

export class SchemaField extends React.Component<IFieldProps, IFieldState> {
  public static defaultProps = {
    id: '',
    uiSchema: {},
    isRequired: false,
  };

  public constructor(props) {
    super(props);

    this.state = {
      hidden: false,
    };
  }

  public shouldComponentUpdate(nextProps, nextState) {
    if (this.props.uiSchema && this.props.uiSchema['ui:hide']) {
      const prevHideSourceValue = getFieldValue(
        this.props.uiSchema['ui:hide'].source,
        this.props.id,
        this.props.formik.values,
        getIn,
      );

      const nextHideSourceValue = getFieldValue(
        nextProps.uiSchema['ui:hide'].source,
        nextProps.id,
        nextProps.formik.values,
        getIn,
      );

      const hasValueChanged = !isEqual(
        prevHideSourceValue,
        nextHideSourceValue,
      );
      const hasHiddenStateChanged = this.state.hidden !== nextState.hidden;

      return hasValueChanged || hasHiddenStateChanged;
    }

    return false;
  }

  public render(): React.ReactNode {
    const {
      schema = {},
      uiSchema = {},
      uiSchema: {'ui:title': uiTitle, 'ui:description': uiDescription},
      isRequired,
      id,
      formik,
    } = this.props;
    const type: string | string[] = schema.type;
    let title = schema.title;
    let description = schema.description;

    if (uiTitle !== undefined && typeof uiTitle === 'string') {
      title = uiTitle;
    }

    if (uiDescription !== undefined && typeof uiDescription === 'string') {
      description = uiDescription;
    }

    let Field;

    if (uiSchema && uiSchema['ui:hide']) {
      const value = getFieldValue(
        uiSchema['ui:hide'].source,
        id,
        formik.values,
        getIn,
      );
      const regex = RegExp(uiSchema['ui:hide'].test, 'g');

      if (matchValue(value, regex)) {
        return null;
      }
    }

    if (uiSchema['ui:widget']) {
      if (typeof uiSchema['ui:widget'] === 'function') {
        Field = uiSchema['ui:widget'];
      } else if (uiSchema['ui:widget'] === 'Hidden') {
        return null;
      } else {
        Field = selectField(uiSchema['ui:widget']);
      }
    } else {
      if (type.includes('object')) {
        Field = selectField('Object');
        if (!schema.properties) {
          Field = selectField('Code');
        } else if (
          schema.format === 'yaml' ||
          uiSchema['ui:format'] === 'yaml'
        ) {
          Field = selectField('Yaml');
        }
      } else if (schema.enum) {
        Field = selectField('Select');
      } else if (type.includes('array')) {
        Field = selectField('Array');
      } else if (type.includes('boolean')) {
        Field = selectField('Boolean');
      } else if (schema.enum || schema.relation) {
        Field = selectField('Select');
      } else if (type.includes('string')) {
        Field = selectField('String');

        if (schema.format === 'yaml' || uiSchema['ui:format'] === 'yaml') {
          Field = selectField('Yaml');
        }
      } else if (type.includes('integer') || type.includes('number')) {
        Field = selectField('Number');
      } else {
        Field = selectField('NotFound');
      }
    }

    if (uiSchema && uiSchema['ui:hide']) {
      Field = withHide(Field, this.handleComponentUnmount);
    }

    return (
      <Template
        title={title}
        description={description}
        isRequired={isRequired}
        id={id}
      >
        <Field
          id={id}
          schema={schema}
          uiSchema={uiSchema}
          isRequired={isRequired}
        />
      </Template>
    );
  }

  private handleComponentUnmount = () => {
    const {formik, id} = this.props;
    formik.setFieldValue(id, undefined, false);
  };
}

export default connect(SchemaField);
