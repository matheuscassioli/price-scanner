import { useContext, useState } from "react"
import { View, FlatList, StyleSheet, Text, Pressable, KeyboardAvoidingView, Platform } from "react-native"
import { GradientBackground } from "../../components/GradientBackground.jsx";
import { TasksContext, TasksProvider } from "../../contexts/TasksContext/TasksContext.jsx";
import ExitButton from './ExitButton.jsx'
import AddTaskContainer from "./AddTaskContainer.jsx";
import TaskItem from "./TaskItem.jsx";
import { colors } from "../../theme/colors.js";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

    const [isInputVisible, setIsInputVisible] = useState(false);
    const { tasks, flatListRef, addTaskInputRef } = useContext(TasksContext)

    const openAddTask = () => {
        setIsInputVisible(true)
        setTimeout(() => {
            if (addTaskInputRef.current) {
                addTaskInputRef.current.focus();
            }
        }, 100)
    }

    return <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <GradientBackground style={{
            justifyContent: 'center',
            position: 'relative',
        }}>

            <ExitButton />

            <View style={styles.viewTasks}>
                <FlatList
                    ref={flatListRef}
                    contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
                    style={styles.listTaskContainer}
                    data={tasks}
                    ListEmptyComponent={<EmptyListComponent />}
                    renderItem={({ item }) => <TaskItem item={item} />}
                    keyExtractor={(item) => item.taskId.toString()} />
            </View>

            {<AddTaskContainer isInputVisible={isInputVisible} onClose={() => setIsInputVisible(false)} />}

            {!isInputVisible && <Pressable style={styles.addButton} onPress={() => openAddTask()}>
                <Icon name="plus" size={24} color="white" />
            </Pressable>}

        </GradientBackground>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    listTaskContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    viewTasks: {
        flex: 1,
        paddingBottom: 24,
        justifyContent: "flex-start",
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: colors.primary || '#6200ee',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
