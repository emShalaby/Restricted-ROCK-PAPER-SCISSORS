const playBtn=document.querySelector('.play');
const game=document.querySelector('.game');
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) =>{
  card.style.zIndex = index;
});
playBtn.addEventListener('click',()=>{
    playBtn.style.display='none';
    game.style.display="flex";

})