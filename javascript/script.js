let currentDraggedElement;
let allTasks = [];
let allToDos = [];
let assignedUser = [];
let loggedUser = [];


let user = [
    {
        'first name': 'Fabian',
        'last name': 'Flegler',
        'password': 'FF',
        'userImg': "./img/profile1.png"
    },
    {
        'first name': 'Marcel',
        'last name': 'Berlin',
        'password': 'MB',
        'userImg': "./img/profile2.png"
    },
    {
        'first name': 'Oda',
        'last name': 'Schneider',
        'password': 'OS',
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

    let loggedUserAsString = JSON.stringify(loggedUser);
    localStorage.setItem('loggedUser', loggedUserAsString);

    loadLocalStorage();
}


function loadLocalStorage() {
    let allTasksAsString = localStorage.getItem('allTasks');
    let allToDosAsString = localStorage.getItem('allToDos');
    let userAsString = localStorage.getItem('user');
    let loggedUserAsString = localStorage.getItem('loggedUser');

    if (allTasksAsString && allToDosAsString && userAsString && loggedUserAsString) {
        allTasks = JSON.parse(allTasksAsString);
        allToDos = JSON.parse(allToDosAsString);
        user = JSON.parse(userAsString);
        loggedUser = JSON.parse(loggedUserAsString);
    }
}


function login() {
    loggedUser = [];
    let firstname = document.getElementById('loginInputFirstName');
    let lastname = document.getElementById('loginInputLastName');
    let password = document.getElementById('loginInputPassword').value;

    firstname = firstname.value.toLowerCase();
    lastname = lastname.value.toLowerCase();

    for (let i = 0; i < user.length; i++) {
        userFirstname = user[i]['first name'].toLowerCase();
        userLastname = user[i]['last name'].toLowerCase();

        if (userFirstname == firstname && userLastname == lastname && user[i]['password'] == password) {
            loggedUser.push(user[i]);
        }
    }
    safeLocalStorage();
}


function loginAsGuest(){
    loggedUser = guest[0];
    safeLocalStorage();
}


function renderNavbar(){
    document.getElementById('userImage').innerHTML = `<img src=${loggedUser['userImg']}>`;
}


function openResponsiveNav() {
    document.getElementById('headerResponsive').style.height = "100%";
    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: closeResponsiveNav()`);
}


function closeResponsiveNav() {
    document.getElementById('headerResponsive').style.height = "5%";
    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: openResponsiveNav()`);
}