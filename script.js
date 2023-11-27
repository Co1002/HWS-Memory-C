var vorrat = [{image: 'B-1.png', turned: false},
{image: 'B-2.png', turned: false},
{image: 'B-3.png', turned: false},
{image: 'B-4.png', turned: false},
{image: 'B-5.png', turned: false},
{image: 'B-6.png', turned: false},
{image: 'B-7.png', turned: false},
{image: 'B-8.png', turned: false}];
var turnsTotal = 0;

function html2element(text){
    let template = document.createElement('template');
    template.innerHTML = text;
    return template.content.firstChild;
}

function createGame(){
    let matrix = document.getElementById('matrix');
    turnsTotal = 0;
    matrix.innerHTML = "";
    let karten = [...vorrat, ...vorrat];
    karten.forEach((value, index) => {
        // HTML der Karte
        let cardHtml = '<div class="card ratio ratio-1x1"><div class="card-front" style="background-image: url(\'/images/'+value.image+'\')">'+index+'</div><div class="card-back"></div></div>';
        // Aus HTML ein Element erstellen
        let cardElement = html2element(cardHtml);
        // Karte in die Matrix schreiben
        matrix.appendChild(cardElement);
    });
    console.log("New match created!");
}

createGame();