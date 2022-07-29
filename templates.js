function renderBoarders() {
    return /*html*/ `
        <div class="boardBlocks">
            <div class="titleAndDescription">
                <h3 title="Titel">${allToDos['title']}</h3>
                <span title="Beschreibung">${allToDos['description']}</span>
            </div>
            <div class="datenArrangement">
                <span title="Erstellungs Datum">${allToDos['date']}</span>
                <span title="Kategorie">${allToDos['category']}</span>
                <img title="Profielbild"src="img/user-guest.ico">
            </div>
        </div>
        `;
}