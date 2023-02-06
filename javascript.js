const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');
const cardsContainer=document.querySelector('#cards')
const header=document.querySelector('.header');
const confirmBtn=document.querySelector('.play-card');
const body=document.querySelector('body');
const content=document.querySelector('.content');
const cardPlaces=document.querySelectorAll('.card-place');
const errorMessage=document.querySelector('.error-message');
const cardMove=new Audio('./cardmove.mp3');
const displayImageP= document.querySelectorAll('.display-image-p');
const displayImageC= document.querySelectorAll('.display-image-c');

let yourScore=document.querySelector('#you');
let computerScore=document.querySelector('#computer');
let computerHand=[];
let currentCard={};
let computerCard={};
let winCounter=0;

//----Functions---
function get_computer_choice(){
    let randomIndex = Math.floor(Math.random() * computerHand.length);
    let randomElement = computerHand[randomIndex];
    computerHand.splice(randomIndex, 1);
    computerCard=randomElement;
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
    'Scissors','Rock','Paper','Scissors','Rock','Paper','Scissors'];
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
    if (computerScore.children.length==6 || (cardsContainer.children.length==0 && computerScore.children.length>yourScore.children.length)) {
            gameOver(computerScore)
            return true;}
    
    else if (yourScore.children.length==6 ||(cardsContainer.children.length==0 && computerScore.children.length<yourScore.children)) {
            gameOver(yourScore)
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

function resetField(){

    confirmBtn.style.display='inline-block';
    displayImageC.forEach(element=>element.style.display='none');
    displayImageP.forEach(element=>element.style.display='none');

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
    cardMove.play();

})

cards.forEach(element=>{
    element.addEventListener('click',()=>{
        currentCard=element;
        resetCards();
        moveOtherCards(element);        
        element.style.transform='translateY(-2vw)';
        element.style.border='double .05vw blue';

    }
    );

}
)
// this is some hot garbage dont even ask
confirmBtn.addEventListener('click',()=>{
    try{
        currentCard.classList.contains('card')
    } 
    catch{
        errorMessage.style.display='inline-block';
        setTimeout(()=>errorMessage.style.display='none',1000)
        return
    }
    cardsContainer.style.display='none';
    get_computer_choice();
    confirmBtn.style.display='none';
    cardPlaces.forEach(element=>element.style.display='flex');

    setTimeout(()=>cardPlaces.forEach(element=>element.style.display='none'),1000);
    console.log(currentCard);
    setTimeout(()=>displayImageP.forEach(element=> {
        if (element.classList.contains(`${currentCard.classList[1]}`)) element.style.display='flex'}),1050 );
        setTimeout(()=>displayImageC.forEach(element=> {
            if (element.classList.contains(`${computerCard}`)) element.style.display='flex'}),1050 );

    setTimeout(resetField,2000);
    setTimeout(()=>round(computerCard,currentCard.classList[1]),2000);
    currentCard.remove();
    setTimeout(checkScore,2000);
    setTimeout(()=>currentCard={},2050);
    setTimeout(()=>computerCard={},2050);
    setTimeout(()=>cardsContainer.style.display='flex',2000);
})





