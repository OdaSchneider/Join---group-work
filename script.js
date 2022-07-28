let allTasks = [];


async function init() {
    await includeHTML();
    setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
    loadLocalStorage();
}

async function initBacklog() {
    await init();
    renderBacklog();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function addTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let urgency = document.getElementById('urgency').value;
    let description = document.getElementById('description').value;

    taskArray(title, date, category, urgency, description);
}


function taskArray(title, date, category, urgency, description) {
    let task = {
        'title': title,
        'dueDate': date,
        'category': category,
        'urgency': urgency,
        'description': description,
        'createdAt': new Date().getTime()
    };

    allTasks.push(task);
    safeLocalStorage();
    renderBacklog();
}


function renderBacklog() {
    let history = document.getElementById('backlog-container');

    for (let i = 0; i < allTasks.length; i++) {
        category = allTasks[i]['category'];
        description = allTasks[i]['description'];

        history.innerHTML += /*html*/ `
        <div class="backlog-container">
            <div>${category}</div>
            <div>${description}</div>  
        </div>            
        `;
    }
}


function safeLocalStorage() {
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}


function loadLocalStorage() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}


// ################################ - Board - ##########################################

// function renderBoard() {

//     let toDo = document.getElementById('toDo');
//     toDo.innerHTML = '';

//     for (let i = 0; i < allTodos.length; i++) {
//         const todo = allTodos[i];

//         toDo.innerHTML = /*html*/ `
//         <div class="boardBlocks">
//             <div class="titleAndDescription">
//                 <h3 title="Titel">test</h3>
//                 <span title="Beschreibung">tdwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaest</span>
//             </div>
//             <div class="datenArrangement">
//                 <span title="Erstellungs Datum">01.12.2001</span>
//                 <span title="Kategorie">Developer</span>
//                 <img title="Profielbild"src="img/user-guest.ico">
//             </div>
//         </div>
//         `;
//     }
// }

// function renderBoard(todo) {

//     let todo = document.getElementById('toDo');
//     todo.innerHTML = '';
//     for (let i = 0; i < allTasks.length; i++) {
//         const element = allTasks[i];
//         todo.innerHTML = renderBoarders();
//     }
// }