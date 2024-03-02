document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-btn');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load saved tasks
    loadTasks();

    addButton.addEventListener('click', () => {
        const taskText = inputField.value.trim();
        if (taskText) {
            addTask(taskText);
            inputField.value = ''; // Clear input field
            saveTasks();
        }
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
            saveTasks();
        } else if (event.target.tagName === 'BUTTON') {
            event.target.parentElement.remove();
            saveTasks();
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#todo-list li').forEach(task => {
            tasks.push({ text: task.textContent.replace('Delete', ''), completed: task.classList.contains('completed') });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            savedTasks.forEach(task => {
                addTask(task.text);
                if (task.completed) {
                    todoList.lastElementChild.classList.add('completed');
                }
            });
        }
    }
});
