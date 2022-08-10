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
        'createdAt': new Date().toLocaleDateString(),
        'assignedUser': assignedUser,
        'id': '',
        'status': 'toDo'
    };

    assignTask(task);
}


function assignTask(task) {
    allTasks.push(task);
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
    reactIfUserFound(found, firstName, lastName);
}


function reactIfUserFound(found, firstName, lastName){
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
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    document.getElementById('dialogBg').classList.remove('d-none');
    document.getElementById('newUserContent').classList.add('d-none');
    renderEditUser();
}


function renderEditUser(){
    let editProfil = document.getElementById('editUserContent');
    editProfil.innerHTML = `<img class="x-mark" onclick="closeDialogEditUser()" src="./img/x-mark.ico"></img>`;
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


function closeDialogEditUser() {
    document.body.style.overflow = 'auto';
    document.getElementById('dialogBg').classList.add('d-none');
    document.getElementById('newUserContent').classList.remove('d-none');
    document.getElementById('editUserContent').innerHTML = '';
    showUser();
}