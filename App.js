/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import UserList from './src/containers/UserList';
import { store, persistor } from './src/redux/configureStore';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserList />
      </PersistGate>
    </Provider>
  );
};
export default App;
