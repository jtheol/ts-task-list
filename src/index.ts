import { v4 as uuidV4 } from 'uuid'

type Task = {
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date
}

const taskList = document.querySelector<HTMLUListElement>("#task-list");
const taskForm = document.querySelector<HTMLFormElement>("#new-task-form");
const taskTitle = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = getTasks();

tasks.forEach(addTask);

taskForm?.addEventListener("submit", e => {
    e.preventDefault()

    // Adding optional chaining to check if the taskTitle exists otherwise return undefined.
    if (taskTitle?.value == "" || taskTitle?.value == null) return; // Ensures the title actually exists

    const task = {
        id: uuidV4(),
        title: taskTitle.value,
        completed: false,
        createdAt: new Date(),
    }

    tasks.push(task);
    saveTasksLocally();

    addTask(task);
    taskTitle.value = "";
});

function addTask(task: Task) {

    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasksLocally();
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    label.append(checkbox, task.title);
    item.append(label);
    taskList?.append(item);

};

function saveTasksLocally() {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
};

function getTasks() {
    const taskJson = localStorage.getItem("Tasks");
    if (taskJson == null) return [];
    return JSON.parse(taskJson);
}