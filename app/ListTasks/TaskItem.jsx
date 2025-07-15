import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../theme/colors";
import { useContext, useState } from "react";
import { TasksContext } from "../../contexts/TasksContext/TasksContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getButtonStyle } from "../../helpers/helpers";

export default function TaskItem({ item }) {
    const { deleteTask, editableItem, defineEditableTask, saveUpdateTask } = useContext(TasksContext)

    const { taskContent, taskId } = item

    const [taskEditValue, setTaskEditValue] = useState(taskContent)

    const isEditableField = editableItem == taskId

    const SaveButton = () => {
        return <Pressable
            onPress={() => saveUpdateTask(taskId, taskEditValue)}>
            <Icon
                name="save"
                size={26}
                color="green" />
        </Pressable>
    }

    const EditButton = () => {
        return <Pressable
            style={getButtonStyle(editableItem !== '')}
            disabled={editableItem !== ''}
            onPress={() => defineEditableTask(taskId)}>
            <Icon
                name="edit"
                size={26}
                color={colors.white} />
        </Pressable>
    }
    const DeleteButton = () => {
        return <Pressable
            style={getButtonStyle(editableItem !== '')}
            disabled={editableItem !== ''}
            onPress={() => deleteTask(taskId)}>
            <Icon
                name="delete"
                size={26}
                color={'red'} />
        </Pressable>
    }

    const UndoButton = () => {
        return (
            <Pressable onPress={() => undoTask(taskId)}>
                <Icon
                    name="undo"
                    size={26}
                    color="orange" />
            </Pressable>
        );
    };


    const undoTask = () => {
        setTaskEditValue(taskContent)
    }

    return (
        <View style={styles.taskItemContainer}>

            {isEditableField && <TextInput style={styles.inputEditableTask} onChangeText={setTaskEditValue} value={taskEditValue} />}

            {!isEditableField && <Text style={styles.taskItem}>{taskContent}</Text>}

            <View style={styles.actionsContainer}>

                {isEditableField ? <SaveButton /> : <EditButton />}

                {isEditableField ? <UndoButton /> : <DeleteButton />}

            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    taskItemContainer: {
        backgroundColor: '#2c2c2e',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskItem: {
        color: colors.white,
        fontSize: 16,
        flex: 1,
        paddingRight: 10,
    },
    inputEditableTask: {
        borderBottomWidth: 1,
        borderColor: '#666',
        padding: 4,
        color: colors.white,
        fontSize: 16,
        flex: 1,
        marginRight: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
