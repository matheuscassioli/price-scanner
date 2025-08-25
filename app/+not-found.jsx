import { useNavigation } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

export default function NotFound() {

    const navigation = useNavigation();

    return <View style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center"
    }}>

        <Text
            style={{
                color: colors.white,
                fontSize: 18
            }}>
            Essa página não existe :(
        </Text>

        <TouchableOpacity
            onPress={() => navigation.navigate("ListTasks")}
            style={{ marginTop: 20 }}>
            <Text
                style={{
                    color: colors.white,
                    fontSize: 16
                }}>
                Tarefas
            </Text>
        </TouchableOpacity>
    </View>
}