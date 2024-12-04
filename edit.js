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

        const titleWords = newTitle.split(' ').filter(word => word.length > 0); 

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

        if (!newTitle || !newTitle.trim()) {
            alert("Name can not be empty!");
            return; 
        }

        if (newTitle !== newTitle.trim()) {
            alert("Title should not have whitespace at the beginning or the end!");
            return;
        }

        if (/ {2,}/.test(newTitle)) {
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

        const descriptionWords = newDescription.split(' ').filter(word => word.length > 0); 


        if (!newDescription || !newDescription.trim()) {
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
        
        if (newDescription.trim() === newTitle.trim()) {
            alert("Description cannot be the same as the title!");
            return;
        }

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