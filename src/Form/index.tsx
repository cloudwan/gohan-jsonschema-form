import {Form as FormikForm, Formik} from 'formik';
import {JSONSchema4} from 'json-schema';
import defaults from 'json-schema-defaults';
import isEmpty from 'lodash/isEmpty';
import * as React from 'react';

import FormContext from './FormContext';

import {IUiSchema} from '../typings/IUiSchema';
import FormActionButtons from './components/FormActionButtons';
import FormTemplate, {FormTemplateProps} from './components/FormTemplate';
import SchemaField from './fields/SchemaField';

interface TFormProps {
  uiSchema?: {
    [key: string]: IUiSchema;
  };
  formData: object;
  schema: JSONSchema4;
  fetcher?: (
    relation: string,
  ) => Promise<Array<{label: string; value: string}>>;
  Template: (props: FormTemplateProps) => JSX.Element;
  ActionButtons: () => JSX.Element;
  onSubmit: (values: any) => void;
}

export class Form extends React.Component<TFormProps> {
  public static defaultProps = {
    uiSchema: {},
    formData: {},
    Template: FormTemplate,
    ActionButtons: FormActionButtons,
    onSubmit: values => {
      console.log(values);
    },
  };

  public render(): JSX.Element {
    const {
      fetcher,
      formData,
      schema,
      uiSchema,
      onSubmit,
      Template,
      ActionButtons,
    } = this.props;

    const initialValues =
      formData && !isEmpty(formData) ? formData : defaults(schema);

    return (
      <FormContext.Provider value={fetcher}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Template>
            <FormikForm id="gohan-jsonschema-form">
              <SchemaField schema={schema} uiSchema={uiSchema} />
              <ActionButtons />
            </FormikForm>
          </Template>
        </Formik>
      </FormContext.Provider>
    );
  }
}
