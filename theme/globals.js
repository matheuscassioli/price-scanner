import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
    inputContainerLabel: {
        padding: 10,
        marginBottom: -18,
        color: colors.white,
    },
    inputContainer: {
        color: colors.white,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        borderColor: colors.white,
        padding: 10,
        color: colors.white,
        borderRadius: 4
    },
    button: {
        height: 50,
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
    }
})