class TaskList {
    #tasks;

    constructor() {
        this.#tasks = this.loadTasks();
    }

    addTask(task) {
        this.#tasks.push(task);
        this.saveTasks();
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); 
    }

    loadTasks() {
        const tasksJson = localStorage.getItem("tasks");
        return tasksJson ? JSON.parse(tasksJson) : [];
    }

    getTasks(){
        return this.#tasks;
    }
}

const taskList = new TaskList();

class Task {
    #id;
    #title;
    #description;
    #createdAt;
    #isCompleted;
    constructor(title, description) {
        if (!title || !title.trim()) alert("Name can not be empty!");
        if (!description || !description.trim()) alert("Description can not be empty!");

        this.#id = Date.now();
        this.#title = title;
        this.#description = description; 
        this.#createdAt = new Date().toLocaleString('ru'); 
        this.#isCompleted = false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addTaskForm");
    const taskListElement = document.getElementById("taskList");

    const renderTasks = () => {
        taskListElement.innerHTML = "";
        taskList.getTasks().forEach((task) => {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";

            taskItem.innerHTML = `
                <h3>${task.id}</h3>
                <button data-id="${task.id}" class="toggle-complete">
                    ${task.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
                <a href="edit.html?id=${task.id}" class="edit-task">Edit</a>
                <a href="details.html?id=${task.id}" class="details-task">Details</a>
                <button data-id="${task.id}" class="delete-task">Delete</button>
            `;

            taskListElement.appendChild(taskItem);
        });
    };

    renderTasks();

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const title = document.getElementById("taskTitle").value;
        const description = document.getElementById("taskDescription").value;

        if (!title || !title.trim()) {
            alert("Name can not be empty!");
            return; 
        }

        if (!description || !description.trim()) {
            alert("Description can not be empty!");
            return; 
        }

        const newTask = new Task(title, description);
        
        taskList.addTask(newTask);

        form.reset();

        renderTasks();
    });

    taskListElement.addEventListener("click", (event) => {
        const target = event.target;

        if (target.classList.contains("toggle-complete")) {
            const taskId = Number(target.dataset.id);
            const task = taskList.tasks.find((task) => task.id === taskId);
            if (task) {
                task.isCompleted = !task.isCompleted;
                taskList.saveTasks();
                renderTasks();
            }
        }

        if (target.classList.contains("delete-task")) {
            const taskId = Number(target.dataset.id);
            taskList.tasks = taskList.tasks.filter((task) => task.id !== taskId);
            taskList.saveTasks();
            renderTasks();
        }
    });
});

