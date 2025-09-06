const form = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');

let tasks = [];

// Load tasks from localStorage on page load
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task event
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
});

// Render tasks to DOM
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
            <label>
                <input type="checkbox" ${
                  task.completed ? 'checked' : ''
                } onchange="window.toggleComplete(${task.id})">
                <span class="${task.completed ? 'completed' : ''}">${
      task.text
    }</span>
            </label>
            <button class="delete-btn" onclick="window.deleteTask(${
              task.id
            })">Delete</button>
        `;
    taskList.appendChild(li);
  });
}

// Make toggleComplete and deleteTask global so they can be called from HTML attributes
window.toggleComplete = function (id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
};

window.deleteTask = function (id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
};

// Clear all completed tasks
clearAllBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

// Initialize
loadTasks();
