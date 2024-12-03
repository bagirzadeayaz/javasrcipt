class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

const taskList = new TaskList();

class Task {
    constructor(title, description) {
        if (!title || !title.trim()) alert("Name can not be empty!");
        if (!description || !description.trim()) alert("Description can not be empty!");

        this.id = Date.now();
        this.title = title;
        this.description = description; 
        this.createdAt = new Date().toLocaleString('ru'); 
        this.isCompleted = false; 
    }


    toggleComplete() {
        this.isCompleted = !this.isCompleted; 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addTaskForm");

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
    });
});