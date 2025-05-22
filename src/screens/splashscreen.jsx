import React from "react";
import { View, Text } from "react-native";

export default function SplashScreen({ navigation }) {
    setTimeout(() => {
        navigation.replace("Home");
    }, 3000);
    
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"#f7d980",gap:30 }}>
            <Text style={{color:"red", textAlign: "center",fontSize:24, }}>Todo App With Redeux</Text>
            <Text style={{color:"red", textAlign: "center",fontSize:24, }}>Welcome to the App</Text>
            <Text style={{color:"red", textAlign: "center",fontSize:24, }}>Loading...</Text>
        </View>
    );
}