import { useContext } from "react"
import { View, FlatList } from "react-native"
import { GradientBackground } from "../GradientBackground";
import { colors } from "../../theme/colors";
import { Text } from "react-native";
import { TasksContext, TasksProvider } from "../../contexts/TasksContext/TasksContext";
import { ExitButton } from './ExitButton.jsx'
import { TaskContainer } from "./TasksContainer.jsx";

export const ListTaskContainer = () => {
    return <TasksProvider>
        <ListTasks />
    </TasksProvider>
}

const ListTasks = () => {
    const { tasks } = useContext(TasksContext)

    return <GradientBackground>
        <View >
            <ExitButton />

            <TaskContainer />

            <View>
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => <Item taskContent={item.taskContent} />}
                    keyExtractor={(item) => item.taskId.toString()} />
            </View>
        </View>
    </GradientBackground>
}

const Item = ({ taskContent }) => (
    <View>
        <Text style={{ color: colors.white }} >
            {taskContent}
        </Text>
    </View >
);
