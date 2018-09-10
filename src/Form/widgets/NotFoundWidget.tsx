import * as React from 'react';
import WidgetError from './../components/WidgetError';

interface TNotFoundWidget {
  uiSchema: any;
  schema: any;
}
export default class NotFoundWidget extends React.Component<TNotFoundWidget> {
  public static defaultProps = {
    uiSchema: {},
  };

  public get value(): void {
    return undefined;
  }

  public get isValid(): boolean {
    return false;
  }

  public render(): JSX.Element {
    return (
      <WidgetError
        messages={[
          JSON.stringify(this.props.schema),
          JSON.stringify(this.props.uiSchema),
        ]}
      />
    );
  }
}
