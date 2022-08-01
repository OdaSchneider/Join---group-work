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


function backlogContainer(userimage, username, category, description) {
    return /*html*/ `
    <div class="backlog-container">
        <div class="backlog-user">
            <div>${userimage}</div>
            <div><span>${username}</span></div>
        </div>
        <div class="backlog-cat-description">
            <div>${category}</div>
            <div>${description}</div> 
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
            <img onclick="closeDialog()" src="./img/x-mark.ico">
        </div>
    `
}