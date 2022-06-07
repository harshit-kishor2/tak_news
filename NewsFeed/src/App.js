import React from 'react';
import {SplashScreen} from './views/pages';
import {ReduxProvider} from './store';
import {ErrorBoundary} from './views/components';

const App = () => {
  return (
    <ReduxProvider>
      <SplashScreen />
    </ReduxProvider>
  );
};

export default App;
