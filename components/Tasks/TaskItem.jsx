import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../theme/colors";
import { useContext, useEffect, useRef, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getButtonStyle } from "../../helpers/helpers";
import Animated, { FadeInDown, FadeOut, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { TasksContext } from "../../contexts/TasksContext/TasksContext";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function TaskItem({ item }) {
    const swipe = useSharedValue(0);
    const bg = useSharedValue(0);

    const { deleteTask, editableItem, defineEditableTask, saveUpdateTask } = useContext(TasksContext)

    const { taskContent, taskId, value } = item

    const [taskEditValue, setTaskEditValue] = useState(taskContent)

    const isEditableField = editableItem == taskId

    const inputRef = useRef(null)

    const panGesture = Gesture.Pan()
        .onUpdate(e => {
            swipe.value = e.translationX;
        })
        .onEnd(() => {
            if (swipe.value < -150) {
                bg.value = withTiming(1, { duration: 150 });
                swipe.value = withTiming(-500, { duration: 300 }, () => {
                    runOnJS(deleteTask)(taskId);
                });
            } else {
                swipe.value = withSpring(0);
            }
        });
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: swipe.value }],
        backgroundColor: interpolateColor(bg.value, [0, 1], ['#2c2c2e', '#ff4d4d'])
    }));

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
            <GestureDetector gesture={panGesture}>

                <Animated.View style={[styles.taskItemContainer, animatedStyle]}>

                    {isEditableField && <TextInput
                        ref={inputRef}
                        style={styles.inputEditableTask}
                        onChangeText={setTaskEditValue}
                        value={taskEditValue} />}

                    {!isEditableField && <Text
                        style={styles.taskItem}
                        numberOfLines={1}
                        ellipsizeMode="tail"> {taskContent}</Text>}

                    {!isEditableField && <View style={styles.taskItemValues}>
                        <Text style={{ color: "green" }}>R$</Text>
                        <Text style={{ color: "white", marginLeft: '5' }}>{value}</Text>
                    </View>}

                    <View style={styles.actionsContainer}>

                        {isEditableField ? <SaveButton /> : <EditButton />}

                        {isEditableField ? <UndoButton /> : <DeleteButton />}

                    </View>
                </Animated.View >
            </GestureDetector>
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    taskItemContainer: {
        height: 60,
        backgroundColor: '#2c2c2e',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 10,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskItem: {
        color: colors.white,
        fontSize: 14,
        flexShrink: 1,
        width: 180,
    },
    taskItemValues: {
        width: 180,
        flexDirection: 'row',
        marginLeft: 10
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
        gap: 4,
    },
    iconButton: {
        padding: 6,
        borderRadius: 6,
        backgroundColor: '#3a3a3c',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 40,
        minHeight: 40,
    }
});
