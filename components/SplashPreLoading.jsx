import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function SplashPreLoading({ onFinish }) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: false,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(600),
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: false,
                }),
                Animated.timing(translateY, {
                    toValue: -30,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            if (onFinish) onFinish();
        });
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <Animated.Image
                source={require('../assets/CassiDEV.png')}
                style={[styles.logo, { transform: [{ translateY }] }]}
                resizeMode="contain" />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 90,
        height: 90,
    },
});
