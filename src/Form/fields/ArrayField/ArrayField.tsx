import {FastField, FieldArray, FieldArrayRenderProps} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import List from './components/List';
import Tabs from './components/Tabs';

import FormContext from '../../FormContext';
import SelectWidget from '../../widgets/SelectWidget';

export class ArrayField extends React.Component<IWidget> {
  private isObjectArray = false;

  constructor(props) {
    super(props);
    const {items} = this.props.schema;

    if (items && !Array.isArray(items) && items.type) {
      const type: string | string[] = items.type;
      this.isObjectArray = type.includes('object');
    }
  }

  public render(): React.ReactNode {
    const {id, schema, uiSchema} = this.props;
    const commonProps = {
      name: id,
      schema,
      uiSchema,
      component: SelectWidget,
    };

    if (this.isMultiSelect(this.props.schema)) {
      if (schema.relation) {
        return (
          <FormContext.Consumer>
            {(
              fetcher: (
                relation: string,
              ) => Promise<Array<{label: string; value: string}>>,
            ) => <FastField {...commonProps} fetcher={fetcher} />}
          </FormContext.Consumer>
        );
      }

      return <FastField {...commonProps} />;
    }

    return (
      <FieldArray
        name={id}
        component={(props: FieldArrayRenderProps) =>
          this.isObjectArray ? (
            <Tabs schema={schema} uiSchema={uiSchema} {...props} />
          ) : (
            <List schema={schema} uiSchema={uiSchema} {...props} />
          )
        }
      />
    );
  }

  private isMultiSelect = schema => {
    if (!schema.uniqueItems || !schema.items) {
      return false;
    }
    return Array.isArray(schema.items.enum);
  };
}

export default ArrayField;
