import { Pressable } from "react-native"
import { StyleSheet } from "react-native"
import { useContext } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { colors } from "../../theme/colors";

export default function ExitButton() {
    const { loginOrLogoutUser } = useContext(AuthContext)

    return <Pressable
        style={styles.exitButton}
        onPress={() => loginOrLogoutUser(false)}>
        <Icon name="logout" size={22} color={colors.white} />
    </Pressable>
}

const styles = StyleSheet.create({
    exitButton: {
        left: 20,
        bottom: 40,
        zIndex: 1,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        position: "absolute", 
    }
})