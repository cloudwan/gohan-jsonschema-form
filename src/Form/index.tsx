import {Form as AntdForm} from 'antd';
import {FormProps} from 'antd/lib/form';
import {Form as FormikForm, Formik} from 'formik';
import {JSONSchema4} from 'json-schema';
import * as React from 'react';

import 'antd/lib/form/style';

import FormContext from './FormContext';

import {IUiSchema} from '../typings/IUiSchema';
import FormActionButtons from './components/FormActionButtons';
import FormTemplate, {FormTemplateProps} from './components/FormTemplate';
import SchemaField from './fields/SchemaField';
import {getInitialValues} from './utils';

interface TFormProps extends FormProps {
  uiSchema?: {
    [key: string]: IUiSchema;
  };
  formData: object;
  schema: JSONSchema4;
  fetcher?: (
    relation: string,
  ) => Promise<Array<{label: string; value: string}>>;
  Template?: (props: FormTemplateProps) => JSX.Element;
  ActionButtons?: () => JSX.Element;
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
    layout: 'vertical',
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
      wrapperCol,
      labelCol,
      colon,
      hideRequiredMark,
      layout,
    } = this.props;

    const initialValues = getInitialValues(schema, formData);

    return (
      <FormContext.Provider value={fetcher}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({handleSubmit}) => (
            <Template>
              <AntdForm
                id="gohan-jsonschema-form"
                wrapperCol={wrapperCol}
                labelCol={labelCol}
                colon={colon}
                hideRequiredMark={hideRequiredMark}
                layout={layout}
                onSubmit={handleSubmit}
              >
                <SchemaField schema={schema} uiSchema={uiSchema} />
                <ActionButtons />
              </AntdForm>
            </Template>
          )}
        />
      </FormContext.Provider>
    );
  }
}
