import {ErrorMessage, FieldArray} from 'formik';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import List from './components/List';
import Tabs from './components/Tabs';

export class ArrayField extends React.Component<IWidget> {
  private isObjectArray = false;

  constructor(props) {
    super(props);
    const {items} = this.props.schema;
    const type: string | string[] = items.type;

    if (items && type) {
      this.isObjectArray = type.includes('object');
    }
  }

  public render(): React.ReactNode {
    const {id, schema} = this.props;

    return (
      <React.Fragment>
        <FieldArray
          name={id}
          component={props =>
            this.isObjectArray ? (
              <Tabs schema={schema} {...props} />
            ) : (
              <List schema={schema} {...props} />
            )
          }
        />
      </React.Fragment>
    );
  }
}

export default ArrayField;
