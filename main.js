const newTask = document.getElementById('user-input');
const form = document.getElementById('main-form');
const taskList = document.getElementById('task-list');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function showTasks(){
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        li.innerHTML = `
            <label>
                <input type="checkbox" onchange="isCompleted(${task.id})" ${task.completed && 'checked'} id="task-${task.id}">
                    ${task.text}
            </label>
            <button type="button" class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        li.className = task.completed ? 'completed' : "";
        taskList.appendChild(li);
    }
    resetColor(tasks);
}

function addTaskToStorage(e) {
    e.preventDefault();
    const task = {
        id: Date.now(),
        text: newTask.value,
        completed: false
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    newTask.value = "";
    showTasks();
}

function isCompleted(id) { 
    for (let i = 0; i < tasks.length; i++) {
        tasks[id];
        const currentTask = tasks[i];
        if (currentTask.id === id) {
            currentTask.completed = !currentTask.completed;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}

function deleteTask(id){
    tasks[id];
    const taskIndex = tasks.findIndex(function (task){
        return task.id === id;
    })
    if (taskIndex !== -1 && tasks[taskIndex].completed){
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        alert('task didnt complete');
    }
    showTasks();
}
showTasks();
form.addEventListener("submit", addTaskToStorage);


function resetList(){
    localStorage.clear();
    window.location.reload();
    showTasks();
}

function darkMode(){
    let flag = document.getElementById("dark-mode").value;
    let input = document.getElementById("user-input");
    if (flag==='off') {
        document.getElementById("dark-mode").value = 'on';
        document.body.setAttribute('class', 'dark'); 
       input.setAttribute('class', 'dark'); 
    } else if (flag==='on') {
        document.getElementById("dark-mode").value = 'off';
        document.body.setAttribute('class', "body"); 
        input.setAttribute('class', ''); 
    }
}
function resetColor(array) {
    let resetButton = document.getElementById('resetbtn');
    if (array.length > 0) {
        resetButton.setAttribute('class', 'yes-task')
    } else if (array.length === 0){
        resetButton.setAttribute('class', 'no-task');

    }
}
resetColor(tasks);