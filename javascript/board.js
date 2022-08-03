// ---------------------------Bord--------------------------------------------------------

// setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
let currentDraggedElement;




/* - TODOS - 
- loadBoard Fehler beheben.
- Drag and Drop muss noch getestet werden.
*/




async function loadBoard() {
    // await downloadFromServer();
    // allToDos = JSON.parse(backend.getItem('allToDos')) || [];
    loadLocalStorage();
    renderBoard();
}


async function save() {
    // await backend.setItem('allToDos', JSON.stringify(allToDos));
    safeLocalStorage();
    loadBoard();
}


function renderBoard() {
    renderToDo();
    renderInProgress();
    renderTesting();
    renderDone();
}


function renderToDo() {
    let currentToDo = allToDos.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        type = 'toDo';  //wozu brauchen wir das?? 
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'toDo'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function renderInProgress() {
    let currentInProgress = allToDos.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        type = 'inProgress';
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'inProgress'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function renderTesting() {
    let currentTesting = allToDos.filter(t => t['status'] == 'testing');
    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        type = 'testing';
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'testing'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function renderDone() {
    let currentDone = allToDos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        type = 'done';
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'done'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}


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
    allToDos[currentDraggedElement]['status'] = status;
    save();
}