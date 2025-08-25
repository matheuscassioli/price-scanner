import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedReaction,
    runOnJS,
} from 'react-native-reanimated';

export default function CustomAnimatedNumbers({ value, style }) {
    const animatedValue = useSharedValue(0);
    const [displayValue, setDisplayValue] = useState('R$ 0,00');

    useEffect(() => {
        animatedValue.value = withTiming(value, { duration: 1000 });
    }, [value]);

    useAnimatedReaction(
        () => animatedValue.value,
        (val) => {
            const formatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(val);
            runOnJS(setDisplayValue)(formatted);
        },
        []
    );

    return <Text style={style}>{displayValue}</Text>;
}
