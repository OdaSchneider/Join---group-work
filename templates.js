function renderBoarders(i) {
    return /*html*/ `
        <div class="boardBlocks">
            <div class="titleAndDescription">
                <h3 title="Titel">${allToDos[i]['title']}</h3>
                <span title="Beschreibung">${allToDos[i]['description']}</span>
            </div>
            <div class="datenArrangement">
                <span title="Erstellungs Datum">${allToDos[i]['date']}</span>
                <span title="Kategorie">${allToDos[i]['category']}</span>
                <img title="Profielbild"src="img/user-guest.ico">
            </div>
        </div>
        `;
}


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