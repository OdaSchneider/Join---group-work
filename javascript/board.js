// ---------------------------Bord--------------------------------------------------------

/**
 * DE: Läd alles aus dem Backend
 * EN: Load everything from the backend
 */
async function loadBoard() {
    // await downloadFromServer();
    // allToDos = JSON.parse(backend.getItem('allToDos')) || [];
    loadLocalStorage();
    renderBoard();
}


/**
 * DE: Speichert alles im Backend
 * EN: Stores everything in the backend
 */
async function save() {
    // await backend.setItem('allToDos', JSON.stringify(allToDos));
    safeLocalStorage();
    loadBoard();
}


/**
 * DE: Alle Renderfunktion in einer um das Board anzuzeigen zu können.
 * EN: All render function in one to display the board.
 */
function renderBoard() {
    setId();
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


/**
 * DE: Render die TODO Spalte
 * EN: Render the TODO column
 */
function renderToDo() {
    let currentToDo = allToDos.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i);
        
        renderUserForBoard(i);
    }
}
/**
 * DE: Render die InProgress Spalte
 * EN: Render the InProgress column
 */
function renderInProgress() {
    let currentInProgress = allToDos.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i);
        
        renderUserForBoard(i);
    }
}
/**
 * DE: Render die Testing Spalte
 * EN: Render the Testing column
 */
function renderTesting() {
    let currentTesting = allToDos.filter(t => t['status'] == 'testing');
    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i);
        
        renderUserForBoard(i);
    }
}
/**
 * DE: Render die Done Spalte
 * EN: Render the Done column
 */
function renderDone() {
    let currentDone = allToDos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        document.getElementById('done').innerHTML += generateTasksHTML(element, i);

        renderUserForBoard(i);
    }
}


/**
 * DE: Erstellt die User auf dem Board.
 * EN: Rendert the User on the Board.
 */
function renderUserForBoard(i) {
    let userBoardContainer = document.getElementById(`loardImgUserOnBoard${i}`);
    userBoardContainer.innerHTML = '';

    let selectedUser = allToDos[i]['assignedUser'];
    for (let j = 0; j < selectedUser.length; j++) {
        let userimageBoard = selectedUser[j]['userImg'];
        userBoardContainer.innerHTML += renderUserOnTheBoard(userimageBoard);
    }
}


/**
 * DE: Erstellt die User in einem offendem ToDo.
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
        tasks['status'] = 'inProgress'
    } else {
        if (tasks['status'] == 'inProgress') {
            tasks['status'] = 'testing'
        } else {
            if (tasks['status'] == 'testing') {
                tasks['status'] = 'done'
            }
        }
    }
    closeTask();
}


function closeTask(){
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('openTask').classList.remove('exit-ani');
    save(); 
}


/**
 * DE: Öffnet die Taskt die man haben möchte, mit allen Informationen die benötikt werden.
 * EN: Opens the task you want with all the information you need.
 */
function openTask(id) {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let tasks = allToDos.find(t => t['id'] == id);
    document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks, id);
    renderUserForBoardOpenTask(id);
    renderComments(id, tasks);
}


/**
 * DE: Schließt das Task wieder und zeigt das board wieder an.
 * EN: Closes the task again and shows the board again.
 */
function backToBoard() {
    document.getElementById('overlayBg').classList.add('exit-ani-o-t');
    document.getElementById('openTask1').classList.add('exit-openTask');
    setTimeout(() => {
        document.getElementById('overlayBg').classList.add('d-none');
        document.getElementById('openTask1').classList.add('d-none');
        document.getElementById('openTask').classList.add('d-none');

    }, 300);
    setTimeout(() => {
        document.getElementById('openTask1').classList.remove('exit-openTask');
        document.getElementById('overlayBg').classList.remove('exit-ani-o-t');
    }, 300);
}


/**
 * DE: Löscht das ausgewählte Todo aus dem Array und vom HTML raus.
 * EN: Deletes the selected todo from the array and from the HTML.
 */
function deleteTask(id) {
    allToDos.splice(id, 1);
    assignedUser.splice(id, 1);
    save();
    backToBoard();
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

function moveTo(status) {
    let task = allToDos.find(t => t['id'] == currentDraggedElement);
    task['status'] = status;
    save();
}


/**
 * DE: Läd den commentar aus dem Input fehld und fügt den in das Arry ein unter Comments
 * EN: Loads the comment from the input field and inserts it into the array under Comments
 */
function sendComment(id) {
    let commentsOnTheBoard = document.getElementById(`commentsInput${id}`);

    if(commentsOnTheBoard.value.length == 0) {
        alert("Bitte etwas eingeben!");
    } else {
        let tasks = allToDos.find(t => t['id'] == id);
        tasks['comments'].push(commentsOnTheBoard.value);
        commentsOnTheBoard.value = '';
        safeLocalStorage();
        renderComments(id, tasks);
    }
}


/**
 * DE: Läd alle Kommentare
 * EN: Load all Comments
 */
function renderComments(id, tasks) {
    document.getElementById(`showComment${id}`).innerHTML = '';
    for (let j = 0; j < tasks['comments'].length; j++) {
        let comment = tasks['comments'][j];
        document.getElementById(`showComment${id}`).innerHTML += renderCommentsOnTheTask(id, j, comment); 
    }
}
 

/**
 * DE: Löscht den Kommentar
 * EN: Delet the Comment
 */
function deletComment(j, id) {
    let tasks = allToDos.find(t => t['id'] == id);
    tasks['comments'].splice(j, 1);
    safeLocalStorage();
    renderComments(id, tasks);
}