import { View,Text,Button } from "react-native";

export default function Home({ navigation }) {
    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Home</Text>
            <Button title="Go to Add Todo" onPress={() => navigation.navigate("Addtodo")} />
        </View>
    )
}