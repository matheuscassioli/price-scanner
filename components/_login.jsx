import { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { colors } from '../theme/colors';
import { GradientBackground } from './GradientBackground';
import { globalStyles } from '../theme/globals';


export const Login = () => {
    const [authUser, setAuthUser] = useState({ user: '', password: '' });

    const { loginOrLogoutUser, loadingAuth } = useContext(AuthContext)

    const handlePressLogin = async () => {
        loginOrLogoutUser(true, authUser)
    };

    const onChangeUserLogin = (value, key) => {
        setAuthUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const verifyDisabled = () => {
        if (authUser.user == '' || authUser.password == '') {
            return true
        }
        return false
    }

    return (
        <GradientBackground style={{ justifyContent: 'center' }}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/CassiDEV.png')} />
            </View>
            <View  >
                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputContainerLabel}>usuario</Text>
                    <TextInput
                        value={authUser['user']}
                        placeholder="Digite seu usuário"
                        onChangeText={(e) => onChangeUserLogin(e, 'user')} RR
                        style={globalStyles.input} />
                </View>

                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputContainerLabel}>senha</Text>
                    <TextInput
                        value={authUser['password']}
                        onChangeText={(e) => onChangeUserLogin(e, 'password')}
                        placeholder="Digite sua senha"
                        style={globalStyles.input} />
                </View>

                <Pressable
                    onPress={() => handlePressLogin()}
                    disabled={verifyDisabled()}
                    style={[styles.buttonEntry, { opacity: loadingAuth || verifyDisabled() ? 0.6 : 1 }]}>
                    <Text style={styles.text}>{loadingAuth ? 'Aguarde...' : 'Entrar'}</Text>
                </Pressable>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: "lightblue",
    },
    text: {
        fontSize: 18,
        color: colors.white
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 90,
        height: 90,
        borderRadius: 8
    },
    buttonEntry: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
    }
});