
// ###############- Board -####################################################################################

function generateTasksHTML(element, i) {
    return /*html*/ `
        <div class="tasks ${element['urgency']}" onclick="openTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" id="taskOnBoard${element['id']}">
            <div class="dateAndTitle">
                <span class="titleTask">${element['title']}</span>
                <span class="dateOnTask">${element['dueDate']}</span>
            </div>
            <div class="imgAndDescriptionDiv"> 
                <span class="descriptionMini">${element['description']}</span>
                <div id="loardImgUserOnBoard${i}"></div>              
            </div>`
}


function generateOpenTaskHTML(task, id) {
    return `
        <div class="openTask" id="openTask1">

            <div class="headerOpenTask">
                <div class="dateCreated">
                    Created: <span class="bold"> ${task['createdAt']}</span>
                </div>
                <div class="closeAndDeletTaskDiv">
                    <div class="closeTask" onclick="backToBoard()"><img class="trash" src="/img/close.png"></div>
                    <div onclick="deleteTask('${task['id']}')">
                        <img class="trash" src="/img/müll.png">
                    </div>
                </div> 
            </div> 

            <div class="header2OpenTask"> 
                <div class="urgency">Urgency: <span class="${task['urgency']} bold">${task['urgency']}</span></div>
                <div class="footerTask">
                    <div>Category: <span class="bold">${task['category']}</span></div>
                </div>
                <div class="userImgInOpenTask" id="loardImgUserOnBoard2${id}"></div>
            </div>

            <div class=titelAndTaskAndPushToDiv>
                <div class="title bold">${task['title']}</div>
                <div class="textOpenTask">${task['description']}</div>
                <div class="pushTo" onclick="pushToOtherBoard('${task['id']}')" id="pushToOtherBoard">
                    <span id="pushTo"></span>
                    <img src="/img/arrow.png">
                </div>
            </div>
        </div>
    `;
}

function renderUserOnTheBoard(userimageBoard) {
    return `
    <span class="descriptionMini"><img class="profileImgTaks" src="${userimageBoard}"></span>
    `;
}

function renderUserOpenTask(userimageBoard2) {
    return `
    <span class="descriptionMini"><img class="profileImgTaks" src="${userimageBoard2}"></span>
    `;
}


// ###############- Backlog -####################################################################################


function backlogContainer(i, createdAt, category, title, description) {
    return /*html*/ `
    <div id="backlog-task${i}" class="backlog-container">
        <div class="backlog-main">
            
            <div class="backlog-main-child">
                <div id="setUrgency${i}" class="setUrgency"></div>
                <div class="backlog-user" id="backlog-user${i}"></div>
                <div class="backlog-dueDate">${createdAt}</div>
                <div class="backlog-category">${category}</div>
                <div class="backlog-title">${title}</div>

                <button id="descriptionButton${i}" onclick="backlogShowDetails(i)" class="backlog-description-button">
                    Show Details
                </button>
            </div>

            <div id="backlog-description${i}" class="backlog-description d-none">${description}</div>
        </div>          
        <div class="backlog-send-to">
            <button class="btn-send-to-board" onclick="sendToBoard(${i})"><img src="../img/arrow-up.ico"></button>
        </div>  
    </div>
    `;
}


function backlogUserContainer(userfirstname, userlastname, userimage) {
    return `
    <img src="${userimage}">
    <div class="username"><span>${userfirstname} ${userlastname}</span></div>`
}


function backlogShowDetails(){

}


// ###############- Add Taks -####################################################################################

function createNewUser() {
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
            <img class="x-mark" onclick="closeDialogNewUser()" src="./img/x-mark.ico">
        </div>
    `
}


function editUser(firstName, lastName, userImg, i) {
    return `
    <div class="editUsers">
        <span onclick="deleteUser(${i})"><b>X</b></span>
        <img src=${userImg}>
        <p>${firstName} ${lastName}</p>
    <div>`
}


function templateShowUser(userImg, firstName, lastName, i) {
    return `
    <div class="showUser">
    <img id="selectUser${i}" onclick="selectUser(${i})" src=${userImg}>
    <p>${firstName} ${lastName}</p>
    </div>`
}