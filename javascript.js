const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');


//----Functions---
function get_computer_choice(){
    const RPS=['Rock','Paper','SCISSORS']
    const random=Math.floor(Math.random() * RPS.length);
    return RPS[random];
}


//-----EVENTS-----
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    game.style.display='flex'
})
