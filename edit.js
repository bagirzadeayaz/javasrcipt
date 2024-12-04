document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    if (taskId) {
        const task = taskList.tasks.find(t => t.id === parseInt(taskId, 10));
        if (task) {
            document.getElementById("taskTitle").value = task.title;
            document.getElementById("taskDescription").value = task.description;
        } 
    }

    document.getElementById("editTaskForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const newTitle = document.getElementById("taskTitle").value;
        const newDescription = document.getElementById("taskDescription").value;

        const task = taskList.tasks.find(t => t.id === parseInt(taskId, 10));
        if (task) {
            task.title = newTitle;
            task.description = newDescription;
            taskList.saveTasks();

            window.location.href = "index.html";  
        } 
    });

    document.getElementById("backButton").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});