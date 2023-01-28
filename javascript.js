
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


function game(){
    
    let wins=0;
    let losses=0;
    
    while (wins<5 && losses<5){
        
        playerChoice=prompt('Enter your choice');
        computerChoice=get_computer_choice()
        result=round(computerChoice=computerChoice,playerChoice=playerChoice);
        
        
        
        alert(result);
        console.log('result');
        if (result.search('lose')!=-1) losses++;
        else if (result.search('win!')!=-1) wins++;
        
        console.log('wins:'+wins+' losses:'+losses);
    }
    if (wins>losses) alert(`You win! the score is ${wins}:${losses}`);
    else if (wins==losses) alert(`draw! the score is ${wins}:${losses}`);
    else alert(`You lost! the score is ${wins}:${losses}`);
}

game()