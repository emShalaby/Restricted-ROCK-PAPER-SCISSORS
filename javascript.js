const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');

// function that gets a randomchoice
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    game.style.display='flex'
})