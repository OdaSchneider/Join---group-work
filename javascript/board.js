// ---------------------------Bord--------------------------------------------------------

// setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
let currentDraggedElement;




/* - TODOS - 
- pushToOtherBoard() - fehler noch vorhanden.
- Drag and Drop funktioniert noch nicht ganz.
*/



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
    renderToDo();
    renderInProgress();
    renderTesting();
    renderDone();
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
        type = 'toDo'; //Definiert den Typ
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) { //Rendert User
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'toDo'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
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
        type = 'inProgress'; //Definiert den Typ
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) { //Rendert User
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'inProgress'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
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
        type = 'testing'; //Definiert den Typ
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) { //Rendert User
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'testing'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
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
        type = 'done'; //Definiert den Typ
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) { //Rendert User
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'done'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

/**
 * DE: Bei geöffneter task ist ein Bild von einem Pfeil. Drückt man diesen, sorgt die funktion dafür das dass, jeweilige Array den Status ändert.
 * EN: When the task is open there is an image of an arrow. If you press this, the function ensures that the respective array changes the status.
*/

function pushToOtherBoard(i) {
    let tasks = allToDos.find(t => t['createdAt'] == i);
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
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('openTask').classList.remove('exit-ani');

    safeLocalStorage();
}

/**
 * DE: Öffnet die Taskt die man haben möchte, mit allen Informationen die benötikt werden.
 * EN: Opens the task you want with all the information you need.
 * 
 * @param {allToDos} i // transmits the data we need.
 * @param {status} type // determines which type is opened.
 */

function openTask(i, type) {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let tasks = allToDos.filter(t => t['status'] == type);

    if (tasks[i]['status'] == 'toDo') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
    }
    if (tasks[i]['status'] == 'inProgress') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
    }
    if (tasks[i]['id'] == 'testing') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
    }
    if (tasks[i]['id'] == 'done') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
    }
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
 * DE: Alle funktion ab hier, sind für die Drag and Drop funktion.
 * EN: All functions from here are for the drag and drop function.
 */


function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight() {
    document.getElementById(id).classList.remove('dragAreaHighlight');

}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    let task = allToDos.find(t => t.id == currentDraggedElement);
    task['place'] = status;
    renderBoard();
    // save();
}