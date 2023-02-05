const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');
const cardsContainer=document.querySelector('#cards')
const header=document.querySelector('.header');
const confirmBtn=document.querySelector('.play-card')
const body=document.querySelector('body')
const content=document.querySelector('.content')
let bodyStyles = window.getComputedStyle(body);
let bodyBackgroundColor = bodyStyles.getPropertyValue("background-color");
let yourScore=document.querySelector('#you')
let computerScore=document.querySelector('#computer')
var computerHand=[];
var currentCard={};
//----Functions---
function get_computer_choice(){
    let randomIndex = Math.floor(Math.random() * computerHand.length);
    let randomElement = computerHand[randomIndex];
    computerHand.splice(randomIndex, 1);
    return randomElement;
}

function round(computer,player){
    
    
    const RS='Rock beats scissors!';
    const RP='Paper beats rock!';
    const PS='Scissors beats paper!';
    const draw=`Draw! Both players picked ${player}`;
    const win='You win!';
    const lose='You lose!';
    
    if (player===computer) return draw;

    else if (player=='Rock' && computer=='Paper') {
        addScore(winner=computerScore,loser=yourScore)
        return `${lose} ${RP}`;}
    
        else if (player=='Rock'&& computer=='Scissors') {
            addScore(winner=yourScore,loser=computerScore)
            return `${win} ${RS}`;}
    
    else if (player=='Paper' && computer=='Rock') {
        addScore(winner=yourScore,loser=computerScore)
        return `${win} ${RP} `;
    }
    
    else if (player=='Paper' && computer=='Scissors') {
        addScore(winner=computerScore,loser=yourScore);
        return `${lose} ${PS}`;
    }
    
    else if (player=='Scissors' && computer=='Rock') {
        addScore(winner=computerScore,loser=yourScore)    
        return `${lose} ${RS}`;
    }
    else if (player=='Scissors' && computer=='Paper') {
        addScore(winner=yourScore,loser=computerScore);
        return `${win} ${PS}`
    }
    

}

function addScore(winner,loser){
    loser.removeChild(loser.children[0]);
    var img=document.createElement('img');
    img.src='./star.png'
    img.alt='star-icon'
    winner.appendChild(img);
}
function generateComputerHand(){
    
    computerHand=['Rock','Paper','Scissors','Rock','Paper',
    'Scissors','Rock','Paper','Scissors'];
    shuffleArray(computerHand);

}

//fisher-yates shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i >0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function checkScore(){
    console.log(computerScore.children.length,yourScore.children.length,cardsContainer.children.length)
    if (computerScore.children.length==6 || (cardsContainer.children.length==0 && computerScore.children.length>yourScore.children.length)) {
            gameOver(computerScore)
            return true;}
    
    else if (computerScore.children.length==6 ||(cardsContainer.children.length==0 && computerScore.children.length>yourScore.children)) {
            gameOver(computerScore)
            return true;
        }
    else if (cardsContainer.children.length==0) gameOver();
    
    
    
}
function gameOver(element){
    console.log('gameover');
    game.style.display='none';
}
function resetCards(){
    cards.forEach(element=>{
        element.style.border=''
        element.style.transform=''})
}
// function that makes cards to the right of card move to the right
function moveOtherCards(element){
    let currentElement=element;
    while(currentElement.nextElementSibling){
        currentElement=currentElement.nextElementSibling;
        currentElement.style.transform='translateX(4vw)'
    }
}


//----------EVENTS---------
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    header.style.display='none';
    content.style.display='none'
    game.style.display='flex';
    generateComputerHand();


})

cards.forEach(element=>{
    element.addEventListener('click',()=>{
        currentCard=element;
        resetCards()
        moveOtherCards(element)        
        element.style.transform='translateY(-2vw)'
        element.style.border='double .05vw blue'
    })

}
)

confirmBtn.addEventListener('click',()=>{
    if (currentCard=={}) return;
    round(get_computer_choice(),currentCard.classList[1]);
    currentCard.remove();
    checkScore();
})


