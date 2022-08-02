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
                <div class="column">
                    Created On: 
                    <span class="bold">${task['createdAt']}</span>
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
            <img onclick="closeDialog()" src="./img/x-mark.ico">
        </div>
    `
}