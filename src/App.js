import Body from './components/Body'
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './utils/appStore';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
        <Body />
      </PersistGate>
      
    </Provider>
    
  );
}

export default App;
