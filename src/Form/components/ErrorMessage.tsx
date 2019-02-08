import {connect, FormikContext, getIn} from 'formik';
import React from 'react';
import Errors from './Errors';

export interface ErrorMessageProps {
  name: string;
  className?: string;
  component?: string | React.ComponentType;
  children?: ((errorMessage: string) => React.ReactNode);
  render?: ((errorMessage: string) => React.ReactNode);
}

class ErrorMessageImpl extends React.Component<
  ErrorMessageProps & {formik: FormikContext<any>}
> {
  public shouldComponentUpdate(
    props: ErrorMessageProps & {formik: FormikContext<any>},
  ) {
    if (
      getIn(this.props.formik.errors, this.props.name) !==
        getIn(props.formik.errors, this.props.name) ||
      getIn(this.props.formik.touched, this.props.name) !==
        getIn(props.formik.touched, this.props.name) ||
      Object.keys(this.props).length !== Object.keys(props).length
    ) {
      return true;
    } else {
      return false;
    }
  }

  public render() {
    const {formik, name} = this.props;
    const fieldErrors = getIn(formik.errors, name);
    const touch = getIn(formik.touched, name);

    return touch && fieldErrors && fieldErrors.length > 0 ? (
      <Errors errors={fieldErrors} />
    ) : null;
  }
}

export const ErrorMessage = connect<
  ErrorMessageProps,
  ErrorMessageProps & {formik: FormikContext<any>}
>(ErrorMessageImpl);

export default ErrorMessage;
