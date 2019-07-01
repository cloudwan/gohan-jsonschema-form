import React from 'react';

export const withHide = (WrappedComponent, onUnmount) => props => {
  React.useEffect(() => () => {
    onUnmount();
  });

  return <WrappedComponent {...props} />;
};
