const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');
const cardsContainer=document.querySelector('#cards')
const header=document.querySelector('.header');
const confirmBtn=document.querySelector('.play-card');
const content=document.querySelector('.content');
const cardPlaces=document.querySelectorAll('.card-place');
const errorMessage=document.querySelector('.error-message');
const cardMove=new Audio('./cardmove.mp3');
const displayImageP= document.querySelectorAll('.display-image-p');
const displayImageC= document.querySelectorAll('.display-image-c');
const win=document.querySelector('.win-screen');
const lose=document.querySelector('.lose-screen');
const draw=document.querySelector('.draw-screen');
const restartBtn=document.querySelectorAll('.restart');
let yourScore=document.querySelector('#you');
let computerScore=document.querySelector('#computer');
let computerHand=[];
let currentCard={};
let computerCard={};
//----Functions---
// gets a random choice from 
function get_computer_choice(){
    let randomIndex = Math.floor(Math.random() * computerHand.length);
    let randomElement = computerHand[randomIndex];
    computerHand.splice(randomIndex, 1);
    computerCard=randomElement;
    return randomElement;
}
//function gets a result of the round
function round(computer,player){
    
    if (player===computer) return ;

    else if (player=='Rock' && computer=='Paper') {
        addScore(winner=computerScore,loser=yourScore);
    }
    else if (player=='Rock'&& computer=='Scissors') {
        addScore(winner=yourScore,loser=computerScore);
            }
    
    else if (player=='Paper' && computer=='Rock') {
        addScore(winner=yourScore,loser=computerScore);

    }
    
    else if (player=='Paper' && computer=='Scissors') {
        addScore(winner=computerScore,loser=yourScore);
    }
    
    else if (player=='Scissors' && computer=='Rock') {
        addScore(winner=computerScore,loser=yourScore)    
    }
    else if (player=='Scissors' && computer=='Paper') {
        addScore(winner=yourScore,loser=computerScore);
    }
    
}
// updates the score
function addScore(winner,loser){
    loser.removeChild(loser.children[0]);
    let img=document.createElement('img');
    img.src='./star.png'
    img.alt='star-icon'
    winner.appendChild(img);
}
// generates a computer hand of 12 cards
function generateComputerHand(){
    
    computerHand=['Rock','Paper','Scissors','Rock','Paper',
    'Scissors','Rock','Paper','Scissors','Rock','Paper','Scissors'];
    shuffleArray(computerHand);

}

//fisher-yates shuffle to shuffle the computer hand just for extra randomness
function shuffleArray(array) {
    for (let i = array.length - 1; i >0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
// checks how many stars
function checkScore(){
    if (computerScore.children.length==6 || (containerEmpty()==true &&computerScore.children.length>yourScore.children.length)) gameOver('computer');
    
    else if (yourScore.children.length==6 ||(containerEmpty()==true&& computerScore.children.length<yourScore.children.length)) {
            gameOver('player');
        }
    
    else if (containerEmpty==false && computerScore.children.length==yourScore.children.length) gameOver('draw');

}
//this function checks if player ran out of cards;
function containerEmpty(){
    let allHidden=true;
    for(i=0;i<cardsContainer.children.length;i++){
        const child=cardsContainer.children[i];
        if (child.style.display!=='none'){
            allHidden=false;
            return allHidden;
        }
    }
}
//if game is over displays the endscreen
function gameOver(winner){
    game.style.display='none';
    if(winner=='player') win.style.display='flex';
    else if(winner=='computer') lose.style.display='flex';
    else draw.style.display='flex';
    return ;

}
//if another card is clicked the previous card's border and movement is removed
function resetCards(){
    cards.forEach(element=>{
        element.style.border=''
        element.style.transform=''})
}
//after cards played animation this function resets the field
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
//this function resets everything after clicking restart button
function gameReset(){
    currentCard={};
    computerCard={}
    computerHand=[]
    resetField();
    cards.forEach(element=>element.style.display='flex');  

    yourScore.innerHTML='';
    computerScore.innerHTML='';
    //generating 3 stars for each player
    for(i=0;i<3;i++){
        let img=document.createElement('img');
        img.src='./star.png';
        img.alt='star-icon';
        yourScore.appendChild(img);
        let img2=document.createElement('img');
        img2.src='./star.png';
        img2.alt='star-icon';
        computerScore.appendChild(img2);
    }

}


//----------EVENTS---------
//after you click play switches scene to game-scene
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    header.style.display='none';
    content.style.display='none'
    game.style.display='flex';
    generateComputerHand();
    cardMove.play();

})
// when you click on a card it updates the currentCard and does all the animation
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

// this is some hot garbage, can be improved a lot .
confirmBtn.addEventListener('click',()=>{
    //displays error message if u click place card without selecting a card
    try{
        currentCard.classList.contains('card')
    } 
    catch{
        errorMessage.style.display='inline-block';
        setTimeout(()=>errorMessage.style.display='none',1000)
        return
    }
    get_computer_choice();
    
    cardsContainer.style.display='none';
    
    confirmBtn.style.display='none';
    
    //this displays the cover of the card for a second to mimic a flip effect
    cardPlaces.forEach(element=>element.style.display='flex');
    setTimeout(()=>cardPlaces.forEach(element=>element.style.display='none'),1000);
    
    //this displays the other side of the card
    setTimeout(()=>displayImageP.forEach(element=> {
        if (element.classList.contains(`${currentCard.classList[1]}`)) element.style.display='flex'}),1050 );
        setTimeout(()=>displayImageC.forEach(element=> {
        if (element.classList.contains(`${computerCard}`)) element.style.display='flex'}),1050 );
    //longer timeouts to make sure everything happens after the animation      
    setTimeout(resetField,2000);
    setTimeout(()=>round(computerCard,currentCard.classList[1]),2000);
    //hides the played card
    currentCard.style.display='none';
    
    setTimeout(checkScore,2000);
    setTimeout(()=>currentCard={},2050);
    setTimeout(()=>computerCard={},2050);
    setTimeout(()=>cardsContainer.style.display='flex',2000);
})


restartBtn.forEach(element=>{element.addEventListener('click',()=>{
    gameReset();
    win.style.display='none';
    lose.style.display='none';
    draw.style.display='none';
    header.style.display='none';
    content.style.display='none'
    game.style.display='flex';
    generateComputerHand();
    cardMove.play();
})})


