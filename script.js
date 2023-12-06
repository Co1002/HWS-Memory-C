// Variablen
var vorrat = [{id: 1,image: 'B-1.png'},
{id: 2, image: 'B-2.png'},
{id: 3, image: 'B-3.png'},
{id: 4, image: 'B-4.png'},
{id: 5, image: 'B-5.png'},
{id: 6, image: 'B-6.png'},
{id: 7, image: 'B-7.png'},
{id: 8, image: 'B-8.png'}];

var karten = [];
var lastElement = null;
var disabled = true;
var finished = false;

function html2element(text){
    let template = document.createElement('template');
    template.innerHTML = text;
    return template.content.firstChild;
}

function shuffle(array){
    let finalArray = array;
    for (let index = 0; index < array.length; index++) {
        let randomIndex = Math.floor(Math.random() * (array.length - 1));
        let temp = array[index];
        array[index] = finalArray[randomIndex];
        finalArray[randomIndex] = temp;
    }
    return finalArray;
}

function createGame(){
    resetGame();
    let i = 0;
    for (let index = 0; index < vorrat.length*2; index++) {
        if(i == vorrat.length){
            i = 0;
        }
        karten[index] = vorrat[i];
        i++;
    }
    let imageGroup = Math.floor(Math.random() * 5);
    karten = shuffle(karten);
    karten.forEach((value) => {
        // HTML der Karte
        let cardHtml = '<div class="card-container"><div class="inner" data-id="'+ value.id +'" onclick="flipCard(this)"><div class="card-front"></div><div class="card-back" style="background-image: url(\'/images/'+imageGroup+'/'+value.image+'\')"></div></div></div>';
        // Aus HTML ein Element erstellen
        let cardElement = html2element(cardHtml);
        // Karte in die Matrix schreiben
        matrix.appendChild(cardElement);
    });
    disabled = false;
    console.log("New match created!");
}

createGame();

async function flipCard(element){
    // Prüfen, dass Karte wirklich nicht umgedreht ist
    if(element.classList.contains("flip") == false && disabled == false){
        disabled = true;
        element.classList.add("flip");
        addFlip();
        if(lastElement == null){
            // Erste Zug-Aktion
            lastElement = element;
        }else{
            // Zweite Zug-Aktion
            if(element.dataset.id == lastElement.dataset.id){
                // Selbes Bild
                element.lastChild.classList.add("solved");
                lastElement.lastChild.classList.add("solved");
                if(addSuccessTurn() == karten.length / 2){
                    // Alle Paare gefunden
                    document.getElementById('matrix').classList.add("solved");
                    finishGame();
                    finished = true;
                }
            }else{
                // Ungleiches Bild
                // 2 sekunden warten und zuückdrehen beider Karten
                await new Promise(resolve => setTimeout(resolve, 2000));
                unflip(element);
                unflip(lastElement);
            }
            lastElement = null;
        }
        if(finished == false){
            // Wenn Spiel nicht beendet, wird das Spiel wieder freigegeben
            disabled = false;
        }
    }
}

function unflip(element){
    element.classList.remove("flip");
}

function resetGame(){
    disabled = true;
    let matrix = document.getElementById('matrix');
    matrix.innerHTML = "";
    resetTurns();
    resetTimer();
    document.getElementById("matrix").classList.remove("solved");
    lastElement = null;
    disabled = false;
    finished = false;
}