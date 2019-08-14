import {Form} from 'antd';
import * as React from 'react';

import 'antd/lib/form/style';

interface TTemplateProps {
  title?: string;
  description?: string;
  id: string;
  isRequired?: boolean;
  errors?: string;
}

export default class Template extends React.Component<TTemplateProps> {
  public static defaultProps = {
    isRequired: false,
    description: undefined,
    title: undefined,
  };

  public render() {
    const {isRequired, title, description, errors} = this.props;

    return (
      <Form.Item
        label={title}
        extra={description}
        required={isRequired}
        help={errors}
        validateStatus={errors ? 'error' : 'success'}
      >
        {this.props.children}
      </Form.Item>
    );
  }
}
