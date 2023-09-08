document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const endTimeInput = document.getElementById("endTime");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Function to create a new task item
    function createTaskItem(taskText, endTime, completed) {
        const taskItem = document.createElement("li");
        if (completed) {
            taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <span>End Time: ${endTime}</span>
            <button class="edit-button">Edit</button>
            <button class="complete-button">Complete</button>
            <button class="delete-button">Delete</button>
        `;
        return taskItem;
    }

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll("li");
        taskItems.forEach((taskItem) => {
            const taskText = taskItem.querySelector("span:first-child").textContent;
            const endTime = taskItem.querySelector("span:nth-child(2)").textContent.replace("End Time: ", "");
            const completed = taskItem.classList.contains("completed");
            tasks.push({ taskText, endTime, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            const taskItem = createTaskItem(task.taskText, task.endTime, task.completed);
            taskList.appendChild(taskItem);
        });
    }

    // Load tasks from local storage when the page loads
    loadTasksFromLocalStorage();

    // Function to handle the "Add" button click
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const endTime = endTimeInput.value.trim();

        if (taskText !== "" && endTime !== "") {
            const taskItem = createTaskItem(taskText, endTime, false);
            taskList.appendChild(taskItem);
            taskInput.value = "";
            endTimeInput.value = "";
            saveTasksToLocalStorage(); // Save the updated list to local storage
        } else {
            alert("Both task name and end time are required.");
        }
    });

    // Function to handle task completion
    taskList.addEventListener("click", function (e) {
        const target = e.target;
        if (target.classList.contains("complete-button")) {
            const taskItem = target.parentElement;
            taskItem.classList.toggle("completed");
            saveTasksToLocalStorage(); // Save the updated list to local storage
        } else if (target.classList.contains("delete-button")) {
            const taskItem = target.parentElement;
            taskItem.remove();
            saveTasksToLocalStorage(); // Save the updated list to local storage
        } else if (target.classList.contains("edit-button")) {
            const taskItem = target.parentElement;
            const taskTextSpan = taskItem.querySelector("span:first-child");
            const endTimeSpan = taskItem.querySelector("span:nth-child(2)");

            const updatedTaskText = prompt("Edit task:", taskTextSpan.textContent);
            const updatedEndTime = prompt("Edit end time:", endTimeSpan.textContent.replace("End Time: ", ""));

            if (updatedTaskText !== null && updatedEndTime !== null) {
                taskTextSpan.textContent = updatedTaskText;
                endTimeSpan.textContent = `End Time: ${updatedEndTime}`;
                saveTasksToLocalStorage(); // Save the updated list to local storage
            }
        }
    });
});
