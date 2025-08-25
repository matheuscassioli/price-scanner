import React, { createContext, useState } from 'react';
import { showCustomToast } from '../../helpers/helpers';
import { router } from 'expo-router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [authUser, setAuthUser] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(false)

    const loginOrLogoutUser = (isLogin, authUserValue) => {
        setLoadingAuth(true)

        if (isLogin) {
            const { user, password } = authUserValue

            if (user == 'admin' && password == '1234') {
                setTimeout(() => {
                    setAuthUser(true)
                    setLoadingAuth(false)
                    router.replace("/tabs/DashBoard");
                }, 1000)
                return
            }
            setTimeout(() => {
                setLoadingAuth(false)
            }, 400)
            showCustomToast('Senha ou usuário incorretos.', 'error', 1000)
            return
        }
        setLoadingAuth(false)
        setAuthUser(false)
        router.replace("/Login");
    }
    return (
        <AuthContext.Provider
            value={{
                loginOrLogoutUser,
                authUser,
                loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    );
}