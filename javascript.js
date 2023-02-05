const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');


//----Functions---
function get_computer_choice(){
    const RPS=['Rock','Paper','Scissors']
    const random=Math.floor(Math.random() * RPS.length);
    return RPS[random];
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

//-----EVENTS-----
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    game.style.display='flex'
})

cards.forEach(element=>{
    element.addEventListener('click',()=>element.style.display='none');
    element.addEventListener('click',()=>alert(round(get_computer_choice(),element.classList[1])));
})