let allTasks = [];
let allToDos = [{
    "title": "TestTodo",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "id": "toDo"
},
{
    "title": "TestInProgress",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "id": "inProgress"
},
{
    "title": "TestTesting",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "id": "testing"
},
{
    "title": "TestDone",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "id": "done"
}];

let assignedUser = [];


async function init() {
    await includeHTML();
    setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
    loadLocalStorage();
}

async function initBacklog() {
    await init();
    renderBacklog();
}

async function initAddTask() {
    await init();
    showUser();
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

    let userAsString = JSON.stringify(user);
    localStorage.setItem('user', userAsString);

    loadLocalStorage();
}


function loadLocalStorage() {
    let allTasksAsString = localStorage.getItem('allTasks');
    let allToDosAsString = localStorage.getItem('allToDos');
    let userAsString = localStorage.getItem('user');

    if (allTasksAsString && allToDosAsString && userAsString) {
        allTasks = JSON.parse(allTasksAsString);
        allToDos = JSON.parse(allToDosAsString);
        user = JSON.parse(userAsString);
    }
}


// ---------------------------Add Task---------------------------------------------------------

function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let urgency = document.getElementById('urgency').value;
    let description = document.getElementById('description').value;
    taskArray(title, date, category, urgency, description);
    safeLocalStorage();
}


function taskArray(title, date, category, urgency, description) {
    let task = {
        'title': title,
        'dueDate': date,
        'category': category,
        'urgency': urgency,
        'description': description,
        'createdAt': new Date().getTime(),
        'assignedUser': assignedUser,
        'id': 'todo'
    };

    assignTask(task);
}


function assignTask(task) {
    allTasks.push(task);
    safeLocalStorage();
}


function cancelTask() {
    document.getElementById('addNewTask').reset();
}


function showUser() {
    let profil = document.getElementById('user');
    profil.innerHTML = '';

    for (let i = 0; i < user.length; i++) {
        let userImg = user[i]['userImg'];
        profil.innerHTML += `<img onclick="selectUser(${i})" src=${userImg}>`;
    }
}


function selectUser(i) {
    assignedUser = user[i];

    let assignedToCotainer = document.getElementById('assignedAccount');
    assignedToCotainer.innerHTML = `<img onclick="removeUser()" src=${assignedUser['userImg']}>`;
}


function removeUser() {
    document.getElementById('assignedAccount').innerHTML = '';
}


function openDialogNewUser() {
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('dialogContent').innerHTML = createNewUser();
}


function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
}


function addNewUser() {
    let firstName = document.getElementById('newUserFirstName').value;
    let lastName = document.getElementById('newUserLastName').value;
    pushNewUser(firstName, lastName);
    document.getElementById('dialog').classList.add('d-none');
}


function pushNewUser(firstName, lastName) {
    let newUser = {
        'name': `${firstName} ${lastName}`,
        'userImg': "./img/user-guest.ico"
    }

    user.push(newUser);
    safeLocalStorage();
    showUser();
}



// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');

    for (let i = 0; i < allTasks.length; i++) {
        let username = allTasks[i]['assignedUser']['name'];
        let userimage = allTasks[i]['assignedUser']['userImg'];
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];

        history.innerHTML += backlogContainer(i, userimage, username, category, description);
    }
}

/**
 * sendToBoard funktion einbinden - Splice & Push ?!
 */

function sendToBoard(i) {
    let task = document.getElementById(`backlog-task${i}`);

    for (let j = 0; j < allTasks.length; j++) {
        allTasks.splice(i, 1);
        task.classList.add('d-none');
        // allToDos.push(task);
    } 
  
    safeLocalStorage();
    renderBacklog();
}    