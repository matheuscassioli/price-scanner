import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { useContext } from "react";
import { TasksContext } from "../../contexts/TasksContext/TasksContext";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TaskItem({ item }) {

    const { deleteTask } = useContext(TasksContext)

    const updateTask = (taskId) => {
        console.log('editar task', taskId)
    }

    const { taskContent, taskId } = item

    return (
        <View style={styles.taskItemContainer}>

            <Text style={styles.taskItem}>
                {taskContent}
            </Text>

            <View style={styles.actionsContainer}>
                <Pressable onPress={() => updateTask(taskId)}>
                    <Icon
                        name="edit"
                        size={25}
                        color={'yellowr'} />
                </Pressable>

                <Pressable onPress={() => deleteTask(taskId)}>
                    <Icon
                        name="delete"
                        size={25}
                        color={'red'} />
                </Pressable>
            </View>
        </View>
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
        alignCenter: "center",
        justifyContent: 'space-between'
    },
    actionsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    }
})