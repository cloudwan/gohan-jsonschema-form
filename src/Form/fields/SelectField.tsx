import {ErrorMessage, FastField} from 'formik';
import * as React from 'react';

import {IWidget} from '../../typings/IWidget';
import Errors from '../components/Errors';
import validator from '../Validator';
import SelectWidget from '../widgets/SelectWidget';
import FormContext from './../FormContext';

interface ISelectFieldProps extends IWidget {
  fetcher?: (
    relation: string,
  ) => Promise<Array<{label: string; value: string}>>;
}
export class SelectField extends React.Component<ISelectFieldProps> {
  public render(): React.ReactNode {
    const {schema, uiSchema, id} = this.props;

    const commonProps = {
      name: id,
      schema,
      uiSchema,
      validate: this.validate,
      component: SelectWidget,
    };

    if (!schema.enum && schema.relation) {
      return (
        <FormContext.Consumer>
          {(
            fetcher: (
              relation: string,
            ) => Promise<Array<{label: string; value: string}>>,
          ) => (
            <React.Fragment>
              <ErrorMessage name={id} />
              <FastField {...commonProps} fetcher={fetcher} />
            </React.Fragment>
          )}
        </FormContext.Consumer>
      );
    }

    return (
      <React.Fragment>
        <ErrorMessage name={id} />
        <FastField {...commonProps} />
      </React.Fragment>
    );
  }

  private validate = value => {
    const {isRequired, schema} = this.props;
    const errors = [];

    if (isRequired && !value) {
      errors.push({message: 'Required'});
    }

    if (value !== undefined) {
      validator.validate(schema, value);

      if (validator.errors) {
        errors.push(...validator.errors);
      }
    }

    return errors.length > 0 ? <Errors errors={errors} /> : undefined;
  };
}

export default SelectField;
