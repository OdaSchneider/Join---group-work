// ---------------------------Bord--------------------------------------------------------

// setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let currenDraggedElement;




/* - TODOS - 
- renderBoarder optimieren / Fehler beheben.
- Drag and Drop muss noch getestet werden.
*/




async function loadBoard() {
    await downloadFromServer();
    allToDos = JSON.parse(backend.getItem('allToDos')) || [];
    renderBoard();
}


async function save() {
    await backend.setItem('allToDos', JSON.stringify(allToDos));
    loadBoard();
}


function renderBoard() {
    let currentToDo = allToDos.filter(t => t['id'] == 'toDo');
    let currentInProgress = allToDos.filter(t => t['id'] == 'inProgress');
    let currentTesting = allToDos.filter(t => t['id'] == 'testing');
    let currentDone = allToDos.filter(t => t['id'] == 'done');
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    forLoop1(currentToDo);
    forLoop2(currentInProgress);
    forLoop3(currentTesting);
    forLoop4(currentDone);
}


function forLoop1(currentToDo) {
    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        type = 'toDo';
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'toDo'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function forLoop2(currentInProgress) {
    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        type = 'inProgress';
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'inProgress'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function forLoop3(currentTesting) {
    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        type = 'testing';
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'testing'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function forLoop4(currentDone) {
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        type = 'done';
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'done'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function highlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}


function removeHighlight() {
    document.getElementById(id).classList.remove('dragAreaHighlight');

}


function moveTo(status) {
    tasks.find(task => task.id == currentDraggedElement).status = status;
    renderBoardersInit();
}