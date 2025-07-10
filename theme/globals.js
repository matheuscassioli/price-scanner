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
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: colors.white,
        padding: 10,
        color: colors.white
    },

})