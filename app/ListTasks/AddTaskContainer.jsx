import { useContext, useEffect } from "react"
import { TasksContext } from "../../contexts/TasksContext/TasksContext"
import { Keyboard, Pressable, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from "../../theme/globals";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default function AddTaskContainer({ onClose }) {

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                onClose()
            }
        );
        return () => {
            keyboardDidHideListener.remove();
        };
    }, [])

    const { text, atualizeAddTaskValue, addTask, addTaskInputRef } = useContext(TasksContext)

    return <View style={styles.addTaskContainer}>

        <View style={styles.inputWrapper}>
            <Text style={[globalStyles.inputContainerLabel]}>Adicione uma tarefa</Text>
            <TextInput
                placeholder="Digite a tarefa"
                ref={addTaskInputRef}
                style={globalStyles.input}
                onChangeText={atualizeAddTaskValue}
                value={text} />
        </View>

        <Pressable style={styles.addButton} onPress={addTask}>
            <Icon name="plus" size={24} color="white" />
        </Pressable>

    </View>
}

const styles = StyleSheet.create({
    addTaskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 20
    },
    inputWrapper: {
        flex: 1,
        marginRight: 0,
        borderRadius: 8,
        padding: 10,
        shadowOffset: { width: 0, height: 1 },
        marginLeft: -20,

    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

});

