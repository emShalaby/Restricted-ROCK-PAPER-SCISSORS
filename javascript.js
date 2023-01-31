
function get_computer_choice(){
    const RPS =["Rock", "Paper" , "Scissors"];
    const random=Math.floor(Math.random() * RPS.length);
    return RPS[random];
}



function round(computerChoice,playerChoice){

    playerChoice=playerChoice.toUpperCase();
    computerChoice=computerChoice.toUpperCase();

    const RS='Rock beats scissors!';
    const RP='Paper beats rock!';
    const PS='Scissors beats paper!';
    const draw=`Draw! Both players picked ${computerChoice}`;
    const win='You win!';
    const lose='You lose!';

    if (playerChoice===computerChoice) return draw;
    else if (playerChoice=='ROCK' && computerChoice=='PAPER') return `${lose} ${RP}`;
    else if (playerChoice=='ROCK'&& computerChoice=='SCISSORS') return `${win} ${RS}`;
    else if (playerChoice=='PAPER' && computerChoice=='ROCK') return `${win} ${RP} `;
    else if (playerChoice=='PAPER' && computerChoice=='SCISSORS') return `${lose} ${PS}`;
    else if (playerChoice=='SCISSORS' && computerChoice=='ROCK') return `${lose} ${RS}`;
    else if (playerChoice=='SCISSORS' && computerChoice=='PAPER') return `${win} ${PS}`;
    else return 'Error'

    
}


// function game(){
    
//     let wins=0;
//     let losses=0;
    
//     while (wins<5 && losses<5){
        
//         playerChoice=prompt('Enter your choice');
//         computerChoice=get_computer_choice()
//         result=round(computerChoice=computerChoice,playerChoice=playerChoice);
        
        
        
//         alert(result);
//         console.log('result');
//         if (result.search('lose')!=-1) losses++;
//         else if (result.search('win!')!=-1) wins++;
        
//         console.log('wins:'+wins+' losses:'+losses);
//     }
//     if (wins>losses) alert(`You win! the score is ${wins}:${losses}`);
//     else if (wins==losses) alert(`draw! the score is ${wins}:${losses}`);
//     else alert(`You lost! the score is ${wins}:${losses}`);
// }

// game()

const rockBtn=document.getElementById('rockBtn');
const paperBtn=document.getElementById('paperBtn');
const scissorsBtn=document.getElementById('scissorsBtn');
const yourScore=document.getElementById('your-score');
const enemyScore=document.getElementById('enemy-score');
const mainContent=document.getElementById('main-content');
const winGameMsg=document.getElementById('win-game-msg');
const loseGameMsg=document.getElementById('lose-game-msg');
const playAgainWin=document.getElementById('play-again-win');
const playAgainLose=document.getElementById('play-again-lose');
const yourImg=document.getElementById('your-img');
const enemyImg=document.getElementById('enemy-img');

rockBtn.addEventListener('click',()=>updateScore(computerChoice=get_computer_choice(),playerChoice='ROCK'));
paperBtn.addEventListener('click',()=>updateScore(computerChoice=get_computer_choice(),playerChoice='PAPER'));
scissorsBtn.addEventListener('click',()=>updateScore(computerChoice=get_computer_choice(),playerChoice='SCISSORS'));
playAgainWin.addEventListener('click',restart);
playAgainLose.addEventListener('click',restart);



function restart(){
    
    mainContent.style.display='block';
    winGameMsg.style.display='none';
    loseGameMsg.style.display='none';
    yourScore.innerHTML=0;
    enemyScore.innerHTML=0;
    
    
}




function updateScore(computerChoice,playerChoice){
    PC=computerChoice
    P1=playerChoice
    roundResult=round(PC,P1);
    if (roundResult.includes('win')) yourScore.innerHTML=Number(yourScore.innerHTML)+1;
    if (roundResult.includes('lose')) enemyScore.innerHTML=Number(enemyScore.innerHTML)+1;
    showIcon(PC,P1);
    isGameOver(you=yourScore.innerHTML,enemy=enemyScore.innerHTML)
    
}

function showIcon(computerChoice,playerChoice){
    if (computerChoice.toLowerCase()=='scissors') enemyImg.src='./scissors-icon.png';
    else if (computerChoice.toLowerCase()=='rock') enemyImg.src='./rock-icon.png';
    else if (computerChoice.toLowerCase()=='paper') enemyImg.src='./paper-icon.png';
    
    if (playerChoice.toLowerCase()=='paper') yourImg.src='./paper-icon.png';
    if (playerChoice.toLowerCase()=='rock') yourImg.src='./rock-icon.png';
    if (playerChoice.toLowerCase()=='scissors') yourImg.src='./scissors-icon.png';

    return;
}


function isGameOver(you,enemy){
    
    if (you==5){
        endMessage(result='win');
        return;
        
    }
    
    else if (enemy==5){
        endMessage(result='lose');
        return;
        
    }
    else return;

}

function endMessage(result){
    mainContent.style.display='none';
    if (result=='win'){
        winGameMsg.style.display='flex';
        return;
    }
    if (result=='lose'){
        loseGameMsg.style.display='flex';
        return;
    }
    return;
}