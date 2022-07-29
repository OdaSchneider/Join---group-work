let allTasks = [];
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

function sendToBacklog(){
    document.getElementById('sendBacklog').style.backgroundColor = "#2e46cf";
    document.getElementById('sendBoard').style.backgroundColor = "white";
    assignment = document.getElementById('sendBacklog').value;
}


function sendToBoard(){
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
        'assignedUser' : assignedUser
    };

    assignTask(task)
}


function assignTask(task){
    if(assignment == 'backlog'){
        allTasks.push(task);
    }
    if(assignment == 'board'){
        allToDos.push(task);
    }else{
        allTasks.push(task);
        allToDos.push(task);
    }
    safeLocalStorage();
    assignment = '';
}


function cancelTask(){
    document.getElementById('addNewTask').reset();
}


function showUser(){
    let profil = document. getElementById('user');
    profil.innerHTML = '';

    for (let i = 0; i < user.length; i++) {
        let userImg = user[i]['userImg'];
        profil.innerHTML += `<img id="disable${i}" onclick="selectUser(${i})" src=${userImg}>`;
    }
}


function selectUser(i){
    assignedUser = user[i];

    let assignedToCotainer = document.getElementById('assignedAccount');
    assignedToCotainer.innerHTML = `<img id="assigned" onclick="removeUser()" src=${assignedUser['userImg']}>`;
}


function removeUser(){
    document.getElementById('assignedAccount').innerHTML = '';
    assignedUser = '';
}


// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');

    for (let i = 0; i < allTasks.length; i++) {
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];

        history.innerHTML += /*html*/ `
        <div class="backlog-container">
            <div>${category}</div>
            <div>${description}</div>  
        </div>            
        `;
    }
}





// ---------------------------Bord--------------------------------------------------------

/* - TODOS - 
- renderBoarder optimieren/ Fehler beheben.
- Drad and Drop hinzufügen
- boarderCategory hinzufügen ( toDo - inProgress - testing - done)
*/

function renderBoard() {

    let allToDo = document.getElementById('toDo');
    allToDo.innerHTML = '';
    for (let i = 0; i < allToDos.length; i++) {
        allToDo.innerHTML += renderBoarders(i);
    }
}


// function updateBoarder() {

//     filterTodos(toDo);
//     filterInProgress(inProgress);
//     filterTesting(testing);
//     filterDone(done);
// }

// function filterTodos(toDo) {
//     let toDo = allToDos.filter(t => t['boarderCategory'] == 'todo');

//     document.getElementById('toDo').innerHTML = '';

//     for (let i = 0; i < toDo.length; i++) {
//         const element1 = toDo[i];
//         document.getElementById('toDo').innerHTML += renderBoarders(element1); 
//     }
// }

// function filterInProgress(inProgress) {
//     let inProgress = allToDos.filter(t => t['boarderCategory'] == 'inProgress');

//     document.getElementById('inProgress').innerHTML = '';

//     for (let i = 0; i < inProgress.length; i++) {
//         const element2 = inProgress[i];
//         document.getElementById('toDo').innerHTML += renderBoarders(element2); 
//     }
// }

// function filterTesting(testing) {
//     let testing = allToDos.filter(t => t['boarderCategory'] == 'testing');

//     document.getElementById('testing').innerHTML = '';

//     for (let i = 0; i < testing.length; i++) {
//         const element3 = testing[i];
//         document.getElementById('toDo').innerHTML += renderBoarders(element3); 
//     }
// }

// function filterDone(done) {
//     let done = allToDos.filter(t => t['boarderCategory'] == 'done');

//     document.getElementById('done').innerHTML = '';

//     for (let i = 0; i < done.length; i++) {
//         const element4 = done[i];
//         document.getElementById('toDo').innerHTML += renderBoarders(element4); 
//     }
// }



