import {FastField} from 'formik';
import React from 'react';

import {IWidget} from '../../../typings/IWidget';
import CodeEditorWidget from '../../widgets/CodeEditorWidget';

export default class CodeField extends React.Component<IWidget> {
  public render(): JSX.Element {
    const {schema, uiSchema, id} = this.props;

    return (
      <FastField
        name={id}
        schema={schema}
        uiSchema={uiSchema}
        component={CodeEditorWidget}
      />
    );
  }
}
