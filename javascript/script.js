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
    if(assignedUser.length == 0){
        assignedUser.push(guest[0]);
    }
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
        'id': '',
        'status': 'toDo'
    };

    assignTask(task);
}


function assignTask(task) {
    allTasks.push(task);
    for (let i = 0; i < allTasks.length; i++) {
        allTasks[i]['id'] = i;
    }
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
        let firstName = user[i]['first name'].charAt(0).toLocaleUpperCase();
        let lastName = user[i]['last name'].charAt(0).toLocaleUpperCase();
        profil.innerHTML += templateShowUser(userImg, firstName, lastName ,i);
    }
}


function selectUser(i) {
    let found = false;
    for (let k = 0; k < assignedUser.length; k++) {
        if(assignedUser[k]['first name']==user[i]['first name']&&assignedUser[k]['last name']==user[i]['last name']){
            found = true;
            break;
        }
    }
    checkIfUserExist(found, i) 
}


function checkIfUserExist(found, i){
    if(!found){
        assignedUser.push(user[i]);
    }else{
        userExist(i);
    }
    renderAssignedUser();  
}


function userExist(i){
    document.getElementById(`selectUser${i}`).style.border= "2px solid red";
    setTimeout(() => {
        document.getElementById(`selectUser${i}`).style.border= "none";
    }, 500);
}


function renderAssignedUser(){
    let assignedToCotainer = document.getElementById('assignedAccount');
    assignedToCotainer.innerHTML = '';
    for (let j = 0; j < assignedUser.length; j++) {
        assignedToCotainer.innerHTML += `<img onclick="removeUser(${j})" src=${assignedUser[j]['userImg']}>`;
    }
}


function removeUser(j) {
    assignedUser.splice(j, 1);
    renderAssignedUser()
}


function openDialogNewUser() {
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('dialogContent').innerHTML = createNewUser();
    selectImg();
}


function selectImg(){
    let container = document.getElementById('chooseImg');
    container.innerHTML = '';
    for (let i = 0; i < userAvatar.length; i++) {
        let avatar = userAvatar[i];
        container.innerHTML += `<img onclick="setAsProfilPicture(${i})" src=${avatar}}>`
    }
}


function closeDialog() {
    document.getElementById('dialog').classList.add('d-none');
    document.getElementById('dialogContent').innerHTML = '';
    showUser();
}


function addNewUser() {
    let firstName = document.getElementById('newUserFirstName').value;
    let lastName = document.getElementById('newUserLastName').value;
    checkForUser(firstName, lastName);
    document.getElementById('dialog').classList.add('d-none');
}


function checkForUser(firstName, lastName){
    let found = false;
    for (let i = 0; i < user.length; i++) {
        let checkFirstName = user[i]['first name'];
        let checkLastName = user[i]['last name'];
        if(checkFirstName==firstName&&checkLastName==lastName){
            found = true;
            break;
        }
    }
    if(!found){
        pushNewUser(firstName, lastName);
    }else{
        alert('User already exsist');
    }
}


function pushNewUser(firstName, lastName){
    let newUser = {
        'first name' : `${firstName}`,
        'last name' : `${lastName}`,
        'userImg': "./img/user-guest.ico"
    }

    user.push(newUser);
    safeLocalStorage();
    showUser();
}


function openDialogEditUser(){
    document.getElementById('dialog').classList.remove('d-none');
    let editProfil = document.getElementById('dialogContent');
    editProfil.innerHTML = `<img class="x-mark" onclick="closeDialog()" src="./img/x-mark.ico"></img>`;
    for (let i = 0; i < user.length; i++) {
        let firstName = user[i]['first name'];
        let lastName = user[i]['last name']
        let userImg = user[i]['userImg'];
        editProfil.innerHTML +=  editUser(firstName, lastName, userImg, i);
    }
}


function deleteUser(i){
    user.splice(i, 1);
    safeLocalStorage();
    openDialogEditUser();
}

// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');

    for (let i = 0; i < allTasks.length; i++) {
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];
        history.innerHTML += backlogContainer(i, category, description);

        let userContainer = document.getElementById(`backlog-user${i}`);
        userContainer.innerHTML = '';
        let selectedUser = allTasks[i]['assignedUser'];
        for (let j = 0; j < selectedUser.length; j++) {
            let userfirstname = selectedUser[j]['first name'];
            let userlastname = selectedUser[j]['last name'];
            let userimage = selectedUser[j]['userImg'];
            userContainer.innerHTML += backlogUserContainer(userfirstname, userlastname, userimage);
        }
    }
}

/**
 * sendToBoard funktion einbinden - Splice & Push ?!
 */

function sendToBoard(i) {
    let task = document.getElementById(`backlog-task${i}`);

    for (let j = 0; j < allTasks.length; j++) {
        allToDos.push(allTasks[i]);
        allTasks.splice(i, 1);
        task.classList.add('d-none');
    } 
  
    safeLocalStorage();
    renderBacklog();
}    