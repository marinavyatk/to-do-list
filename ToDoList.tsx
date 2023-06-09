import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import App from './App';
import {FilterValuesType} from './App';
import {Simulate} from "react-dom/test-utils";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: TaskType[],
    removeTask: (value: string) => void,
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskName: string) => void
    changeTaskStatus: (taskId: string) => void
    filter:FilterValuesType
}

export const ToDoList = (props: ToDoListPropsType) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onClickChangeFilter = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue);
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setInput(event.currentTarget.value);
    }
    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && input.trim() !== '') {
            props.addTask(input)
            setInput('')
        } else {
            setError("Title is required");
        }
    }
    const onClickAddButtonHandler = () => {
        if (input.trim() !== '') {
            props.addTask(input)
            setInput('')
        } else {
            setError("Title is required");
        }
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input onChange={onChangeInputHandler}
                           value={input}
                           onKeyDown={onKeyDownInputHandler}
                           className={error ? "error" : ""}
                    />
                    <button onClick={onClickAddButtonHandler}>+</button>

                    {error && <div className={"error-message"}>{error}</div>}
                </div>
                <ul>
                    {props.tasks.map((task) => {
                        const onChangeCheckboxHandler = () => {
                            props.changeTaskStatus(task.id)
                        }
                        return <li key={task.id} className={task.isDone?'is-done':''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onChangeCheckboxHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={() => {
                                props.removeTask(task.id)
                            }}>x
                            </button>
                        </li>
                    })}
                </ul>
                <div>
                    <button className={props.filter === 'all'?'active-filter':''}
                        onClick={() => {
                        onClickChangeFilter("all")
                    }}>All
                    </button>
                    <button className={props.filter === 'active'?'active-filter':''}
                        onClick={() => {
                        onClickChangeFilter("active")
                    }}>Active
                    </button>
                    <button className={props.filter === 'completed'?'active-filter':''}
                        onClick={() => {
                        onClickChangeFilter("completed")
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>)
}
