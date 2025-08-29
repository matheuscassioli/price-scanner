import { useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';
import { colors } from '../../theme/colors.js';

const EmptyListComponent = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 500, useNativeDriver: true })
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                opacity,
                transform: [{ translateY }],
                paddingVertical: 20,
            }}
        >
            <Text style={{ color: colors.white, fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
                Não há tarefas :(
            </Text>
        </Animated.View>
    );
};

export default EmptyListComponent;
