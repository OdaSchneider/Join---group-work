let currentDraggedElement;
let allTasks = [];
let allToDos = [];
let assignedUser = [];
let loggedUser = [];
let user = [];
let guest = [];

let userAccount = [
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
    },
    {
        'first name': 'admin',
        'last name': 'admin',
        'password': 'admin',
        'userImg': "./img/profile4.png"
    }
]


let guestAccount = [
    {
        'first name': 'guest',
        'last name': 'user',
        'userImg': "./img/user-guest.ico"
    }
]


async function initStart() {
    setURL('https://gruppe-287.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadUser();

    if(user.length == 0){
        setURL('https://gruppe-287.developerakademie.net/smallest_backend_ever');
        await downloadFromServer();
        await safeUserAccounts();
    }
}


async function init() {
    setURL('https://gruppe-287.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    await loadData();
    await loadUser();
    await loadLoggedUser();
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
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('allToDos', JSON.stringify(allToDos));
    await loadData();
}


async function loadData() {
    allTasks = await JSON.parse(backend.getItem('allTasks')) || [];
    allToDos = await JSON.parse(backend.getItem('allToDos')) || [];
}


async function safeUser(){
    await backend.setItem('user', JSON.stringify(user));
    await backend.setItem('guest', JSON.stringify(guest));
    await loadUser();
}


async function safeUserAccounts(){
    await backend.setItem('user', JSON.stringify(userAccount));
    await backend.setItem('guest', JSON.stringify(guestAccount));
    await loadUser();
}


async function loadUser(){
    user = await JSON.parse(backend.getItem('user')) || [];
    guest = await JSON.parse(backend.getItem('guest')) || [];
}


async function safeLoggedUser(){
    await backend.setItem('loggedUser', JSON.stringify(loggedUser));
    await loadLoggedUser();
}


async function loadLoggedUser(){
    loggedUser = await JSON.parse(backend.getItem('loggedUser')) || [];
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


async function initBoard(){
    await init();
    await includeHTML();
    renderBoard();
}


async function login() {

    loggedUser = [];
    let firstname = document.getElementById('loginInputFirstName');
    let lastname = document.getElementById('loginInputLastName');
    let password = document.getElementById('loginInputPassword').value;

    firstname = firstname.value.toLowerCase();
    lastname = lastname.value.toLowerCase();

    checkSuccessLogin(firstname, lastname, password);
}


async function checkSuccessLogin(firstname, lastname, password) {
    for (let i = 0; i < user.length; i++) {
        userFirstname = user[i]['first name'].toLowerCase();
        userLastname = user[i]['last name'].toLowerCase();

        if (userFirstname == firstname && userLastname == lastname && user[i]['password'] == password) {
            loggedUser = user[i];
            await safeLoggedUser();
            window.location = "./board.html";
            break;
        }
    }
    failLoggin();
}


function failLoggin() {
    if (loggedUser.length == 0) {
        document.getElementById('loginFailed').classList.remove('d-none');
    }
}


async function loginAsGuest() {
    loggedUser = guest[0];
    await safeLoggedUser();
    window.location = "./addTask.html";
}


async function renderNavbar() {
    await loadLoggedUser();
    document.getElementById('activeUser').innerHTML = activeUserTemplate();
}


function openResponsiveNav() {
    document.getElementById('responsiveMenu').classList.remove('d-none');
    document.getElementById('responsiveMenu').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('responsiveMenu').classList.remove('growIn');
    }, 300);

    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: closeResponsiveNav()`);
}


function closeResponsiveNav() {
    document.getElementById('responsiveMenu').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('responsiveMenu').classList.add('d-none');
        document.getElementById('responsiveMenu').classList.remove('growOut');
    }, 200);
    document.getElementById('responsiveNavButton').setAttribute('onclick', `javascript: openResponsiveNav()`);
}


