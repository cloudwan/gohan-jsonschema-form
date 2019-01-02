import React from 'react';

export interface FormTemplateProps {
  children: React.ReactNode;
}

export const FormTemplate = ({children}: FormTemplateProps): JSX.Element => (
  <React.Fragment>{children}</React.Fragment>
);

export default FormTemplate;
