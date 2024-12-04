document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');

    if (taskId) {
        const task = taskList.getTasks().find(t => t.id === parseInt(taskId, 10));
        if (task) {
            document.getElementById("taskId").textContent = taskId;
            document.getElementById("taskTitle").textContent = task.title;
            document.getElementById("taskDescription").textContent = task.description;
            document.getElementById("taskStatus").textContent = task.isCompleted ? "Completed" : "Not Completed";
            document.getElementById("taskCreatedAt").textContent = task.createdAt;
        }
    }

        document.getElementById("backButton").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});