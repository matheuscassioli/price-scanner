import { createContext, useEffect, useRef, useState } from 'react';
import { showCustomToast } from '../../helpers/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TasksContext = createContext();

export function TasksProvider({ children }) {

    const initialTasks = [
        {
            taskId: 1,
            taskContent: 'ovos',
            value: '16,70'
        },
        {
            taskId: 2,
            taskContent: 'pães',
            value: '9,45'
        },
        {
            taskId: 3,
            taskContent: 'leite',
            value: '4,49'
        }
    ]

    const [tasks, setTasks] = useState(initialTasks)
    const [newTask, setNewTask] = useState('')
    const [newTaskValue, setNewTaskValue] = useState('')
    const [editableItem, setEditableItem] = useState('')
    const [valueWithCifra, setValueWithCifra] = useState('R$ 0,00')

    const addTaskInputRef = useRef(null)
    const flatListRef = useRef(null)

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
        showCustomToast('Tarefa deletada com sucesso.', 'success')
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


    const saveTaskStorage = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('Erro ao salvar no AsyncStorage:', e);
        }
    };

    useEffect(() => {
        saveTaskStorage('@listTaks', tasks);
    }, [tasks])

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