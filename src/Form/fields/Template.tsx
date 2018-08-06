import * as React from 'react';

import Asterisk from '../components/Asterisk';
import Description from '../components/Description';
import Label from '../components/Label';

interface TTemplateProps {
  title?: string;
  description?: string;
  id: string;
  isRequired?: boolean;
}

export default class Template extends React.Component<TTemplateProps> {
  public static defaultProps = {
    isRequired: false,
    description: undefined,
    title: undefined,
  };

  public render() {
    const {isRequired, title, description, id} = this.props;

    return (
      <React.Fragment>
        {title && (
          <Label htmlFor={id}>
            {title}
            {isRequired && <Asterisk />}
          </Label>
        )}
        {description && <Description>{description}</Description>}
        {this.props.children}
      </React.Fragment>
    );
  }
}
