let allTasks = [];
let currentDraggedElement;
let allToDos = [{
    "title": "Test",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "boarderCategory": "toDo"
},
{
    "title": "Test",
    "description": "hallo ich versuche was",
    "date": "12.12.2012",
    "category": "Developer",
    "boarderCategory": "inProgress"
}];

let assignment = '';
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

async function initBoard() {
    await init();
    renderBoard();
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

    loadLocalStorage();
}


function loadLocalStorage() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);

    let allToDosAsString = localStorage.getItem('allToDos');
    allToDos = JSON.parse(allToDosAsString);
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
        'assignedUser': assignedUser
    };

    assignTask(task)
}


function assignTask(task) {
    if (assignment == 'backlog') {
        allTasks.push(task);
    }
    if (assignment == 'board') {
        allToDos.push(task);
    } else {
        allTasks.push(task);
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
        let username = user[i]['name'];
        let userimage = user[i]['userImg'];
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];

        history.innerHTML += backlogContainer(userimage, username, category, description);
    }
}





// ---------------------------Bord--------------------------------------------------------

/* - TODOS - 
- renderBoarder optimieren / Fehler beheben.
- Drag and Drop hinzufügen
*/

function renderBoard() {

    let allToDo = document.getElementById('toDo');
    allToDo.innerHTML = '';
    for (let i = 0; i < allToDos.length; i++) {
        allToDo.innerHTML += renderBoardersInit();
    }
}


function renderBoardersInit() {
    renderToDo();
    renderInProgress();
    renderTesting();
    renderDone();
    allToDos.sort((a, b) => (a.id > b.id ? 1 : -1));
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


function removeHighlight() {
    document.getElementById(id).classList.remove('dragAreaHighlight');

}


function moveTo(status) {
    tasks.find(task => task.id == currentDraggedElement).status = status;
    renderBoardersInit();
}


function renderToDo() {
    let td = document.getElementById('toDo');

    td.innerHTML = ``;
    allToDos.filter(task => task.status == "toDo").forEach(toDos => {
        td.innerHTML += renderToDoHTML(toDos);
        let id = toDos.id;
        toDos.user.forEach(e => {
            document.getElementById(`toDo${id}`).innerHTML += renderBoardersToDos(toDos);
        })
    })
}


function renderInProgress() {
    let ip = document.getElementById('inProgress');

    ip.innerHTML = ``;
    allToDos.filter(task => task.status == "inProgress").forEach(inProgress => {
        ip.innerHTML += renderInProgressHTML(inProgress);
        inProgress.user.forEach(e => {
            document.getElementById(`inProgress${inProgress.id}`).innerHTML += renderBoardersInProgress(inProgress);
        })
    })
}


function renderTesting() {
    let t = document.getElementById('testing');

    t.innerHTML = ``;
    allToDos.filter(task => task.status == "testing").forEach(testing => {
        t.innerHTML += renderTestingHTML(testing);
        testing.user.forEach(e => {
            document.getElementById(`testing${testing.id}`).innerHTML += renderBoardersTesting(testing);
        })
    })
}


function renderDone() {
    let d = document.getElementById('done');

    d.innerHTML = ``;
    allToDos.filter(task => task.status == "done").forEach(done => {
        d.innerHTML += renderDoneHTML(done);
        done.user.forEach(e => {
            document.getElementById(`done${done.id}`).innerHTML += renderBoardersDone(done);
        })
    })
}