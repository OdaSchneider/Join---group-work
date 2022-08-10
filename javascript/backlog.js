// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');
    history.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];
        createdAt = allTasks[i]['createdAt'];
        title = allTasks[i]['title'];
        history.innerHTML += backlogContainer(i, createdAt, category, title);
        renderUser(i);
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
}

function fillAssignedUser(i){
    let loadAssignedUser =  allTasks[i]['assignedUser']
    let editAssignedUser = document.getElementById('editAssignedAccount'+i);
    editAssignedUser.innerHTML = '';
    for (let j = 0; j < loadAssignedUser.length; j++) {
        editAssignedUser.innerHTML += `<img src=${loadAssignedUser[j]['userImg']}>`;
    }
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