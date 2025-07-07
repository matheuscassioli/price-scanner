import { View, Text, TextInput, StyleSheet } from "react-native";

export default function Login() {
    return (
        <View>
            <Text>LOGIN</Text>

            <View>
                <Text style={styles.label}>usuário</Text>
                <TextInput style={styles.input} value="Matheus" />
            </View>

            <View>
                <Text style={styles.label}>senha</Text>
                <TextInput style={styles.input} value="1234" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4
    },
    label: {
        marginBottom: -10,
        padding: 4,
        margin: 10
    }
});
