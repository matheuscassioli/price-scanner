import Toast from "react-native-toast-message";

export const showCustomToast = (message, type, time = 1000) => {
    Toast.show({
        type: type,
        text1: message,
        visibilityTime: time,
        topOffset: 60,
    });
}