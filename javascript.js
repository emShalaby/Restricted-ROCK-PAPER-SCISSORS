const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    game.style.display="flex";

})