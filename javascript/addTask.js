// ---------------------------Add Task---------------------------------------------------------
function checkValidation(){
    if (assignedUser.length == 0) {
        document.getElementById('alertNoUser').innerHTML = 'Please assigne User';
    }else{
        validInput();
    }
}


async function validInput(){
    await addTask();
    window.location = "./backlog.html";
}


async function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let urgency = document.getElementById('urgency').value;
    let description = document.getElementById('description').value;
    taskArray(title, date, category, urgency, description);
    await safeData();
}


function taskArray(title, date, category, urgency, description) {
    let task = {
        'title': title,
        'dueDate': date,
        'category': category,
        'urgency': urgency,
        'description': description,
        'createdAt': new Date().toLocaleDateString(),
        'assignedUser': assignedUser,
        'id': '',
        'status': 'toDo',
        'comments': []
    };

    assignTask(task);
}


async function assignTask(task) {
    allTasks.push(task);
    assignedUser = [];
    await safeData();
}


function cancelTask() {
    document.getElementById('addNewTask').reset();
    document.getElementById('alertNoUser').innerHTML = '';
}


async function showUser() {
    let profil = document.getElementById('user');
    profil.innerHTML = '';

    for (let j = 0; j < user.length; j++) {
        let userImg = user[j]['userImg'];
        let firstName = user[j]['first name'].charAt(0).toLocaleUpperCase();
        let lastName = user[j]['last name'].charAt(0).toLocaleUpperCase();
        profil.innerHTML += templateShowUser(userImg, firstName, lastName, j);
    }
}


function selectUser(j) {
    document.getElementById(`selectUser${j}`).style.backgroundColor = ('rgb(34, 98, 215)');
    document.getElementById(`selectUser${j}`).setAttribute('onclick', `javascript: unselectUser(${j})`);
    assignedUser.push(user[j]);
}


function unselectUser(j) {
    document.getElementById(`selectUser${j}`).style.backgroundColor = ('lightgray');
    document.getElementById(`selectUser${j}`).setAttribute('onclick', `javascript: selectUser(${j})`);
    for (let k = 0; k < assignedUser.length; k++) {
        if (user[j] == assignedUser[k]) {
            assignedUser.splice(k, 1);
        }
    }
}


function renderAssignedUser() {
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
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    document.getElementById('dialogBg').classList.remove('d-none');
    document.getElementById('editUserContent').classList.add('d-none');
    document.getElementById('newUserContent').innerHTML = createNewUser();
}


function closeDialogNewUser() {
    document.body.style.overflow = 'auto';
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('editUserContent').classList.remove('d-none');
    document.getElementById('newUserContent').innerHTML = '';
    showUser();
}


function addNewUser() {
    let firstName = document.getElementById('newUserFirstName').value;
    let lastName = document.getElementById('newUserLastName').value;
    checkForUser(firstName, lastName);

    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('editUserContent').classList.remove('d-none');
}


function checkForUser(firstName, lastName) {
    let found = false;
    for (let i = 0; i < user.length; i++) {
        let checkFirstName = user[i]['first name'];
        let checkLastName = user[i]['last name'];
        if (checkFirstName == firstName && checkLastName == lastName) {
            found = true;
            break;
        }
    }
    reactIfUserFound(found, firstName, lastName);
}


function reactIfUserFound(found, firstName, lastName) {
    if (!found) {
        pushNewUser(firstName, lastName);
    } else {
        alert('User already exsist');
    }
}


async function pushNewUser(firstName, lastName) {
    let newUser = {
        'first name': `${firstName}`,
        'last name': `${lastName}`,
        'userImg': "./img/user-guest.ico"
    }
    user.push(newUser);
    await safeUser();
    showUser();
}


function openDialogEditUser() {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    document.getElementById('dialogBg').classList.remove('d-none');
    document.getElementById('newUserContent').classList.add('d-none');
    renderEditUser();
}


function renderEditUser() {
    let editProfil = document.getElementById('editUserContent');
    editProfil.innerHTML = `<img class="x-mark" onclick="closeDialogEditUser()" src="./img/x-mark.ico"></img>`;
    for (let i = 0; i < user.length; i++) {
        let firstName = user[i]['first name'];
        let lastName = user[i]['last name']
        let userImg = user[i]['userImg'];
        editProfil.innerHTML += editUser(firstName, lastName, userImg, i);
    }
}


async function deleteUser(i) {
    user.splice(i, 1);
    await safeUser();
    openDialogEditUser();
}


function closeDialogEditUser() {
    document.body.style.overflow = 'auto';
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('newUserContent').classList.remove('d-none');
    document.getElementById('editUserContent').innerHTML = '';
    showUser();
}