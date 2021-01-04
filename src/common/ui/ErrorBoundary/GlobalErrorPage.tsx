import * as React from 'react';
import { useSelector } from 'react-redux';
import { ContextReduxState } from 'context/contextTypes';
import ErrorBoundary from './ErrorBoundary';

import classes from './globalErrorPage.module.scss';

const ErrorPage: React.FC = () => (
  <div className={classes.container}>
    <div className={classes.title}>Oops!</div>
    <div className={classes.content}>
      Sorry, the system has encountered an unrecoverable error.
      <br />
      Please refresh this page to continue.
      <br />
      If this situation persists, please contact support for assistance.
    </div>
  </div>
);

interface ErrorGlobalPageProps {
  children: React.ReactNode,
}

const ErrorGlobalPage: React.FC<ErrorGlobalPageProps> = ({ children }) => {
  const globalError = useSelector((s: ContextReduxState) => s.context.app.globalError);

  if (globalError) {
    return <ErrorPage />;
  }

  return <ErrorBoundary errorComponent={ErrorPage}>{children}</ErrorBoundary>;
};

export default ErrorGlobalPage;
