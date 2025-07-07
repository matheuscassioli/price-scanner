import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export const Login = () => {
  const [authUser, setAuthUser] = useState({ user: '', password: '' });

  const onChangeUserLogin = (value, key) => {
    setAuthUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const login = () => {
    alert(`Usuário: ${authUser.user}\nSenha: ${authUser.password}`)
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['#0f0c29', '#302b63', '#24243e']}>
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
            style={styles.input}
          />
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
          onPress={() => login()}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#6a0dad" : "purple",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Entrar
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );

};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LinearGradient
        style={styles.container}
        colors={['#0f0c29', '#302b63', '#24243e']}>
        <SafeAreaView style={styles.safeArea}>
          <Login />

        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "lightblue",
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    justifyContent: "center",
    flexGrow: 1,
    padding: 1
  },
  text: {
    fontSize: 18,
    color: "red",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'white'
  },
  inputContainerLabel: {
    padding: 10,
    marginBottom: -18,
    color: 'white',
  },
  inputContainer: {
    color: 'white',
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
    borderRadius: 50
  }
});
