function renderBoardersToDos(toDos) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${toDos['id']})" class="boardBlocks">
            <div class="titleAndDescription">
                <h3 title="Titel">${toDos[i]['title']}</h3>
                <span title="Beschreibung">${toDos[i]['description']}</span>
            </div>
            <div class="datenArrangement">
                <span title="Erstellungs Datum">${toDos[i]['date']}</span>
                <span title="Kategorie">${toDos[i]['category']}</span>
                <img title="Profielbild"src="img/user-guest.ico">
            </div>
        </div>
        `;
}

function renderBoardersInProgress(inProgress) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${inProgress['id']})" class="boardBlocks">
            <div class="titleAndDescription">
                <h3 title="Titel">${inProgress[i]['title']}</h3>
                <span title="Beschreibung">${inProgress[i]['description']}</span>
            </div>
            <div class="datenArrangement">
                <span title="Erstellungs Datum">${inProgress[i]['date']}</span>
                <span title="Kategorie">${inProgress[i]['category']}</span>
                <img title="Profielbild"src="img/user-guest.ico">
            </div>
        </div>
        `;
}

function renderBoardersTesting(testing) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${testing['id']})" class="boardBlocks">
            <div class="titleAndDescription">
                <h3 title="Titel">${testing[i]['title']}</h3>
                <span title="Beschreibung">${testing[i]['description']}</span>
            </div>
            <div class="datenArrangement">
                <span title="Erstellungs Datum">${testing[i]['date']}</span>
                <span title="Kategorie">${testing[i]['category']}</span>
                <img title="Profielbild"src="img/user-guest.ico">
            </div>
        </div>
        `;
}

function renderBoardersDone(done) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${done['id']})" class="boardBlocks">
            <div class="titleAndDescription">
                <h3 title="Titel">${done[i]['title']}</h3>
                <span title="Beschreibung">${done[i]['description']}</span>
            </div>
            <div class="datenArrangement">
                <span title="Erstellungs Datum">${done[i]['date']}</span>
                <span title="Kategorie">${done[i]['category']}</span>
                <img title="Profielbild"src="img/user-guest.ico">
            </div>
        </div>
        `;
}


// #####################################################################################################################################################################################


function backlogContainer(userimage, username, category, description) {
    return /*html*/ `
    <div class="backlog-container">
        <div class="backlog-user">
            <div>${userimage}</div>
            <div><span>${username}</span></div>
        </div>
        <div class="backlog-cat-description">
            <div>${category}</div>
            <div>${description}</div> 
        </div> 
    </div>            
    `;
}