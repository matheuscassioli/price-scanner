
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/AuthContext/AuthContext";
import { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import SplashPreLoading from "../components/SplashPreLoading";
import { Asset } from 'expo-asset';
import { colors } from "../theme/colors.js";
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <View style={styles.container}  >
          <AuthProvider>
            <SafeAreaView style={styles.safeArea}>

              <Slot />

              <Toast position="top" topOffset={200} />

              {showSplash && (
                <View style={styles.splashOverlay}>
                  <SplashPreLoading onFinish={handleSplashFinish} />
                </View>
              )}
            </SafeAreaView>
          </AuthProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  safeArea: {
    flex: 1,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});


