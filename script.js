const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

const totalTask = document.getElementById("total-task");
const completedTask = document.getElementById("completed-task");
const pendingTask = document.getElementById("pending-task");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";

    renderTasks();
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const card = document.createElement("div");

        card.className = task.completed ? "task completed" : "task";

        card.innerHTML = `
            <div class="task-info">

                <h3>${task.text}</h3>

                <p>📅 ${task.date || "No Date"}</p>

                <p>⏰ ${task.time || "No Time"}</p>

            </div>

            <div class="actions">

                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit-btn" onclick="editTask(${task.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(card);

    });

    updateStats();
}

function toggleComplete(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();

    renderTasks();
}

function deleteTask(id) {

    if (!confirm("Delete this task?")) {
        return;
    }

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const newText = prompt("Edit Task", task.text);

    if (newText === null) return;

    if (newText.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    task.text = newText.trim();

    saveTasks();

    renderTasks();
}

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    totalTask.textContent = total;
    completedTask.textContent = completed;
    pendingTask.textContent = pending;

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}