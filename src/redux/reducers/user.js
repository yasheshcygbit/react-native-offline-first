import produce from 'immer';
import * as actiontype from '../actions/actionTypes';

const intitialState = {
  users: [],
  isConnected: true,
  isAdding: false
};

const initialFetch = (state = intitialState, action) => {
  switch (action.type) {
    case actiontype.SET_ALL_USERS:
      return produce(state, (draftState) => {
        console.log('[action.data]', action.allUsers);
        // eslint-disable-next-line
        draftState.users = action.allUsers;
      });
    case actiontype.IS_ADDING:
      return produce(state, (draftState) => {
        draftState.isAdding = action.isAdding;
      });
    case actiontype.ADD_NEW_USER:
      return produce(state, (draftState) => {
        console.log('[action.data]', action.user);
        // eslint-disable-next-line
        draftState.users.push(action.user);
        console.log('[draftState.users]', draftState.users);
      });
    case actiontype.SET_IS_CONNECTED:
      return produce(state, (draftState) => {
        draftState.isConnected = action.isConnected;
      });
    default:
      return state;
  }
};

export default initialFetch;
