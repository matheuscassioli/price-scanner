import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [authUser, setAuthUser] = useState(false)
    const [loadingAuth, setLoadingAuth] = useState(false)

    const loginOrLogoutUser = (isLogin) => {
        if (isLogin) {
            return alert('entrar')
        }
        return alert('sair')
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