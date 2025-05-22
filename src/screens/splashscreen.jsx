import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { setTodos } from "../redux/slicetodo";

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

  // Animation value for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Load todos from AsyncStorage
    const loadTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('todos');
        if (jsonValue != null) {
          const todosFromStorage = JSON.parse(jsonValue);
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
  }, [dispatch, navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Todo App with Redux
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Welcome to Your Productivity Hub
      </Animated.Text>
      <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
        Loading...
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7d980',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b94e48',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7c3e3e',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#a54b48',
  },
});
