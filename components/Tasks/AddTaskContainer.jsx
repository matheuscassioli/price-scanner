import { useContext, useEffect, useState } from "react"
import { Keyboard, Pressable, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from "../../theme/globals";
import { StyleSheet } from "react-native";
import { TasksContext } from "../../contexts/TasksContext/TasksContext";
import { colors } from "../../theme/colors";

export default function AddTaskContainer({ onClose }) {

    const { newTask, atualizeAddTaskValue, addTask, addTaskInputRef, newTaskValue, setNewTaskValue } = useContext(TasksContext)

    const handleChangePrince = (text) => {
        const onlyNums = text.replace(/\D/g, '');
        setNewTaskValue(onlyNums);
    };

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

    return <View style={styles.addTaskContainer}>

        <View style={styles.inputWrapper}>
            <Text style={[globalStyles.inputContainerLabel]}>Adicione uma tarefa</Text>
            <TextInput
                placeholder="Digite a tarefa"
                ref={addTaskInputRef}
                style={globalStyles.input}
                onChangeText={atualizeAddTaskValue}
                value={newTask} />
        </View>

        <View style={styles.inputWrapper}>
            <Text style={[globalStyles.inputContainerLabel]}>Valor</Text>
            <TextInput
                placeholder="R$ 0,00"
                value={newTaskValue}
                keyboardType="numeric"
                onChangeText={handleChangePrince}
                style={globalStyles.input} />
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
        marginBottom: 60,
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
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

});

