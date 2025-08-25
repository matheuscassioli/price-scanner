import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const GradientBackground = ({ children, style }) => {
    return (
        <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            style={[styles.container, style]}  >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
