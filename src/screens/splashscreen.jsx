import React from "react";
import { View, Text } from "react-native";

export default function SplashScreen({ navigation }) {
    setTimeout(() => {
        navigation.replace("Home");
    }, 3000);
    
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Loading...</Text>
        </View>
    );
}