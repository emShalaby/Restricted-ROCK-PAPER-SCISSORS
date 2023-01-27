
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

