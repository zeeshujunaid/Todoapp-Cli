import { View,Text,Button } from "react-native";

export default function Addtodo({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Add Todo</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        </View>
    )
}