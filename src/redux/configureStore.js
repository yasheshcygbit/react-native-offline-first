import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import user from './reducers/user.js';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialReducer = combineReducers({
  user
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, initialReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);