import * as React from 'react';
import { DynamicModuleLoader, IModule } from 'redux-dynamic-modules';

const withModule = (component: React.ElementType, getModule: () => IModule<unknown>)
  : React.FC => {
  const C = component;
  return (props: unknown) => (
    <DynamicModuleLoader modules={[getModule()]}>
      {/* HoC Usage */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <C {...props} />
    </DynamicModuleLoader>
  );
};

export default withModule;
