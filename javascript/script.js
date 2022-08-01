let allTasks = [];
let allToDos = [{
    "title": "Test",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "id": "toDo"
},
{
    "title": "Test",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "id": "inProgress"
}];

let assignment = '';
let assignedUser = [];

loadLocalStorage();

async function init() {
    await includeHTML();
    setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
}

async function initBacklog() {
    await init();
    renderBacklog();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function safeLocalStorage() {
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);

    let allToDosAsString = JSON.stringify(allToDos);
    localStorage.setItem('allToDos', allToDosAsString);
}


function loadLocalStorage() {
    let allTasksAsString = localStorage.getItem('allTasks');
    let allToDosAsString = localStorage.getItem('allToDos');

    if (allTasksAsString && allToDosAsString) {
        allTasks = JSON.parse(allTasksAsString);
        allToDos = JSON.parse(allToDosAsString);
    }
}


// ---------------------------Add Task---------------------------------------------------------

function sendToBacklog() {
    document.getElementById('sendBacklog').style.backgroundColor = "#2e46cf";
    document.getElementById('sendBoard').style.backgroundColor = "white";
    assignment = document.getElementById('sendBacklog').value;
}


function sendToBoard() {
    document.getElementById('sendBoard').style.backgroundColor = "#2e46cf";
    document.getElementById('sendBacklog').style.backgroundColor = "white";
    assignment = document.getElementById('sendBoard').value;
}


function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let urgency = document.getElementById('urgency').value;
    let description = document.getElementById('description').value;

    taskArray(title, date, category, urgency, description);
}


function taskArray(title, date, category, urgency, description) {
    let task = {
        'title': title,
        'dueDate': date,
        'category': category,
        'urgency': urgency,
        'description': description,
        'createdAt': new Date().getTime(),
        'assignment': assignment,
        'assignedUser': assignedUser,
        'id': 'todo'
    };

    assignTask(task)
}


function assignTask(task) {
    if (assignment == 'backlog') {
        allTasks.push(task);
    }
    if (assignment == 'board') {
        allToDos.push(task);
    }
    safeLocalStorage();
    assignment = '';
}


function cancelTask() {
    document.getElementById('addNewTask').reset();
}


function showUser() {
    let profil = document.getElementById('user');
    profil.innerHTML = '';

    for (let i = 0; i < user.length; i++) {
        let userImg = user[i]['userImg'];
        profil.innerHTML += `<img id="disable${i}" onclick="selectUser(${i})" src=${userImg}>`;
    }
}


function selectUser(i) {
    assignedUser = user[i];

    let assignedToCotainer = document.getElementById('assignedAccount');
    assignedToCotainer.innerHTML = `<img id="assigned" onclick="removeUser()" src=${assignedUser['userImg']}>`;
}


function removeUser() {
    document.getElementById('assignedAccount').innerHTML = '';
    assignedUser = '';
}


// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');

    for (let i = 0; i < allTasks.length; i++) {
        let username = allTasks[i]['assignedUser']['name'];
        let userimage = allTasks[i]['assignedUser']['userImg'];
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];

        history.innerHTML += backlogContainer(userimage, username, category, description);
    }
}