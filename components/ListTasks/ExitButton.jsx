import { Pressable } from "react-native"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { colors } from "../../theme/colors"
import { StyleSheet } from "react-native"
import { useContext } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ExitButton = () => {
    const { loginOrLogoutUser } = useContext(AuthContext)

    return <Pressable
        style={styles.exitButton}
        onPress={() => loginOrLogoutUser(false)}>
        <Icon name="logout" size={24} color={colors.white} />
    </Pressable>
}

const styles = StyleSheet.create({
    exitButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    }
})