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
    const flatListRef = useRef(null)

    const atualizeTasks = (task) => {
        const newTask = { taskId: tasks.length + 1, taskContent: task }
        setTasks(prevTasks => [...prevTasks, newTask]);
        setText('')
        flatListRef?.current.scrollToEnd({ animated: true });
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

    return (
        <TasksContext.Provider
            value={{
                tasks,
                atualizeTasks,
                text,
                atualizeAddTaskValue,
                addTask,
                flatListRef
            }}>
            {children}
        </TasksContext.Provider>
    );
}