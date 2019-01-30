import {FieldArray, FieldArrayRenderProps} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import List from './components/List';
import Tabs from './components/Tabs';

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

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default ArrayField;
