import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { StyleSheet } from "react-native";

export default function DashBoard() {
    return <View style={styles.container}>
        <Text>
            dashboard
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: colors.background
    }
}) 