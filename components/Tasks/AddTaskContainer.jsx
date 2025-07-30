import { useContext, useEffect, useState } from "react"
import { Keyboard, Pressable, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from "../../theme/globals";
import { StyleSheet } from "react-native";
import { TasksContext } from "../../contexts/TasksContext/TasksContext";
import { colors } from "../../theme/colors";

export default function AddTaskContainer({ onClose }) {

    const { newTask, atualizeAddTaskValue, addTask, addTaskInputRef, setNewTaskValue, valueWithCifra, setValueWithCifra } = useContext(TasksContext)

    const formatBRL = (value) => {
        const numeric = Number(value) / 100;
        return numeric.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const handleChangePrince = (text) => {
        const onlyNums = text.replace(/\D/g, '');
        const formattedValue = formatBRL(onlyNums)
        setValueWithCifra(formattedValue)
        const cleanValue = parseFloat(
            formattedValue.replace(/R\$\s?/, '').replace('.', '').replace(',', '.')
        );
        setNewTaskValue(cleanValue);
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

        <View style={[styles.inputWrapper, { flex: 4 }]}>
            <TextInput
                placeholder="Digite a tarefa"
                ref={addTaskInputRef}
                style={globalStyles.input}
                onChangeText={atualizeAddTaskValue}
                value={newTask}
            />
        </View>

        <View style={[styles.inputWrapper, { flex: 3 }]}>
            <TextInput
                placeholder="R$ 0,00"
                value={valueWithCifra}
                keyboardType="numeric"
                onChangeText={handleChangePrince}
                style={globalStyles.input}
            />
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
        justifyContent: 'space-around',
        padding: 4,
        marginBottom: 60,
    },
    inputWrapper: {
        borderRadius: 8,
        padding: 10,
        shadowOffset: { width: 0, height: 1 },
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1
    },

});

