let allTasks = [];
let allToDos = [{
    "title":"Test",
    "description":"hallo ich versuche was",
    "date":"12.12.2012",
    "category":"Developer"
}];

let assignment = '';


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
    await includeHTML();
    renderBoard();
    loadLocalStorageBoard();
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
}


function loadLocalStorage() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
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
        'assignment': assignment
    };

    assignTask(task)
}


function cancelTask(){
    document.getElementById('addNewTask').reset();
}


function assignTask(task){
    if(assignment == 'backlog'){
        allTasks.push(task);
    }
    if(assignment == 'board'){
        allToDos.push(task);
    }
    safeLocalStorage();
    assignment = '';
}


function selectUser(){

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


function renderBoard() {

    let allToDo = document.getElementById('toDo');
    allToDo.innerHTML = '';
    for (let i = 0; i < allToDos.length; i++) {
        const allToDo = allToDos[i];
        allToDo.innerHTML = renderBoarders();
    }
}


function safeLocalStorageBoard() {
    let allToDosAsString = JSON.stringify(allToDos);
    localStorage.setItem('allToDos', allToDosAsString);
}


function loadLocalStorageBoard() {
    let allToDosAsString = localStorage.getItem('allToDos');
    allToDos = JSON.parse(allToDosAsString);
}