// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');
    history.innerHTML = '';
    emptyBacklog();
    let start = allTasks.length - 1;
    for (let i = start; i > -1; i--) {
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];
        createdAt = allTasks[i]['createdAt'];
        title = allTasks[i]['title'];
        history.innerHTML += backlogContainer(i, createdAt, category, title);
        renderUser(i);
    }
}

function emptyBacklog() {
    let empty = document.getElementById('emptybacklog');
    if (allTasks.length == 0) {
        empty.classList.remove('d-none');
    }
}


function renderUser(i) {
    let userContainer = document.getElementById(`backlog-user${i}`);
    userContainer.innerHTML = '';

    let selectedUser = allTasks[i]['assignedUser'];
    for (let j = 0; j < selectedUser.length; j++) {
        let userfirstname = selectedUser[j]['first name'].charAt(0).toLocaleUpperCase();
        let userlastname = selectedUser[j]['last name'].charAt(0).toLocaleUpperCase();
        let userimage = selectedUser[j]['userImg'];
        userContainer.innerHTML += backlogUserContainer(userfirstname, userlastname, userimage);
    }
    setUrgency(i);
}


function setUrgency(i) {
    urgencyColor = allTasks[i]['urgency'];
    document.getElementById(`setUrgency${i}`).classList.add(`border_${urgencyColor}`);
}


function backlogShowDetails(i) {
    document.body.style.overflow = 'hidden';
    document.getElementById(`backlogDetailsBg`).classList.remove('d-none');
    document.getElementById('backlogDetailsBg').classList.add('scaleIn');
    setTimeout(() => {
        document.getElementById('backlogDetailsBg').classList.remove('scaleIn');
    }, 300);

    let showDetails = document.getElementById('details');
    showDetails.innerHTML = backlogDetailsTemplate(i);
    fillDetails(i);
}

function closeEdit() {
    document.body.style.overflow = 'auto';
    document.getElementById('backlogDetailsBg').classList.add('scaleOut');
    setTimeout(() => {
        document.getElementById('backlogDetailsBg').classList.add('d-none');
        document.getElementById('backlogDetailsBg').classList.remove('scaleOut');
    }, 200);
}


function fillDetails(i) {
    document.getElementById('editTitle' + i).value = allTasks[i]['title'];
    document.getElementById('editDescription' + i).value = allTasks[i]['description'];
    document.getElementById('editDate' + i).value = allTasks[i]['dueDate'];
    document.getElementById('editCategory' + i).value = allTasks[i]['category'];
    document.getElementById('editUrgency' + i).value = allTasks[i]['urgency'];
    fillAssignedUser(i);
    fillAllUser(i);
    enableEdit(i);
}


function fillAllUser(i) {
    let profil = document.getElementById('edituser' + i);
    profil.innerHTML = '';

    for (let j = 0; j < user.length; j++) {
        let userImg = user[j]['userImg'];
        profil.innerHTML += templateShowUserBacklog(userImg, j, i);
    }
}


function fillAssignedUser(i) {
    let loadAssignedUser = allTasks[i]['assignedUser'];
    let editAssignedUser = document.getElementById('editAssignedAccount' + i);
    editAssignedUser.innerHTML = '';
    for (let j = 0; j < loadAssignedUser.length; j++) {
        editAssignedUser.innerHTML += `<img id="assignedUser${i}${j}" onclick="removeUserBacklog(${j},${i})" src=${loadAssignedUser[j]['userImg']}>`;
    }
}


async function removeUserBacklog(j, i) {
    allTasks[i]['assignedUser'].splice(j, 1);
    await safeData();
    fillAssignedUser(i);
}


function assigneUserBacklog(j, i) {
    let found = false;
    let assigneUser = allTasks[i]['assignedUser'];
    for (let k = 0; k < assigneUser.length; k++) {
        if (assigneUser[k]['first name'] == user[j]['first name'] && assigneUser[k]['last name'] == user[j]['last name']) {
            found = true;
            break;
        }
    }
    checkIfUserExistBacklog(found, assigneUser, j, i);
}


function checkIfUserExistBacklog(found, assigneUser, j, i) {
    if (!found) {
        assigneUser.push(user[j]);
    } else {
        userExist(j);
    }
    fillAssignedUser(i);
}


