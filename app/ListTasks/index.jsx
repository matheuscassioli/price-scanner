import { useContext } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { GradientBackground } from "../../components/GradientBackground.jsx";
import { colors } from "../../theme/colors.js";
import { Text } from "react-native";
import { TasksContext, TasksProvider } from "../../contexts/TasksContext/TasksContext.jsx";
import ExitButton from './ExitButton.jsx'
import AddTaskContainer from "./AddTaskContainer.jsx";

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

        <View style={styles.viewTasks}>

            <AddTaskContainer />

            <FlatList
                ref={flatListRef}
                style={styles.listTaskContainer}
                data={tasks}
                renderItem={({ item }) => <Item taskContent={item.taskContent} />}
                keyExtractor={(item) => item.taskId.toString()} />
        </View>
    </GradientBackground>
}

const Item = ({ taskContent }) => (
    <View>
        <Text style={styles.taskItem} >
            {taskContent}
        </Text>
    </View>
);

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
    }
})