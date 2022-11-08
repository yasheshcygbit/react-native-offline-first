/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button } from 'react-native';
import { getAllUsers, setIsConnected, createNewUser } from '../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
 
const UserList = () => {
  const users = useSelector((state) => state.user.users);
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const isConnected = useSelector((state) => state.user.isConnected);
  const isAdding = useSelector((state) => state.user.isAdding);
  const dispatch = useDispatch();
  let unsubscribe;

  const subscribeToListnerOfNetInfo = () => {
    unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      dispatch(setIsConnected(state.isConnected));
    });
  }
  const addNewUserFn = () => {
    // add new user
    dispatch(createNewUser(userName, userLastName))
  }
  useEffect(() => {
    dispatch(getAllUsers());
    subscribeToListnerOfNetInfo();
    return(() => {
      unsubscribe();
    })
  }, [])
  return (
    <SafeAreaView>
      <View>
        {users && users.length > 0 ? (
          <View>
            <View>
              <Text>{isConnected ? 'CONNECTED' : 'OFFLINE'}</Text>
            </View>
            <View>
              <Text>Users List</Text>
            </View>
            <View>
              {users.map(item => (
                <View>
                  <Text>{item.first_name + ' ' + item.last_name}</Text>
                </View>
              ))}
            </View>
            <View>
              <TextInput style={[{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 }]} placeholder='Add First Name' value={userName} onChangeText={(text) => setUserName(text)} />
              <TextInput style={[{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 10 }]} placeholder='Add Last Name' value={userLastName} onChangeText={(text) => setUserLastName(text)} />
              <Button title={isAdding ? 'Adding... Please wait' : 'Add New User'} onPress={() => isAdding ? null : addNewUserFn()} />
            </View>
          </View>
        ) : (
          <View>
            <Text>No users</Text>
          </View>
        )}
      </View>    
    </SafeAreaView>
  );
};
 
 export default UserList;
 