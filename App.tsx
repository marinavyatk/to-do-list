import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {TaskType} from "./ToDoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const titleString = "Monday tasks"
    let [tasks, setTasks] = useState<TaskType[]>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ]
    );
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string) {
        let updatedTasks = tasks.filter(el => el.id !== id);
        setTasks(updatedTasks);
    }

    const addTask = (taskName: string) => {
        const newTask = {
            id: v1(),
            title: taskName,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const changeTaskStatus = (taskId: string) => {
        let changedTask = tasks.find(t => t.id === taskId);
        if (changedTask) {
            changedTask.isDone = !changedTask.isDone;
        }
        let copyTasks = [...tasks]
        setTasks(copyTasks);
    }


    let tasksForToDoList = tasks;
    if (filter === "active") {
        tasksForToDoList = tasks.filter((task) => !task.isDone)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter((task) => task.isDone)
    }
    return (
        <div>
            <ToDoList title={titleString}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
