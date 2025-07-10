import { createContext, useState } from 'react';

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

    const atualizeTasks = (task) => {
        const newTask = { taskId: tasks.length + 1, taskContent: task }
        setTasks(prevTasks => [...prevTasks, newTask]);
        setText('')
    }

    const atualizeAddTaskValue = (text) => {
        setText(text)
    }

    const addTask = () => {
        atualizeTasks(text)
    }

    return (
        <TasksContext.Provider
            value={{
                tasks,
                atualizeTasks,
                text,
                atualizeAddTaskValue,
                addTask
            }}>
            {children}
        </TasksContext.Provider>
    );
}