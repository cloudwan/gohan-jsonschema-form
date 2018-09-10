import * as React from 'react';

export const WidgetError = (
  props: {messages?: string[]} = {messages: []},
): JSX.Element => (
  <div style={{background: '#ff0000'}}>
    <p>{'Not Found widget'}</p>
    {props.messages.map((msg: string, i: number): JSX.Element => (
      <p key={i}>{msg}</p>
    ))}
  </div>
);

export default WidgetError;
