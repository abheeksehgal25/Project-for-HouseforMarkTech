let tasks = JSON.parse(localStorage.getItem('mytasks')) || [];

function savetasks() {
    localStorage.setItem('mytasks', JSON.stringify(tasks));
}

function addtask() {
    const input = document.querySelector('.tasks input');
    const text = input.value.trim();
    if (text === '') return;

    tasks.unshift({ text: text, completed: false });
    input.value = '';
    savetasks();
    renderTasks();
}

function togglecomplete(index) {
    tasks[index].completed = !tasks[index].completed;
    savetasks();
    renderTasks();
}

function deletetask(index) {
    tasks.splice(index, 1);
    savetasks();
    renderTasks();
}

function renderTasks() {
    const list = document.querySelector('.tasklist');
    const filter = document.querySelector('.filters').value;
    list.innerHTML = '';
    let filtered = tasks;
    if (filter === 'completed') {
        filtered = tasks.filter(t => t.completed);
    } else if (filter === 'pending') {
        filtered = tasks.filter(t => !t.completed);
    }
    filtered.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="togglecomplete(${index})">
            <span>${task.text}</span>
            <button onclick="deletetask(${index})">&times;</button>
        `;
        list.appendChild(li);
    });
}
renderTasks();
