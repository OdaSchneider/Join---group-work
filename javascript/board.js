// ---------------------------Bord--------------------------------------------------------

// setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
let currentDraggedElement;




/* - TODOS - 
- loadBoard Fehler beheben.
- renderBoard funktioniert noch garnicht.
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
        let assignedUser = element['assignedUser'];
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'toDo'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function renderInProgress(currentInProgress) {
    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        type = 'inProgress';
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
        let assignedUser = element['assignedUser'];
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'inProgress'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function renderTesting(currentTesting) {
    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        type = 'testing';
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
        let assignedUser = element['assignedUser'];
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'testing'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function renderDone(currentDone) {
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        type = 'done';
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
        let assignedUser = element['assignedUser'];
        for (let j = 0; j < assignedUser.length; j++) {
            let employee = assignedUser[j];
            document.getElementById(`currentemployee${i}${'done'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}


function pushToOtherBoard(i) {
    let tasks = allToDos.find(t => t['createdAt'] == i);
    if (tasks['id'] == 'toDo') {
        tasks['id'] = 'inProgress'
    } else {
        if (tasks['id'] == 'inProgress') {
            tasks['id'] = 'testing'
        } else {
            if (tasks['id'] == 'testing') {
                tasks['id'] = 'done'
            }
        }
    }
    save();
}


function openTask(i, type) {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let tasks = allToDos.filter(t => t['id'] == type);
    if (tasks[i]['id'] == 'toDo') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
        document.getElementById('pushTo').innerHTML = 'Push to in Progress';
    }
    if (tasks[i]['id'] == 'inProgress') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
        document.getElementById('pushTo').innerHTML = 'Push to Testing';
    }
    if (tasks[i]['id'] == 'testing') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
        document.getElementById('pushTo').innerHTML = 'Push to in Done';
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