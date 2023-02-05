const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');
var computerHand=[];


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

    else if (player=='Rock' && computer=='Paper') return `${lose} ${RP}`;
    else if (player=='Rock'&& computer=='Scissors') return `${win} ${RS}`;
    else if (player=='Paper' && computer=='Rock') return `${win} ${RP} `;
    else if (player=='Paper' && computer=='Scissors') return `${lose} ${PS}`;
    else if (player=='Scissors' && computer=='Rock') return `${lose} ${RS}`;
    else if (player=='Scissors' && computer=='Paper') return `${win} ${PS}`
    

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

//-----EVENTS-----
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    game.style.display='flex';
    generateComputerHand();

})

cards.forEach(element=>{
    element.addEventListener('click',()=>element.style.display='none');
    element.addEventListener('click',()=>alert(round(get_computer_choice(),element.classList[1])));
})

