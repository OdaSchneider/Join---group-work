function renderBoarders() {
    return /*html*/ `
        <div class="boardBlocks">
            <div class="titleAndDescription">
                <h3 title="Titel">${title}TEST</h3>
                <span title="Beschreibung">${description}TEST</span>
            </div>
            <div class="datenArrangement">
                <span title="Erstellungs Datum">${date}TESTDES</span>
                <span title="Kategorie">${category}</span>
                <img title="Profielbild"src="img/user-guest.ico">
            </div>
        </div>
        `;
}