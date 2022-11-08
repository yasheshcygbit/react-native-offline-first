import * as actiontype from './actionTypes';
import ApiService from '../../api/ApiService';

// export const toggleShowLoaderForDiscover = (showLoaderForDiscover) => (dispatch) =>
//   dispatch({ type: actiontype.TOGGLE_SHOW_LOADER_FOR_DISCOVER, showLoaderForDiscover });

export const setIsConnected = (isConnected) => (dispatch) =>
  dispatch({ type: actiontype.SET_IS_CONNECTED, isConnected });

export const setAllUsers = (allUsers) => (dispatch) =>
  dispatch({ type: actiontype.SET_ALL_USERS, allUsers });

export const addNewUser = (user) => (dispatch) =>
  dispatch({ type: actiontype.ADD_NEW_USER, user });

export const setIsAdding = (isAdding) => (dispatch) =>
  dispatch({ type: actiontype.IS_ADDING, isAdding });

export const getAllUsers = (hideLoader) => async (dispatch, getState) => {
  try {
    let state = getState();
    if (state.user.isConnected) {
      const users = await ApiService.getAllUsers();
      console.log('[ERR users]', users);
      if (users && users.data) {
        dispatch(setAllUsers(users.data));
      } else {
        dispatch(setAllUsers(null));
      }
    } else {
      // get data from reducer
      console.log('[ERR state.user.users]', state.user.users);
      dispatch(setAllUsers(state.user.users));
    }
  } catch (e) {
    
    console.log('[ERR fetchGetDiscoverDiveLogs]', e);
  }
};

export const createNewUser = (userName, userLastName) => async (dispatch, getState) => {
  try {
    let state = getState();
    if (state.user.isConnected) {
      const data = {
        first_name: userName,
        last_name: userLastName,
        job: 'Test'
      }
      dispatch(setIsAdding(true));
      console.log('[DATA data]', data);
      const response = await ApiService.createNewUser(data);
      console.log('[DATA response]', response);
      dispatch(setIsAdding(false));
      if (response) {
        dispatch(addNewUser(response));
      }
    } else {
      const data = {
        first_name: userName,
        last_name: userLastName,
        job: 'Test',
        isOffline: true,
      }
      dispatch(addNewUser(data));
    }
  } catch (e) {
    dispatch(setIsAdding(false));
    console.log('[ERR fetchGetDiscoverDiveLogs]', e);
  }
};