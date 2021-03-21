'use strict';

// elements

const scoreOneElem = document.getElementById('score--0');
const scoreTwoElem = document.getElementById('score--1');
const currentScoreOne = document.getElementById('current--0')
const currentScoreTwo = document.getElementById('current--1')
const diceElem = document.querySelector('.dice');
const diceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('img');
const player = document.querySelectorAll('.player');



// Initial Conditions

scoreOneElem.textContent = 0;
scoreTwoElem.textContent = 0;
diceElem.classList.add('hidden');

let currentScore = 0;  //initial score to be 0
let activePlayer = 0;  //player 1 to be active
let scores = [0, 0]; //final scores of players
let game = 1; //to enable buttons for playing

//functions

function togglePlayer() {
    player.forEach(player => {
        player.classList.toggle('player--active');
    })
}

function holdScore(playerNum) {
    scores[playerNum] += currentScore;
    document.getElementById(`score--${playerNum}`).textContent = scores[playerNum];
}

function winner(playerNum) {
    player[playerNum].classList.add('player--winner');
    game = 0;
    diceElem.classList.add('hidden');
}

function curScore(actPlr, scr) {
    document.getElementById(`current--${actPlr}`).textContent = scr;
}

// dice Roll Button

diceBtn.addEventListener('click', function () {
    if (game === 1) {
        diceElem.classList.remove('hidden');
        const randDice = Math.trunc(Math.random() * 6) + 1;
        diceImg.src = `./images/dice-${randDice}.png`;
        if (randDice !== 1) {
            currentScore += randDice;
            curScore(activePlayer, currentScore);
        } else {
            curScore(activePlayer, 0);
            activePlayer = activePlayer === 0 ? 1 : 0;
            currentScore = 0
            togglePlayer();
        }
    }
});



// hold Button

holdBtn.addEventListener('click', function () {
    if (game === 1) {
        curScore(activePlayer, 0);
        if (activePlayer === 0) holdScore(0);
        else holdScore(1);
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        togglePlayer();
    }
    if (scores[0] >= 100) winner(0);
    else if (scores[1] >= 100) winner(1);
});

//New Game Button

newGameBtn.addEventListener('click', function () {
    scoreOneElem.textContent = 0;
    scoreTwoElem.textContent = 0;
    diceElem.classList.add('hidden');
    player[0].classList.remove('player--winner');
    player[1].classList.remove('player--winner');
    game = 1;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    currentScoreOne.textContent = 0;
    currentScoreTwo.textContent = 0;
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

})

