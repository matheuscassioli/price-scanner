import { useContext, useState, useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { colors } from '../theme/colors';
import { GradientBackground } from './GradientBackground';
import { globalStyles } from '../theme/globals';


export const Login = () => {
    const [authUser, setAuthUser] = useState({ user: '', password: '' });

    const { loginOrLogoutUser, loadingAuth } = useContext(AuthContext)
    const secondInputRef = useRef(null)

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
        <GradientBackground
            style={styles.gradientContainer}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/CassiDEV.png')} />
            </View>
            <View>
                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.inputContainerLabel}>usuario</Text>
                    <TextInput
                        value={authUser['user']}
                        onSubmitEditing={() => {
                            secondInputRef.current.focus();
                            Keyboard.dismiss
                        }}
                        placeholder="Digite seu usuário"
                        onChangeText={(e) => onChangeUserLogin(e, 'user')}
                        style={globalStyles.input} />
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.inputContainer}>
                        <Text style={globalStyles.inputContainerLabel}>senha</Text>
                        <TextInput
                            value={authUser['password']}
                            ref={secondInputRef}
                            onSubmitEditing={() => Keyboard.dismiss}
                            onChangeText={(e) => onChangeUserLogin(e, 'password')}
                            placeholder="Digite sua senha"
                            style={globalStyles.input} /> 
                    </View>
                </TouchableWithoutFeedback>

                <Pressable
                    onPress={() => handlePressLogin()}
                    disabled={verifyDisabled()}
                    style={[globalStyles.button, { opacity: loadingAuth || verifyDisabled() ? 0.6 : 1 }]}>
                    <Text style={styles.text}>{loadingAuth ? 'Aguarde...' : 'Entrar'}</Text>
                </Pressable>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        justifyContent: 'center',
        marginTop: -100,
    },
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
        width: 75,
        height: 75,
        borderRadius: 8
    },
});