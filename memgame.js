document.addEventListener('DOMContentLoaded', function(){

    const memCards = document.querySelectorAll('.mem-card');
    const winChime = new Audio('sfx/victory_sound.mp3')
    let lockBoard= false;
    let playerFlipped = false;
    let winCondition = 0;
    let card1, card2;

    for(let card of memCards){
        card.addEventListener('click',cardFlip);
    }
    function hasPlayerWon(){
        if(winCondition === 6){
            winChime.play();
            setTimeout(() => {
                alert('Player wins!');
                }, 2000)};
            };

    // refactor logic later
    function cardFlip(){
        if(lockBoard) 
        return;
        if(this === card1) 
        return;
        this.classList.add('flipped');

        if(!playerFlipped){
            playerFlipped = true;
            card1 = this;
        } else {
            playerFlipped = false;
            card2 = this;
            if(card1.dataset.icon === card2.dataset.icon){
                card1.removeEventListener('click', cardFlip);
                card2.removeEventListener('click', cardFlip);
                winCondition++;
                resetBoard();
            } else {
            lockBoard= true;
            setTimeout(()=> {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');

                resetBoard();
                }, 1000);
            }
    
        }
        hasPlayerWon();
    }

    function resetBoard(){
        playerFlipped = false;
        lockBoard= false;
        card1 = null;
        card2 = null;
    }

    /* Learned about this "immediately invoked" functions- so this card shuffle will happen as soon as the function is loaded */
    (function(){
        for(let card of memCards){
            let randomNum = Math.floor(Math.random()* 12);
            card.style.order = randomNum;
        };
    })();
});