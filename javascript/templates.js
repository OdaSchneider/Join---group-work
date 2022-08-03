function generateTasksHTML(element, i, type) {
    return `
        <div class="tasks ${element['urgency']}" onclick="openTask(${i}, '${type}')" draggable="true" ondragstart="startDragging(${element['createdAt']})" id="taskOnBoard${i}${type}">
            <span class="dateOnTask">Due Date: ${element['date']}</span>
            <span class="titleTask">${element['title']}</span>
            <div id="currentemployee${i}${assignedUser}"></div> 
        </div>    
    `;
}


function generateOpenTaskHTML(task) {
    return `
        <div class="openTask" id="openTask1">
            <div class="headerOpenTask">
                <div class="column">
                    Due Date: 
                    <span class="bold">${task['date']}</span>
                </div>
                <div class="closeTask" onclick="backToBoard()"><img class="trash" src="img/close.png"></div>
            </div> 
            <div class="header2OpenTask">
                <div>
                    Urgency: <span class="${task['urgency']} bold">${task['urgency']}</span>
                </div>
                <div onclick="deleteTask('${task['createdAt']}')">
                <img class="trash" src="img/müll.png">
                </div>
            </div>   
            <div class="title bold">${task['title']}</div>
            <div class="textOpenTask">${task['description']}</div>
            <div class="footerTask">
                <div>Category: <span class="bold">${task['category']}</span></div>
                <div id="currentemployee2"></div>
            </div>
            <div class="pushTo d-none" onclick="pushToOtherBoard('${task['createdAt']}')" id="pushToOtherBoard">
                <span id="pushTo"></span>
                <img src="img/arrow.png">
            </div>
        </div>
    `;
}


// #####################################################################################################################################################################################


function backlogContainer(i, userimage, userfirstname, userlastname, category, description) {
    return /*html*/ `
    <div id="backlog-task${i}" class="backlog-container">
        <div class="backlog-main">
            <div class="backlog-user">
                <img src="${userimage}">
                <div class="username"><span>${userfirstname} ${userlastname}</span></div>
            </div>
            <div class="backlog-cat">
                <div>${category}</div>
            </div>
            <div class="backlog-description">
                <div>${description}</div> 
            </div> 
        </div>          
        <div class="backlog-send-to">
            <button class="btn-send-to-board" onclick="sendToBoard(${i})">send to board</button>
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
        <span onclick="deleteUser(${i})"><b>X</b></span>
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