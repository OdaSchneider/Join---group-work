let currentDraggedElement;
let allTasks = [];
let assignedUser = [];
let allToDos = [
{
    "title": "TestTodo - Test sieht gut aus",
    "description": "hallo ich versuche was. mwmwmwmmw mmwm m mwmwmw mwmwmwm mm wm wm  mw mwmwwm  m m mw mw mw m wm mwm wwmmwmw wmmwmwmwmmw mmwmwwmwmw mwmmwmwmwmwmwmwm mwwmmwmwwmw mmwmwmwmwmwm mwmwmw",
    "date": "12.12.2012",
    "category": "Developer",
    "status": "toDo",
    "urgency": "High",
    "assignedUser":"guest",
    "id": `1`
}];


let user = [
    {
        'first name': 'Fabian',
        'last name': 'Flegler',
        'userImg': "./img/profile1.png"
    },
    {
        'first name': 'Marcel',
        'last name': 'Berlin',
        'userImg': "./img/profile2.png"
    },
    {
        'first name': 'Oda',
        'last name': 'Schneider',
        'userImg': "./img/profile3.jpg"
    }
]


let guest = [
    {
        'first name': 'guest',
        'last name': '',
        'userImg': "./img/user-guest.ico"
    }
]


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