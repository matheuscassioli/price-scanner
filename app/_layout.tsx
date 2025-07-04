import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const Login = () => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>usuario</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>senha</Text>
        <TextInput style={styles.input} />
      </View>

      <Pressable
        onPress={() => alert("entrar")}
        style={{ backgroundColor: "purple" }}
      >
        <Text>Entrar</Text>
      </Pressable>
    </View>
  );
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <Login />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "lightblue",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: 18,
    color: "red",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputContainerLabel: {
    padding: 10,
    marginBottom: -18,
  },
  inputContainer: {
    backgroundColor: "yellow",
  },
});
