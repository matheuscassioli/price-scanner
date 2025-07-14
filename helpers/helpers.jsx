import Toast from "react-native-toast-message";

export const showCustomToast = (message, type, time = 1000) => {
    Toast.show({
        type: type,
        text1: message,
        visibilityTime: time,
        topOffset: 60,
    });
}

export const getButtonStyle = (disabled) => ({ pressed }) => [
    {
        opacity: disabled ? 0.5 : 1,
    },
    pressed && !disabled && {
        opacity: 0.7,
    },
];