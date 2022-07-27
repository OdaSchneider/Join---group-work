let allTasks = [];


async function init() {
    await includeHTML();
    setURL('http://gruppe-287.developerakademie.net/smallest_backend_ever');
    loadLocalStorage();
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
    addToBacklog(category, description);

}


function taskArray(title, date, category, urgency, description) {
    let task = {
        'title': title,
        'createdAt': date,
        'category': category,
        'urgency': urgency,
        'description': description
    };
    safeLocalStorage(task);
}

// Funktioniert noch nicht #################################################

function addToBacklog(category, description) {
    let history = document.getElementById('backlog-container');
    for (let i = 0; i < allTasks.length; i++) {
        category = allTasks[i]['category'][i];
        description = allTasks[i]['description'];
        history.innerHTML += /*html*/ `
        <div class="backlog-container">
            <div>${category}</div>
            <div>${description}</div>  
        </div>            
        `;
    }
}

// ##########################################################################

function safeLocalStorage(task) {
    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}


function loadLocalStorage() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}


