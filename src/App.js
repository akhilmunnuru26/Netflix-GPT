import Body from './components/Body'
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './components/ErrorBoundary';

import { persistor } from './utils/appStore';
import appStore from './utils/appStore';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <PersistGate persistor={persistor}>
          <Body />
        </PersistGate>
        
      </Provider>
    </ErrorBoundary>
    
  );
}

export default App;
