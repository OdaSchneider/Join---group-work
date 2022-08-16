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
        'last name': 'user',
        'userImg': "./img/user-guest.ico"
    }
]


async function initStart() {
    setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await backend.setItem('user', JSON.stringify(user));
    await backend.setItem('guest', JSON.stringify(guest));
    loadData();
}


async function init() {
    setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    loadData();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            renderNavbar();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


async function safeData() {
    await backend.setItem('user', JSON.stringify(user));
    await backend.setItem('guest', JSON.stringify(guest));
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('allToDos', JSON.stringify(allToDos));
    await backend.setItem('loggedUser', JSON.stringify(loggedUser));

    loadData();
}


function loadData() {
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allToDos = JSON.parse(backend.getItem('allToDos')) || [];
    user = JSON.parse(backend.getItem('user')) || [];
    guest = JSON.parse(backend.getItem('guest')) || [];
    loggedUser = JSON.parse(backend.getItem('loggedUser')) || [];
}


async function initBacklog() {
    await init();
    await includeHTML();
    renderBacklog();
}


async function initAddTask() {
    await init();
    await includeHTML();
    showUser();
}


function login() {
    loggedUser = [];
    let firstname = document.getElementById('loginInputFirstName');
    let lastname = document.getElementById('loginInputLastName');
    let password = document.getElementById('loginInputPassword').value;

    firstname = firstname.value.toLowerCase();
    lastname = lastname.value.toLowerCase();

    checkSuccessLogin(firstname, lastname, password);
}


function checkSuccessLogin(firstname, lastname, password) {
    for (let i = 0; i < user.length; i++) {
        userFirstname = user[i]['first name'].toLowerCase();
        userLastname = user[i]['last name'].toLowerCase();

        if (userFirstname == firstname && userLastname == lastname && user[i]['password'] == password) {
            loggedUser = user[i];
            safeData();
            window.location = "./addTask.html";
        }
    }
    failLoggin();
}


function failLoggin() {
    if (loggedUser.length == 0) {
        document.getElementById('loginFailed').classList.remove('d-none');
    }
}


function loginAsGuest() {
    loggedUser = guest[0];
    safeData();
}


function renderNavbar() {
    loadData();
    document.getElementById('activeUser').innerHTML = activeUserTemplate();
}


function openResponsiveNav() {
    document.getElementById('headerResponsive').style.height = "100%";
    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: closeResponsiveNav()`);
}


function closeResponsiveNav() {
    document.getElementById('headerResponsive').style.height = "6%";
    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: openResponsiveNav()`);
}