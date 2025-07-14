import { useContext } from "react"
import { View, FlatList, StyleSheet, Text } from "react-native"
import { GradientBackground } from "../../components/GradientBackground.jsx";
import { TasksContext, TasksProvider } from "../../contexts/TasksContext/TasksContext.jsx";
import ExitButton from './ExitButton.jsx'
import AddTaskContainer from "./AddTaskContainer.jsx";
import { Link } from 'expo-router';
import TaskItem from "./TaskItem.jsx";
import { colors } from "../../theme/colors.js";

export default function ListTaskContainer() {
    return (
        <TasksProvider>
            <ListTasks />
        </TasksProvider>
    );
}

const EmptyListComponent = () => (
    <Text style={{ color: colors.white }}>Não há tarefas :(</Text>
);

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
                ListEmptyComponent={<EmptyListComponent />}
                renderItem={({ item }) => <TaskItem item={item} />}
                keyExtractor={(item) => item.taskId.toString()} />
        </View>
    </GradientBackground>
}

const styles = StyleSheet.create({
    listTaskContainer: {
        display: 'flex',
        maxHeight: 150,
        overflow: 'hidden',
        paddingLeft: 12,
        paddingRight: 12,
    },
    viewTasks: {
        display: "flex",
        height: '100%',
        justifyContent: "center",
        maxHeight: '300',
    }
})