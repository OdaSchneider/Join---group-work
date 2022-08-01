// ---------------------------Bord--------------------------------------------------------

// setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
let currenDraggedElement;




/* - TODOS - 
- loadBoard Fehler beheben.
- renderBoard funktioniert noch garnicht.
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
    renderToDo(currentToDo);
    renderInProgress(currentInProgress);
    renderTesting(currentTesting);
    renderDone(currentDone);
}


function renderToDo(currentToDo) {
    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        type = 'toDo';
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, type);
    }
}

function renderInProgress(currentInProgress) {
    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        type = 'inProgress';
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
    }
}

function renderTesting(currentTesting) {
    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        type = 'testing';
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
    }
}

function renderDone(currentDone) {
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        type = 'done';
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
    }
}


function pushToOtherBoard(i) {
    let tasks = allToDos.find(t => t['createdAt'] == i);
    if (tasks['allToDos'] == 'toDo') {
        tasks['allToDos'] = 'inProgress'
    } else {
        if (tasks['allToDos'] == 'inProgress') {
            tasks['allToDos'] = 'testing'
        } else {
            if (tasks['allToDos'] == 'testing') {
                tasks['allToDos'] = 'done'
            }
        }
    }
    save();
}


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


function moveTo(i) {
    let task = allToDos.find(t => t.createdAt === currenDraggedElement);
    task['id'] = i;
    save();
}