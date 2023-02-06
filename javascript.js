const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');
const cardsContainer=document.querySelector('#cards')
const header=document.querySelector('.header');
const confirmBtn=document.querySelector('.play-card');
const body=document.querySelector('body');
const content=document.querySelector('.content');
const blanks=document.querySelectorAll('.blank');
const cardPlaces=document.querySelectorAll('.card-place');
const errorMessage=document.querySelector('.error-message');
const cardSound=new Audio('./cardset.mp3');
const cardMove=new Audio('./cardmove.mp3');
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
    blanks[0].innerHTML='';
    blanks[1].innerHTML='';
    blanks[0].style.display='flex';
    blanks[1].style.display='flex';
    confirmBtn.style.display='inline-block'
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
    cardSound.play();
    cardsContainer.style.display='none';
    get_computer_choice();
    confirmBtn.style.display='none';
    blanks.forEach(element=>element.style.display='none');
    cardPlaces.forEach(element=>element.style.display='flex');
    setTimeout(()=>{
    cardPlaces[0].style.display='none';
    cardPlaces[1].style.display='none';

    blanks[0].style.display='flex';
    blanks[0].innerHTML=`<img src='${computerCard}.png'alt="${computerCard}">`
    blanks[1].style.display='flex';
    blanks[1].innerHTML=`<img src='${currentCard.classList[1]}.png' alt="${currentCard.classList[1]}"> `},1000)
    setTimeout(resetField,2000);
    round(computerCard,currentCard.classList[1]);
    currentCard.remove();
    setTimeout(checkScore,2000);
    setTimeout(()=>currentCard={},2050);
    setTimeout(()=>computerCard={},2050);
    setTimeout(()=>cardsContainer.style.display='flex',2050);
})



