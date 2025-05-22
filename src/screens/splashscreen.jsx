import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { setTodos } from "../redux/slicetodo";

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load todos from AsyncStorage
    const loadTodos = async () => {
        // geting todos from async storage
      try {
        const jsonValue = await AsyncStorage.getItem('todos');
        if (jsonValue != null) {
          const todosFromStorage = JSON.parse(jsonValue);
            // Dispatch the setTodos action to update the Redux store
          dispatch(setTodos(todosFromStorage));
          console.log('Todos loaded from AsyncStorage:', todosFromStorage);
        }
      } catch (e) {
        console.error('Failed to load todos from storage:', e);
      } finally {
        navigation.replace("Home");
      }
    };

    loadTodos();
  }, [dispatch, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"#f7d980", gap:30 }}>
      <Text style={{color:"red", textAlign: "center", fontSize:24, }}>Todo App With Redux</Text>
      <Text style={{color:"red", textAlign: "center", fontSize:24, }}>Welcome to the App</Text>
      <Text style={{color:"red", textAlign: "center", fontSize:24, }}>Loading...</Text>
    </View>
  );
}
