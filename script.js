var vorrat = [{image: '1', turned: false},{image: '2', turned: false},{image: '3', turned: false},{image: '4', turned: false},{image: '5', turned: false},{image: '6', turned: false},{image: '7', turned: false},{image: '8', turned: false}];
var turnsTotal = 0;

function html2element(text){
    let template = document.createElement('template');
    template.innerHTML = text;
    return template.content.firstChild;
}

function createGame(){
    vorrat = [{image: '1', turned: false},{image: '2', turned: false},{image: '3', turned: false},{image: '4', turned: false}];
    turnsTotal = 0;
    let karten = [...vorrat, ...vorrat];
    let matrix = document.getElementById('matrix');
    karten.forEach((value, index) => {
        // HTML der Karte
        let cardHtml = '<div class="card"><div class="card-front">'+value.image+'</div><div class="card-back"></div></div>';
        // Aus HTML ein Element erstellen
        let cardElement = html2element(cardHtml);
        // Karte in die Matrix schreiben
        matrix.appendChild(cardElement);
    });
}

createGame();
