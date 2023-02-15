// ---------------------------Bord--------------------------------------------------------


function renderBoard() {
    renderToDo();
    renderInProgress();
    renderTesting();
    renderDone();
}


function setId(){
    for (let i = 0; i < allToDos.length; i++) {
        allToDos[i]['id'] = i;
    }
}


function renderToDo() {
    let currentToDo = allToDos.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i);
        
        renderUserForBoard(element, i);
    }
}


function renderInProgress() {
    let currentInProgress = allToDos.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i);
        
        renderUserForBoard(element, i);
    }
}


function renderTesting() {
    let currentTesting = allToDos.filter(t => t['status'] == 'testing');
    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i);
        
        renderUserForBoard(element, i);
    }
}


function renderDone() {
    let currentDone = allToDos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        document.getElementById('done').innerHTML += generateTasksHTML(element, i);

        renderUserForBoard(element, i);
    }
}


/**
 * DE: Erstellt die User auf dem Board.
 * EN: Rendert the User on the Board.
 */
function renderUserForBoard(element) {
    let userBoardContainer = document.getElementById(`loardImgUserOnBoard${element['id']}`);
    userBoardContainer.innerHTML = '';

    let selectedUser = element['assignedUser'];
    for (let j = 0; j < selectedUser.length; j++) {
        let userimageBoard = selectedUser[j]['userImg'];
        userBoardContainer.innerHTML += renderUserOnTheBoard(userimageBoard);
    }
}


/**
 * DE: Erstellt die User in einem offendem task.
 * EN: Rendert the User in an open Task.
 */
function renderUserForBoardOpenTask(id) {
    let userBoardOpenTaskContainer = document.getElementById(`loardImgUserOnBoard2${id}`);
    userBoardOpenTaskContainer.innerHTML = '';
    let tasks = allToDos.find(t => t['id'] == id);
    let selectedUser2 = tasks['assignedUser'];
    for (let k = 0; k < selectedUser2.length; k++) {
        let userimageBoard2 = selectedUser2[k]['userImg'];
        userBoardOpenTaskContainer.innerHTML += renderUserOpenTask(userimageBoard2);
    }
}


/**
 * DE: Bei geöffneter task ist ein Bild von einem Pfeil. Drückt man diesen, sorgt die funktion dafür das dass, jeweilige Array den Status ändert.
 * EN: When the task is open there is an image of an arrow. If you press this, the function ensures that the respective array changes the status.
*/
function pushToOtherBoard(id) {
    let tasks = allToDos.find(t => t['id'] == id);
    if (tasks['status'] == 'toDo') {
        tasks['status'] = 'inProgress';
    } else {
        if (tasks['status'] == 'inProgress') {
            tasks['status'] = 'testing';
        } else {
            if (tasks['status'] == 'testing') {
                tasks['status'] = 'done';
            }
        }
    }
    closeTask();
}


function pushToOtherBoardBack(id) {
    let tasks = allToDos.find(t => t['id'] == id);
    if (tasks['status'] == 'done') {
        tasks['status'] = 'testing';
    } else {
        if (tasks['status'] == 'testing') {
            tasks['status'] = 'inProgress';
        } else {
            if (tasks['status'] == 'inProgress') {
                tasks['status'] = 'toDo';
            }
        }
    }
    closeTask();
}


async function closeTask(){
    document.body.style.overflow = 'auto';
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('openTask').classList.remove('exit-ani');
    await safeData(); 
    renderBoard();
}


function openTask(id) {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0,0);
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');

    let tasks = allToDos.find(t => t['id'] == id);
    document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks, id);

    renderUserForBoardOpenTask(id);
    renderComments(id, tasks);
    checkPushFunction(tasks, id);
    checkPushFunctionBack(tasks, id);
}


function checkPushFunction(tasks, id){
    if (tasks['status'] == 'done') {
        document.getElementById(`pushToOtherBoard${id}`).classList.add('d-none');
    }
}


function checkPushFunctionBack(tasks, id){
    if (tasks['status'] == 'toDo') {
        document.getElementById(`pushToOtherBoardBack${id}`).classList.add('d-none');
    }
}


/**
 * DE: Schließt die Task wieder und zeigt das board wieder an.
 * EN: Closes the task again and shows the board again.
 */
function backToBoard() {
    document.getElementById('overlayBg').classList.add('exitBackground');
    document.getElementById('openTask1').classList.add('exitOpenTask');
    setTimeout(() => {
        document.getElementById('overlayBg').classList.add('d-none');
        document.getElementById('openTask1').classList.add('d-none');
        document.getElementById('openTask').classList.add('d-none');

    }, 300);
    setTimeout(() => {
        document.getElementById('openTask1').classList.remove('exitOpenTask');
        document.getElementById('overlayBg').classList.remove('exitBackground');
    }, 300);
    closeTask();
}


async function deleteTask(id) {
    allToDos.splice(id, 1);
    assignedUser.splice(id, 1);
    await safeData();
    backToBoard();
    renderBoard();
}


async function sendComment(id) {
    let commentsOnTheBoard = document.getElementById(`commentsInput${id}`);

    if(commentsOnTheBoard.value.length == 0) {
        alert("Bitte etwas eingeben!");
    } else {
        let tasks = allToDos.find(t => t['id'] == id);
        tasks['comments'].push(commentsOnTheBoard.value);
        commentsOnTheBoard.value = '';
        await safeData();
        renderComments(id, tasks);
    }
}


function renderComments(id, tasks) {
    document.getElementById(`showComment${id}`).innerHTML = '';
    let startComments = tasks['comments'].length -1;
    for (let j = startComments; j > -1 ; j--) {
        let comment = tasks['comments'][j];
        document.getElementById(`showComment${id}`).innerHTML += renderCommentsOnTheTask(id, j, comment); 
    }
}
 

async function deletComment(j, id) {
    let tasks = allToDos.find(t => t['id'] == id);
    tasks['comments'].splice(j, 1);
    await safeData();
    renderComments(id, tasks);
}


/**  
 * DE: Alle funktion ab hier, sind für die Drag and Drop funktion.
 * EN: All functions from here are for the drag and drop function.
 */
 function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');

}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status) {
    let task = allToDos.find(t => t['id'] == currentDraggedElement);
    task['status'] = status;
    await safeData();
    renderBoard();
} 