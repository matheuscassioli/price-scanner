import { createContext, useEffect, useRef, useState } from 'react';
import { showCustomToast } from '../../helpers/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TasksContext = createContext();

export function TasksProvider({ children }) {


    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [newTaskValue, setNewTaskValue] = useState('')
    const [editableItem, setEditableItem] = useState('')
    const [valueWithCifra, setValueWithCifra] = useState('R$ 0,00')

    const addTaskInputRef = useRef(null)
    const flatListRef = useRef(null)

    useEffect(() => {
        getTasksInAsyncStorage = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@tasks')
                if (jsonValue) {
                    setTasks(JSON.parse(jsonValue))
                }
            } catch (e) {
                console.error(e)
            }
        }
        getTasksInAsyncStorage()
    }, [])

    useEffect(() => {
        setTaskInAsyncStorage = async () => {
            try {
                const jsonValue = JSON.stringify(tasks)
                await AsyncStorage.setItem('@tasks', jsonValue)
            } catch (e) {
                console.error(e)
            }
        }
        setTaskInAsyncStorage()
    }, [tasks])

    const atualizeTasks = (task, taskValue) => {
        const newTask = {
            taskId: tasks.length + 1,
            taskContent: task,
            value: taskValue
        }

        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTask('')
        setEditableItem('')
        setValueWithCifra('R$ 0,00')
        setNewTaskValue('')
    }

    const deleteTask = (taskId) => {
        const newTasks = tasks.filter(key => key.taskId !== taskId)
        setTasks(newTasks)
    }

    const atualizeAddTaskValue = (text) => {
        setNewTask(text)
    }

    const addTask = () => {
        if (newTask.trim() == '') {
            return showCustomToast('O campos não podem ser vazios.', 'error')
        }
        if (newTask.trim() == '') {
            return showCustomToast('O campo tarefa é obrigatório.', 'error')
        }
        if (newTaskValue == '') {
            return showCustomToast('O campo valor é obrigatório.', 'error')
        }
        atualizeTasks(newTask, newTaskValue)
    }

    const defineEditableTask = (taskId) => {
        setEditableItem(taskId)
    }

    const saveUpdateTask = (taskId, taskNewValue) => {
        const updateTasks = tasks;
        Object.keys(updateTasks).map(key => {
            if (updateTasks[key].taskId == taskId) {
                updateTasks[key].taskContent = taskNewValue
            }
        })
        setTasks(updateTasks)
        defineEditableTask('')
        showCustomToast('Tarefa editada com sucesso.', 'success')
    }

    return (
        <TasksContext.Provider
            value={{
                tasks,
                atualizeTasks,
                newTask,
                setNewTask,
                atualizeAddTaskValue,
                addTask,
                flatListRef,
                addTaskInputRef,
                deleteTask,
                editableItem,
                defineEditableTask,
                saveUpdateTask,
                newTaskValue,
                setNewTaskValue,
                valueWithCifra,
                setValueWithCifra
            }}>
            {children}
        </TasksContext.Provider>
    );
}