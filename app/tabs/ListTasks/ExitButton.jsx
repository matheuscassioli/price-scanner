import { Pressable } from "react-native"  
import { StyleSheet } from "react-native"
import { useContext } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { colors } from "../../../theme/colors";

export default function ExitButton() {
    const { loginOrLogoutUser } = useContext(AuthContext)

    return <Pressable
        style={styles.exitButton}
        onPress={() => loginOrLogoutUser(false)}>
        <Icon name="logout" size={20} color={colors.white} />
    </Pressable>
}

const styles = StyleSheet.create({
    exitButton: {
        position: 'absolute',
        right: 10,
        top: 2,
        zIndex:1
    }
})