function userExist(j) {
    document.getElementById(`selectUser${j}`).style.border = '2px solid red';
    setTimeout(() => {
        document.getElementById(`selectUser${j}`).style.border = '2px solid lightgray';
    }, 300);
}


function checkForRightToEdit(i) {
    let contributers = allTasks[i]['assignedUser']
    for (let j = 0; j < contributers.length; j++) {
        let firstname = contributers[j]['first name'];
        let lastname = contributers[j]['last name'];

        if (loggedUser['first name'] != firstname || loggedUser['last name'] != lastname) {
            disableEdit(i);
        } else {
            enableEdit(i);
            break;
        }
    }
}


function doNotClose(event) {
    event.stopPropagation();
}


function disableEdit(i) {
    disableInputfield(i);
    disableEditButton(i);
    disableAssignedUser(i);
    document.getElementById('addUserInEdit').classList.add('d-none');
    document.getElementById('alert').innerHTML = 'Note: Only assigned User can edit Tasks';
}


function disableInputfield(i) {
    document.getElementById('editTitle' + i).disabled = true;
    document.getElementById('editDescription' + i).disabled = true;
    document.getElementById('editDate' + i).disabled = true;
    document.getElementById('editCategory' + i).disabled = true;
    document.getElementById('editUrgency' + i).disabled = true;
}


function disableEditButton(i) {
    document.getElementById('editTaskButton' + i).disabled = true;
    document.getElementById('editTaskButton' + i).classList.add('disable');
    document.getElementById('editTaskButton' + i).style.opacity = '0.4';
}


function disableAssignedUser(i) {
    let loadAssignedUser = allTasks[i]['assignedUser'];
    for (let j = 0; j < loadAssignedUser.length; j++) {
        document.getElementById(`assignedUser${i}${j}`).onclick = null;
    }
}


function enableEdit(i) {
    enableInputfield(i);
    enableEditButton(i);
    enableAssignedUser(i);
    document.getElementById('addUserInEdit').classList.remove('d-none');
    document.getElementById('alert').innerHTML = '';
}


function enableInputfield(i) {
    document.getElementById('editTitle' + i).disabled = false;
    document.getElementById('editDescription' + i).disabled = false;
    document.getElementById('editDate' + i).disabled = false;
    document.getElementById('editCategory' + i).disabled = false;
    document.getElementById('editUrgency' + i).disabled = false;
}


function enableEditButton(i) {
    document.getElementById('editTaskButton' + i).disabled = false;
    document.getElementById('editTaskButton' + i).classList.remove('disable');
    document.getElementById('editTaskButton' + i).style.opacity = '1';
}


function enableAssignedUser(i) {
    let loadAssignedUser = allTasks[i]['assignedUser'];
    for (let j = 0; j < loadAssignedUser.length; j++) {
        document.getElementById(`assignedUser${i}${j}`).setAttribute('onclick', `javascript: removeUserBacklog(${j}, ${i})`);
    }
}


async function checkValidationBacklog(i) {
    if (allTasks[i]['assignedUser'].length == 0) {
        document.getElementById('alert').innerHTML = 'Please assigne at least one user';
    } else {
        await editTask(i);
        window.location = "./backlog.html";
    }
}


async function editTask(i) {
    allTasks[i]['title'] = document.getElementById('editTitle' + i).value;
    allTasks[i]['description'] = document.getElementById('editDescription' + i).value;
    allTasks[i]['dueDate'] = document.getElementById('editDate' + i).value;
    allTasks[i]['category'] = document.getElementById('editCategory' + i).value;
    allTasks[i]['urgency'] = document.getElementById('editUrgency' + i).value;
    allTasks[i]['createdAt'] = new Date().toLocaleDateString();
    await safeData();
    renderBacklog();
}


async function sendToBoard(i) {
    let task = document.getElementById(`backlog-task${i}`);

    allToDos.push(allTasks[i]);
    allTasks.splice(i, 1);
    task.classList.add('d-none');
    setId();
    await safeData();
    renderBacklog();
}


async function deleteBacklogTask(i) {
    allTasks.splice(i, 1);
    assignedUser.splice(i, 1);
    await safeData();
    renderBacklog();
}