
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Login } from "../components/_login";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from "../contexts/AuthContext/AuthContext";
import { useContext } from "react";
import Toast from 'react-native-toast-message';
import { ListTasks } from "../components/ListTasks";

const Stack = createNativeStackNavigator();

function Routes() {

  const { authUser } = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {authUser &&
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="Login"
          component={Login} />}

      {!authUser &&
        <Stack.Screen
          name="ListTasks"
          options={{
            animation: 'slide_from_right',
          }}
          component={ListTasks} />}
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LinearGradient style={styles.container} colors={['#0f0c29', '#302b63', '#24243e']}>
        <AuthProvider>
          <SafeAreaView style={styles.safeArea}>
            <Routes />
            <Toast />
          </SafeAreaView>
        </AuthProvider>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    justifyContent: "center",
    flexGrow: 1,
    padding: 1
  }
});
