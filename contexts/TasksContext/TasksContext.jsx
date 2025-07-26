import { createContext, useRef, useState } from 'react';
import { showCustomToast } from '../../helpers/helpers';

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
        if (newTaskValue.trim() == '') {
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
                setNewTaskValue
            }}>
            {children}
        </TasksContext.Provider>
    );
}