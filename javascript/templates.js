// ###############- Board -####################################################################################

function generateTasksHTML(element, i) {
    return `
         <div class="tasks ${element['urgency']}" onclick="openTask(${element['id']}, ${i})" draggable="true" ondragstart="startDragging(${element['id']})" id="taskOnBoard${element['id']}">
            <div class="dateAndTitle">
                <span class="titleTask">${element['title']}</span>
            </div>
            <div class="imgAndDescriptionDiv"> 
                <span class="descriptionMini">${element['description']}</span>          
            </div>
            <span class="dateOnTask">${element['dueDate']}</span>
            <div class="loardImgUserOnBoard" id="loardImgUserOnBoard${element['id']}"></div>   
        </div>
    `;
}


function generateOpenTaskHTML(task, id) {
    return `
        <div class="openTask" id="openTask1">
            <div class="createdAndOptionButton">
                <div class="statusResponsiv">
                    <span class="statusText">${task['status']}</span>
                </div>
                
                <div class="closeAndDeletTaskDiv">
                    <div class="closeTask" onclick="backToBoard()"><img class="trash" src="/img/close.png"></div>
                    <div onclick="deleteTask('${task['id']}')">
                        <img class="trash" src="/img/müll.png">
                    </div>
                    <div class="pushToDiv" onclick="pushToOtherBoard('${task['id']}')" id="pushToOtherBoard${task['id']}">   
                        <img class="pushTo" src="/img/arrow.png">
                    </div>
                    <div class="pushToDiv" onclick="pushToOtherBoardBack('${task['id']}')" id="pushToOtherBoardBack${task['id']}">
                        <img class="pushTo" src="/img/arrow2.png">
                    </div>
                </div>
            </div>

            <div class="headerOpenTask">
                <div class="dateCreated">
                    Created: <span>${task['createdAt']}</span>
                </div> 
                <div class="dateCreated">
                    Finish: <span>${task['dueDate']}</span>
                </div>
                <div class="urgencyDiv">Urgency: 
                    <span class="color_${task['urgency']}">${task['urgency']}</span>
                </div>
            </div>
           

            <div class="header2OpenTask"> 
                <div class="footerTask">
                    <div>Category: <span>${task['category']}</span></div>
                </div>

                <div class="userImgInOpenTask" id="loardImgUserOnBoard2${id}"></div>
            </div>           

            <div class=titelAndTaskAndPushToDiv>
                <div class="title bold">${task['title']}</div>
                <div class="textOpenTask">${task['description']}</div>
            </div>

            <div class="divForTheComments">
                <div class="inputAndSendButton">
                    <input id="commentsInput${id}" placeholder="comment..." class="inputStyleComments" type="text">
                    <img src="./img/send.png" class="sendButtonForTheComments" onclick="sendComment(${id})">
                </div>
                <div class="showComments" id="showComment${id}"></div>
            </div>
        </div>    
    `;
}

function renderUserOnTheBoard(userimageBoard) {
    return `
    <img class="profileImgTaks" src="${userimageBoard}">
    `;
}

function renderUserOpenTask(userimageBoard2) {
    return `
    <img class="profileImgTaksOpenTask" src="${userimageBoard2}">
    `;
}


function renderCommentsOnTheTask(id, j, comment) {
    return `
        <div class="commentsAndDeletComment">
            <img class="commentImg" src="${loggedUser['userImg']}">
            <button class="deletCommentButton" onclick="deletComment(${j}, ${id})">X</button>
            <span class="comments">${comment}</span>
         </div>
    `;
}



// ###############- Backlog -####################################################################################


function backlogContainer(i, createdAt, category, title) {
    return `
    <div id="backlog-task${i}" class="backlog-container">
        <div onclick="backlogShowDetails(${i})" id="setUrgency${i}" class="backlog-main">
            
            <div class="backlog-main-child">
               <div class="user-div">
                    <div class="backlog-user" id="backlog-user${i}"></div>
                </div>
                <div class="details-div">
                    <div class="backlog-dueDate">${createdAt}</div>
                    <div class="backlog-category">${category}</div>
                    <div class="backlog-details">${title}</div>
                </div>
            </div>
        </div>          
        <div class="backlog-send-to">
            <button class="btn-delete" onclick="deleteBacklogTask(${i})" title="delete Backlog"><img src="../img/müll.png"></button>
            <button class="btn-send-to-board" onclick="sendToBoard(${i})" title="send to Board"><img src="../img/arrow-up.ico"></button>
        </div>  
    </div>
    `;
}


function backlogUserContainer(userfirstname, userlastname, userimage) {
    return `
    <div class="backlog-user-child">
        <img src="${userimage}">
    </div>`
}


function activeUserTemplate() {
    return `
        <img src=${loggedUser['userImg']}>
        <p>
            ${loggedUser['first name'].charAt(0).toLocaleUpperCase()} 
            ${loggedUser['last name'].charAt(0).toLocaleUpperCase()}
        </p>`;
}


function backlogDetailsTemplate(i) {
    return /*html*/`
        <div class="addTaskBg addTaskBgBacklog">            
            <form method="dialog" id="editTask${i}" class="addTask" onclick="doNotClose(event)">
                <div class="columnLeft">
                    <div class="container">
                        <h3>Title</h3>
                        <input required placeholder="add Title" id="editTitle${i}">
                    </div>
                    <div class="container">
                        <h3>Description</h3>
                        <textarea required id="editDescription${i}"></textarea>
                    </div>
                    <div class="container">
                        <h3>Assigned To</h3>
                        <p id="alert"></p>
                        <div class="editAssignedAccount" id="editAssignedAccount${i}"></div>

                        <div id="addUserInEdit" class="assigneToAccount">
                            <span>Add</span>
                            <div class="editUserBacklog" id="edituser${i}"></div>
                        </div>
                    </div>
                </div>
                
                <div class="columnRight">
                    <div class="container">
                        <h3>Due Date</h3>
                        <input type="date" required id="editDate${i}">
                    </div>
                    <div class="container">
                        <h3>Category</h3>
                        <select required id="editCategory${i}">
                            <option value="Administration">Administration</option>
                            <option value="Finances">Finances</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sale">Sale</option>
                            <option value="IT">IT</option>
                        </select>
                    </div>
                    <div class="container">
                        <h3>Urgency</h3>
                        <select required id="editUrgency${i}">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div class="addTaskButtonLine">
                        <button type="button" onclick="closeEdit()" class="cancelTaskButton">Cancel</button>
                        <button id="editTaskButton${i}" type="button" onclick="checkValidationBacklog(${i})" class="createTaskButton">edit Task</button>
                    </div>
                </div>                
            </form>            
        </div>`
}


function templateShowUserBacklog(userImg, j, i) {
    return `
    <div class="showUser">
    <img id="selectUser${j}" onclick="assigneUserBacklog(${j},${i})" src=${userImg}>
    </div>`
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
        <span onclick="deleteUser(${i})"><img class="editUsersIcon" src="./img/delete.ico"></span>
        <img class="editUsersImg" src=${userImg}>
        <p>${firstName} ${lastName}</p>
    <div>`
}


function templateShowUser(userImg, firstName, lastName, j) {
    return `
    <div class="showUser">
    <img id="selectUser${j}" onclick="selectUser(${j})" src=${userImg}>
    <p>${firstName} ${lastName}</p>
    </div>`
}