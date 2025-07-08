import { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { colors } from '../theme/colors';
import { GradientBackground } from './GradientBackground';


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
                    source={require('../assets/CassiDEV.png')}
                />
            </View>
            <View  >
                <View style={styles.inputContainer}>
                    <Text style={styles.inputContainerLabel}>usuario</Text>
                    <TextInput
                        value={authUser['user']}
                        placeholder="Digite seu usuário"
                        onChangeText={(e) => onChangeUserLogin(e, 'user')} RR
                        style={styles.input} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputContainerLabel}>senha</Text>
                    <TextInput
                        value={authUser['password']}
                        onChangeText={(e) => onChangeUserLogin(e, 'password')}
                        placeholder="Digite sua senha"
                        style={styles.input} />
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: colors.white,
        padding: 10,
        color: colors.white
    },
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