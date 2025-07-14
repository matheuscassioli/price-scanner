import { createContext, useRef, useState } from 'react';
import { showCustomToast } from '../../helpers/helpers';

export const TasksContext = createContext();

export function TasksProvider({ children }) {

    const initialTasks = [
        {
            taskId: 1,
            taskContent: 'comprar ovos'
        },
        {
            taskId: 2,
            taskContent: 'comprar pães'
        },
        {
            taskId: 3,
            taskContent: 'comprar leite'
        }
    ]

    const [tasks, setTasks] = useState(initialTasks)
    const [text, setText] = useState('')
    const [editableItem, setEditableItem] = useState('')

    const flatListRef = useRef(null)

    const atualizeTasks = (task) => {
        const newTask = { taskId: tasks.length + 1, taskContent: task }
        setTasks(prevTasks => [...prevTasks, newTask]);
        setText('')
        flatListRef?.current.scrollToEnd({ animated: true });
    }

    const deleteTask = (taskId) => {
        const newTasks = tasks.filter(key => key.taskId !== taskId)
        setTasks(newTasks)
        showCustomToast('Tarefa deletada com sucesso.', 'success')
    }

    const atualizeAddTaskValue = (text) => {
        setText(text)
    }

    const addTask = () => {
        if (text.trim() == '') {
            showCustomToast('O campo tarefa nao pode ser vazio.', 'error')
            return
        }
        atualizeTasks(text)
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
                text,
                atualizeAddTaskValue,
                addTask,
                flatListRef,
                deleteTask,
                editableItem,
                defineEditableTask,
                saveUpdateTask
            }}>
            {children}
        </TasksContext.Provider>
    );
}