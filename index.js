class TaskList {
    constructor() {
        this.tasks = this.loadTasks();
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); 
    }

    loadTasks() {
        const tasksJson = localStorage.getItem("tasks");
        return tasksJson ? JSON.parse(tasksJson) : [];
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
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addTaskForm");
    const taskListElement = document.getElementById("taskList");

    const renderTasks = () => {
        taskListElement.innerHTML = "";
        taskList.tasks.forEach((task) => {
            const taskItem = document.createElement("li");
            taskItem.className = `task-item ${task.isCompleted ? "completed" : ""}`;

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

        applyFilter();
    };

    const applyFilter = () => {
        const filterValue = filterOptions.value;
        const tasks = document.querySelectorAll("#taskList li");

        tasks.forEach((task) => {
            const isCompleted = task.classList.contains("completed");

            switch (filterValue) {
                case "all":
                    task.style.display = "";
                    break;
                case "completed":
                    task.style.display = isCompleted ? "" : "none";
                    break;
                case "incomplete":
                    task.style.display = isCompleted ? "none" : "";
                    break;
            }
        });
    };

    const sortTasks = (sortValue) => {
        switch (sortValue) {
            case "date":
                taskList.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "name":
                taskList.tasks.sort((a, b) => a.title.localeCompare(b.title)); 
                break;
            case "not-sorted":
                taskList.tasks = taskList.loadTasks();
                break;
        }
        renderTasks(); 
    };

    renderTasks();

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const title = document.getElementById("taskTitle").value;
        const description = document.getElementById("taskDescription").value;

        const titleWords = title.split(' ').filter(word => word.length > 0); 

        if (titleWords.length < 2) {
            alert("Title must contain at least two words!");
            return;
        }

        for (const word of titleWords) {
            if (word.length > 16) {
                alert("The maximum length of a word is 16 letters!");
                return;
            }
        }   

        if (!title || !title.trim()) {
            alert("Name can not be empty!");
            return; 
        }

        if (title !== title.trim()) {
            alert("Title should not have whitespace at the beginning or the end!");
            return;
        }

        if (/ {2,}/.test(title)) {
            alert("There should be only one space between words in the title!");
            return;
        }

        for (const word of titleWords) {
            if (!/^[a-zA-Z]+$/.test(word) && !/^[а-яА-Я]+$/.test(word) && !/^\d+$/.test(word)) {
                alert("Each word must consist of either only English letters, only Russian letters, or only digits!");
                return;
            }
        }

        if (titleWords.every(word => !isNaN(word))) {
            alert("Title cannot consist only of numbers!");
            return;
        }

        const descriptionWords = description.split(' ').filter(word => word.length > 0); 


        if (!description || !description.trim()) {
            alert("Description can not be empty!");
            return; 
        }

        for (const word of descriptionWords) {
            if (!/^[a-zA-Z]+$/.test(word) && !/^[а-яА-Я]+$/.test(word) && !/^\d+$/.test(word)) {
                alert("Each word must consist of either only English letters, only Russian letters, or only digits!");
                return;
            }
        }

        for (const word of descriptionWords) {
            if (word.length > 16) {
                alert("The maximum length of a word is 16 letters!");
                return;
            }
        } 
        
        if (description.trim() === title.trim()) {
            alert("Description cannot be the same as the title!");
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
    filterOptions.addEventListener("change", applyFilter);

    sortOptions.addEventListener("change", function() {
        const sortValue = this.value;
        sortTasks(sortValue);
    });
});

