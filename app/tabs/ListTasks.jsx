import { useContext, useEffect, useRef, useState } from "react"
import { View, FlatList, StyleSheet, Text, Pressable, KeyboardAvoidingView, Platform, Animated } from "react-native"
import { colors } from "../../theme/colors.js";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TasksContext } from "../../contexts/TasksContext/TasksContext.jsx";
import TaskItem from "../../components/Tasks/TaskItem.jsx";
import ExitButton from "../../components/Tasks/ExitButton.jsx";
import AddTaskContainer from "../../components/Tasks/AddTaskContainer.jsx";
import WarningEmptyList from '../../components/WarningEmptyList/WarningEmptyList.jsx'

export default function ListTasks() {

    const [isInputVisible, setIsInputVisible] = useState(false);
    const { tasks, flatListRef, addTaskInputRef } = useContext(TasksContext)

    const animation = useRef(new Animated.Value(0))?.current;

    const openAddTask = () => {
        setIsInputVisible(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            if (addTaskInputRef.current) {
                addTaskInputRef.current.focus()
            }
        }, 250)
    };

    const closeAddTask = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsInputVisible(false));
    };

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });

    const opacity = animation;

    return <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} >

        <View style={styles.viewTasks}>
            <FlatList
                keyboardShouldPersistTaps="handled"
                ref={flatListRef}
                style={styles.listTaskContainer}
                data={tasks}
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 }}

                ListEmptyComponent={<WarningEmptyList />}
                renderItem={({ item }) => <TaskItem item={item} />}
                onContentSizeChange={() => flatListRef?.current?.scrollToEnd({ animated: true })}
                keyExtractor={(item) => item.taskId.toString()} />
        </View>

        {isInputVisible && (
            <Animated.View style={{
                opacity,
                transform: [{ translateY }],
                backgroundColor: colors.background,
                overflow: 'hidden',
            }}>
                <AddTaskContainer onClose={closeAddTask} />
            </Animated.View>
        )}


        <ExitButton />

        {!isInputVisible && (
            <Pressable
                style={styles.addFakeButton}
                onPress={openAddTask}>
                <Icon name="plus" size={24} color="white" />
            </Pressable>)}

    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    listTaskContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: colors.background
    },
    viewTasks: {
        flex: 1,
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
    addFakeButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        position: "absolute",
        bottom: 40,
        right: 20,
    },
});
