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
                size={30}
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
                size={30}
                color={'yellow'} />
        </Pressable>
    }
    const DeleteButton = () => {
        return <Pressable
            style={getButtonStyle(editableItem !== '')}
            disabled={editableItem !== ''}
            onPress={() => deleteTask(taskId)}>
            <Icon
                name="delete"
                size={30}
                color={'red'} />
        </Pressable>
    }

    return (
        <View style={styles.taskItemContainer}>

            {isEditableField && <View>
                <TextInput
                    style={styles.inputEditableTask}
                    onChangeText={setTaskEditValue}
                    value={taskEditValue} />
            </View>}

            {!isEditableField && <Text style={styles.taskItem}>
                {taskContent}
            </Text>}

            <View style={styles.actionsContainer}>

                {isEditableField ? <SaveButton /> : <EditButton />}

                <DeleteButton />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    taskItem: {
        color: colors.white,
        padding: 4,
    },
    taskItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    actionsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    inputEditableTask: {
        borderWidth: 1,
        borderColor: colors.white,
        padding: 2,
        color: colors.white
    }
})