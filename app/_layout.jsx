
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Login } from "../components/_login";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from "../contexts/AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import SplashPreLoading from "../components/SplashPreLoading";
import { Asset } from 'expo-asset';
import { ListTaskContainer } from "../components/ListTasks/ListTasks";

const Stack = createNativeStackNavigator();

function Routes() {

  const { authUser } = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {!authUser &&
        <Stack.Screen
          options={{
            animation: 'slide_from_right',
          }}
          name="Login"
          component={Login} />}

      {authUser &&
        <Stack.Screen
          name="ListTasks"
          options={{
            animation: 'slide_from_right',
          }}
          component={ListTaskContainer} />}
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function loadSplashImage() {
      try {
        await Asset.loadAsync(require("../assets/CassiDEV.png"));
      } catch (e) {
        console.warn("Erro carregando splash image:", e);
      } finally {
        setIsSplashReady(true);
      }
    }
    loadSplashImage();
  }, []);

  function handleSplashFinish() {
    setShowSplash(false);
  }

  if (!isSplashReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LinearGradient style={styles.container} colors={['#0f0c29', '#302b63', '#24243e']}>
        <AuthProvider>
          <SafeAreaView style={styles.safeArea}>
            <Routes />
            <Toast />
            {showSplash && (
              <View style={styles.splashOverlay}>
                <SplashPreLoading onFinish={handleSplashFinish} />
              </View>
            )}
          </SafeAreaView>
        </AuthProvider>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});