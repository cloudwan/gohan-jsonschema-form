import * as React from 'react';

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
      <div style={{background: '#ff0000'}}>
        <p>{'Not Found widget'}</p>
        <p>{JSON.stringify(this.props.schema)}</p>
        <p>{JSON.stringify(this.props.uiSchema)}</p>
      </div>
    );
  }
}
