import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../theme/colors";
import { useContext, useEffect, useRef, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getButtonStyle } from "../../../helpers/helpers";
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { TasksContext } from "../../../contexts/TasksContext/TasksContext";

export default function TaskItem({ item }) {

    const { deleteTask, editableItem, defineEditableTask, saveUpdateTask } = useContext(TasksContext)

    const { taskContent, taskId } = item

    const [taskEditValue, setTaskEditValue] = useState(taskContent)

    const isEditableField = editableItem == taskId

    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditableField && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditableField]);

    const SaveButton = () => {
        return <Pressable
            style={styles.iconButton}
            onPress={() => saveUpdateTask(taskId, taskEditValue)}>
            <Icon
                name="save"
                size={26}
                color="green" />
        </Pressable>
    }

    const EditButton = () => {
        return <Pressable
            style={[getButtonStyle(editableItem !== ''), styles.iconButton]}
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
            style={[getButtonStyle(editableItem !== ''), styles.iconButton]}
            disabled={editableItem !== ''}
            onPress={() => deleteTask(taskId)}>
            <Icon
                name="delete"
                size={26}
                color={'red'} />
        </Pressable>
    }

    const sameValues = taskContent == taskEditValue

    const UndoButton = () => {

        return (
            <Pressable
                color={sameValues ? 'gray' : 'orange'}
                style={[getButtonStyle(sameValues), styles.iconButton]}
                disabled={sameValues}
                onPress={() => undoTask(taskId)}>
                <Icon
                    name="undo"
                    size={26}
                    color={sameValues ? 'gray' : 'orange'} />
            </Pressable>
        );
    };


    const undoTask = () => {
        setTaskEditValue(taskContent)
    }

    return (
        <Animated.View
            entering={FadeInDown.duration(300)}
            exiting={FadeOut.duration(300)}
        >
            <View style={styles.taskItemContainer}>

                {isEditableField && <TextInput ref={inputRef} style={styles.inputEditableTask} onChangeText={setTaskEditValue} value={taskEditValue} />}

                {!isEditableField && <Text style={styles.taskItem}>{taskContent}</Text>}

                <View style={styles.actionsContainer}>

                    {isEditableField ? <SaveButton /> : <EditButton />}

                    {isEditableField ? <UndoButton /> : <DeleteButton />}

                </View>
            </View >
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    taskItemContainer: {
        backgroundColor: '#2c2c2e',
        borderRadius: 4,
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
        paddingVertical: 7,
        padding: 0,
        color: colors.white,
        fontSize: 16,
        flex: 1,
        height: '99%',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#3a3a3c',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 40,
        minHeight: 40,
    }
});
