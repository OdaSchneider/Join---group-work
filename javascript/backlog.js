// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');
    history.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];
        createdAt = allTasks[i]['createdAt'];
        title = allTasks[i]['title'];
        history.innerHTML += backlogContainer(i, createdAt, category, title, description);
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
    document.getElementById(`backlog-description${i}`).classList.remove('d-none');
}


function sendToBoard(i) {
    let task = document.getElementById(`backlog-task${i}`);

    allToDos.push(allTasks[i]);
    allTasks.splice(i, 1);
    task.classList.add('d-none');

    safeLocalStorage();
    renderBacklog();
} 