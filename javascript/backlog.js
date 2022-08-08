// ---------------------------Backlog---------------------------------------------------------


function renderBacklog() {
    let history = document.getElementById('backlog-container');
    history.innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];
        history.innerHTML += backlogContainer(i, category, description);

        renderUser(i);
    }
}


function renderUser(i) {
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


function sendToBoard(i) {
    let task = document.getElementById(`backlog-task${i}`);

    allToDos.push(allTasks[i]);
    allTasks.splice(i, 1);
    task.classList.add('d-none');

    safeLocalStorage();
    renderBacklog();
} 