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
        },
        {
            taskId: 4,
            taskContent: 'queijo',
            value: '12,90'
        },
        {
            taskId: 5,
            taskContent: 'arroz',
            value: '25,30'
        },
        {
            taskId: 6,
            taskContent: 'feijão',
            value: '8,75'
        },
        {
            taskId: 7,
            taskContent: 'açúcar',
            value: '5,20'
        },
        {
            taskId: 8,
            taskContent: 'café',
            value: '17,50'
        },
        {
            taskId: 9,
            taskContent: 'manteiga',
            value: '10,80'
        },
        {
            taskId: 10,
            taskContent: 'macarrão',
            value: '6,40'
        },
        {
            taskId: 11,
            taskContent: 'óleo',
            value: '7,10'
        },
        {
            taskId: 12,
            taskContent: 'frango',
            value: '22,00'
        },
        {
            taskId: 13,
            taskContent: 'carne bovina',
            value: '48,90'
        },
        {
            taskId: 14,
            taskContent: 'banana',
            value: '6,20'
        },
        {
            taskId: 15,
            taskContent: 'maçã',
            value: '8,10'
        },
        {
            taskId: 16,
            taskContent: 'tomate',
            value: '9,90'
        },
        {
            taskId: 17,
            taskContent: 'batata',
            value: '12,40'
        },
        {
            taskId: 18,
            taskContent: 'cenoura',
            value: '7,30'
        },
        {
            taskId: 19,
            taskContent: 'alface',
            value: '3,99'
        },
        {
            taskId: 20,
            taskContent: 'água mineral',
            value: '2,50'
        }
    ];


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