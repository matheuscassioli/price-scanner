import { useContext, useState, useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { colors } from '../../theme/colors';
import { globalStyles } from '../../theme/globals';
import RenderInput from '../../components/Input/RenderInput'

export default function Login() {
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
    const handleUserSubmit = (isUserInput = false) => {
        Keyboard.dismiss()
        if (isUserInput) {
            secondInputRef.current.focus()
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={styles.containerLogin}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/CassiDEV.png')} />
                    </View>
                    <View>

                        <RenderInput
                            label="Usuário"
                            value={authUser['user']}
                            onSubmitEditing={() => handleUserSubmit(true)}
                            onChangeText={(e) => onChangeUserLogin(e, 'user')}
                            placeholder="Digite seu usuário" />

                        <RenderInput
                            label="Senha"
                            value={authUser['password']}
                            onSubmitEditing={() => handleUserSubmit(false)}
                            ref={secondInputRef}
                            onChangeText={(e) => onChangeUserLogin(e, 'password')}
                            placeholder="Digite sua senha" />

                        <Pressable
                            onPress={() => handlePressLogin()}
                            disabled={verifyDisabled()}
                            style={[globalStyles.button, { opacity: loadingAuth || verifyDisabled() ? 0.6 : 1 }]}>
                            <Text style={styles.text}>{loadingAuth ? 'Aguarde...' : 'Entrar'}</Text>
                        </Pressable>
                    </View>
                </View >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    containerLogin: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: colors.background
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