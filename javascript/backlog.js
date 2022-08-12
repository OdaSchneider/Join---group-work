// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');
    history.innerHTML = '';
    emptyBacklog();
    let start = allTasks.length -1;
    for (let i = start; i > -1 ; i--) {
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
    if(allTasks.length == 0) {
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


function setUrgency(i){
    urgencyColor = allTasks[i]['urgency']; 
    document.getElementById(`setUrgency${i}`).classList.add(`background_${urgencyColor}`);
}


function backlogShowDetails(i){
    document.getElementById(`backlogDetailsBg`).classList.remove('d-none');
    let showDetails = document.getElementById('details');
    showDetails.innerHTML = backlogDetailsTemplate(i);
    fillDetails(i);
}

function closeEdit(){
    document.getElementById(`backlogDetailsBg`).classList.add('d-none');
}


function fillDetails(i){
    document.getElementById('editTitle'+i).value = allTasks[i]['title'];
    document.getElementById('editDescription'+i).value = allTasks[i]['description'];
    document.getElementById('editDate'+i).value = allTasks[i]['dueDate'];
    document.getElementById('editCategory'+i).value = allTasks[i]['category'];
    document.getElementById('editUrgency'+i).value = allTasks[i]['urgency'];
    fillAssignedUser(i);
    fillAllUser(i);
    checkForRightToEdit(i);
}


function fillAllUser(i) {
    let profil = document.getElementById('edituser'+i);
    profil.innerHTML = '';

    for (let j = 0; j < user.length; j++) {
        let userImg = user[j]['userImg'];
        let firstName = user[j]['first name'].charAt(0).toLocaleUpperCase();
        let lastName = user[j]['last name'].charAt(0).toLocaleUpperCase();
        profil.innerHTML += templateShowUserBacklog(userImg, firstName, lastName ,j, i);
    }
}


function fillAssignedUser(i){
    let loadAssignedUser =  allTasks[i]['assignedUser'];
    let editAssignedUser = document.getElementById('editAssignedAccount'+i);
    editAssignedUser.innerHTML = '';
    for (let j = 0; j < loadAssignedUser.length; j++) {
        editAssignedUser.innerHTML += `<img onclick="removeUserBacklog(${j},${i})" src=${loadAssignedUser[j]['userImg']}>`;
    }
}


function removeUserBacklog(j, i){
    allTasks[i]['assignedUser'].splice(j, 1);
    safeLocalStorage();
    fillAssignedUser(i);
}


function assigneUserBacklog(j, i){
    let found = false;
    let assigneUser = allTasks[i]['assignedUser'];
    for (let k = 0; k < assigneUser.length; k++) {
        if(assigneUser[k]['first name']==user[j]['first name']&&assigneUser[k]['last name']==user[j]['last name']){
            found = true;
            break;
        }
    }
    checkIfUserExistBacklog(found, assigneUser, j, i);
}


function checkIfUserExistBacklog(found, assigneUser, j, i){
    if(!found){
        assigneUser.push(user[j]);
    }else{
        userExist(j);
    }
    fillAssignedUser(i);
}


function checkForRightToEdit(i){
    let contributers = allTasks[i]['assignedUser']

    for (let j = 0; j < contributers.length; j++) {

        let firstname = contributers[j]['first name'];
        let lastname = contributers[j]['last name'];

        let loggedUserFirstname = loggedUser['first name'];
        let loggedUserLastname = loggedUser['last name'];

        if(loggedUserFirstname != firstname || loggedUserLastname != lastname ){
            disableEdit(i);
        }else{
            enableEdit(i);
            break;
        }
    }
}


function disableEdit(i){
    document.getElementById('editTitle'+i).disabled = true;
    document.getElementById('editDescription'+i).disabled = true;
    document.getElementById('editDate'+i).disabled = true;
    document.getElementById('editCategory'+i).disabled = true;
    document.getElementById('editUrgency'+i).disabled = true;
    document.getElementById('alert').innerHTML = 'Note: Only assigned User can edit Tasks';
}



function enableEdit(i){
    document.getElementById('editTitle'+i).disabled = false;
    document.getElementById('editDescription'+i).disabled = false;
    document.getElementById('editDate'+i).disabled = false;
    document.getElementById('editCategory'+i).disabled = false;
    document.getElementById('editUrgency'+i).disabled = false;
}


function editTask(i){
    allTasks[i]['title'] = document.getElementById('editTitle'+i).value;
    allTasks[i]['description'] = document.getElementById('editDescription'+i).value;
    allTasks[i]['dueDate'] = document.getElementById('editDate'+i).value;
    allTasks[i]['category'] = document.getElementById('editCategory'+i).value;
    allTasks[i]['urgency'] = document.getElementById('editUrgency'+i).value;
    allTasks[i]['createdAt'] = new Date().toLocaleDateString();
    safeLocalStorage();
}


function sendToBoard(i) {
    let task = document.getElementById(`backlog-task${i}`);

    allToDos.push(allTasks[i]);
    allTasks.splice(i, 1);
    task.classList.add('d-none');

    safeLocalStorage();
    renderBacklog();
} 