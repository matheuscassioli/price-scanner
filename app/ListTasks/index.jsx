import { useContext } from "react"
import { View, FlatList, StyleSheet, Pressable } from "react-native"
import { GradientBackground } from "../../components/GradientBackground.jsx";
import { colors } from "../../theme/colors.js";
import { Text } from "react-native";
import { TasksContext, TasksProvider } from "../../contexts/TasksContext/TasksContext.jsx";
import ExitButton from './ExitButton.jsx'
import AddTaskContainer from "./AddTaskContainer.jsx";
import { Link } from 'expo-router';

export default function ListTaskContainer() {
    return (
        <TasksProvider>
            <ListTasks />
        </TasksProvider>
    );
}

const ListTasks = () => {
    const { tasks, flatListRef } = useContext(TasksContext)

    return <GradientBackground style={{
        justifyContent: 'center',
        position: 'relative',
    }}>

        <ExitButton />
        <Link push href="/asajsas">Teste</Link>

        <View style={styles.viewTasks}>

            <AddTaskContainer />

            <FlatList
                ref={flatListRef}
                style={styles.listTaskContainer}
                data={tasks}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.taskId.toString()} />
        </View>
    </GradientBackground>
}

const Item = ({ item }) => {

    const deleteTask = (taskId) => {
        console.log('deletar task', taskId)
    };

    const updateTask = (taskId) => {
        console.log('editar task', taskId)
    }

    return (
        <View style={styles.taskItemContainer}>

            <Text style={styles.taskItem}>
                {item?.taskContent}
            </Text>

            <Pressable
                onPress={() => updateTask(item?.taskId)}>
                <Text>
                    editar
                </Text>
            </Pressable>

            <Pressable
                onPress={() => deleteTask(item?.taskId)}>
                <Text>
                    remover
                </Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    listTaskContainer: {
        display: 'flex',
        maxHeight: 150,
        overflow: 'hidden',
        paddingLeft: 12,
        paddingRight: 12,
    },
    taskItem: {
        color: colors.white,
        padding: 4,
    },
    viewTasks: {
        display: "flex",
        height: '100%',
        justifyContent: "center",
        maxHeight: '300',
    },
    taskItemContainer: {
        backgroundColor: 'blue'
    }
})