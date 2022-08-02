// function renderBoardersToDos(toDos) {
//     return /*html*/ `
//         <div draggable="true" ondragstart="startDragging(${toDos['id']})" class="boardBlocks">
//             <div class="titleAndDescription">
//                 <h3 title="Titel">${toDos[i]['title']}</h3>
//                 <span title="Beschreibung">${toDos[i]['description']}</span>
//             </div>
//             <div class="datenArrangement">
//                 <span title="Erstellungs Datum">${toDos[i]['date']}</span>
//                 <span title="Kategorie">${toDos[i]['category']}</span>
//                 <img title="Profielbild"src="img/user-guest.ico">
//             </div>
//         </div>
//         `;
// }

function generateTasksHTML(element, i, type) {
    return `
        <div class="tasks ${element['urgency']}" onclick="openTask(${i}, '${type}')" draggable="true" ondragstart="startDragging(${element['createdAt']})" id="taskOnBoard${i}${type}">
            <span class="dateOnTask">Due Date: ${element['date']}</span>
            <span class="titleTask">${element['title']}</span>
            <div id="currentemployee${i}${type}"></div> 
        </div>    
    `;
}


// #####################################################################################################################################################################################


function backlogContainer(id, userimage, username, category, description) {
    return /*html*/ `
    <div id="backlog-task${id}" class="backlog-container">
        <div class="backlog-main">
            <div class="backlog-user">
                <img src="${userimage}">
                <div class="username"><span>${username}</span></div>
            </div>
            <div class="backlog-cat">
                <div>${category}</div>
            </div>
            <div class="backlog-description">
                <div>${description}</div> 
            </div> 
        </div>          
        <div class="backlog-send-to">
            <button class="btn-send-to-board" onclick="sendToBoard()">send to board</button>
        </div>  
    </div>
    `;
}

// #############################################################################################

function createNewUser(){
    return `
        <h3>New User</h3>
        <div>
            <input id="newUserFirstName" placeholder="First Name">
        </div>
        <div>
            <input id="newUserLastName"  placeholder="Last Name">
        </div>
        <div>
            <button onclick="addNewUser()">Add User</button>
            <img class="closeDialogImg" onclick="closeDialog()" src="./img/x-mark.ico">
        </div>
    `
}


function editUser(firstName, lastName, userImg, i){
return `
    <div class="editUsers">
        <span onclick="deleteUser(${i})">X</span>
        <img src=${userImg}>
        <p>${firstName} ${lastName}</p>
    <div>`
}


function templateShowUser(userImg, firstName, lastName ,i){
    return`
    <div class="showUser">
    <img onclick="selectUser(${i})" src=${userImg}>
    <p>${firstName} ${lastName}</p>
    </div>`
}