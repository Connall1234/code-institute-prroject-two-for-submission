//This is to fix warnings in jshint
/* jshint esversion: 6 */
//This is to fix a varibale warning in jshint 
let playerName = "";
//Below is for the elements to be hidden when the game starts
const gameBoard = document.getElementById('game_board_cont_id'); // Get the game board element
const scoreCounter = document.getElementById('score_counter_cont_id'); // Get the score counter container
const resetButtonContainer = document.getElementById('reset_button_container'); // Get reset button 
const updatingPlayerD = document.getElementById('updating_player'); // Get update player 

//This is our function to get the players name
function getPlayerName() {
    const nameInput = document.getElementById('playerNameInput');
    const submitButton = document.getElementById('submitName');
    const errorMessage = document.getElementById('errorMessage');
    const nameBox = document.getElementById('nameBox');
    const picknameContainer = document.getElementById('pickname_container');


    submitButton.addEventListener('click', function () {
        let name = nameInput.value.trim();
        const regex = /^[a-zA-Z]+$/; // This will make sure the user only enters a-z
        if (name.length !== 3) {
            //This will not let the person enter more or less than three letters
            errorMessage.style.display = 'block';
        }
            //This will not let the person enter more or less than three letters

        else if (!regex.test(name)) {
            errorMessage.style.display = 'block';
        }
        else {
            playerName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            let nameElement = document.getElementById('your_score');
            nameElement.textContent = playerName + "'s score: 0";
            // This will make sure the error does not load again
            errorMessage.style.display = 'none';
            // This will clear the nameBox
            nameInput.value = '';
            // This will hide the nameBox
            nameBox.style.display = 'none';
            // This will hide the whole box 
            picknameContainer.remove();
            gameBoard.style.visibility = 'visible'; // Show the game board
            scoreCounter.style.visibility = 'visible'; // Show the score counter container
            resetButtonContainer.style.visibility = 'visible'; // Show the reset button container
            updatingPlayerD.style.visibility = 'visible'; // Show the update player

        }
    });
}

// This will let us call the function when the page loads 
window.onload = function () {
    getPlayerName();
    gameBoard.style.visibility = 'hidden'; // Hide the game board
    scoreCounter.style.visibility = 'hidden'; // Hide the score counter container
    resetButtonContainer.style.visibility = 'hidden'; // Hide the reset button container
    updatingPlayerD.style.visibility = 'hidden'; // Hide the update player
};

const choiceButtons = document.querySelectorAll('[data-selection]');
//This will set the players score to zero so we can show the scores 
let playerScore = 0;
let compScore = 0;
//This will add event listeners to the choices 
choiceButtons.forEach(choiceButton => {
    choiceButton.addEventListener('click', e => {
        const choicePicked = choiceButton.dataset.selection;
        makePick(choicePicked);
    });
});
//This will log who won
function makePick(selection) {
    const computerSelection = randomPick();
    const winner = checkWinner(selection, computerSelection);
    updateHandEmoji('player_hand_img_id', selection); // This updates the main emoji 
    updateHandEmoji('comp_hand_img_id', computerSelection); // This updates the main emoji 
    console.log("Player's choice:", selection);
    console.log("Computer's choice:", computerSelection);
    console.log('Winner:', winner);
    return winner;
}
//This updates the main emoji 
function updateHandEmoji(elementId, selection) {
    let element = document.getElementById(elementId);
    let emoji = '';
    switch (selection) {
        case 'rock':
            emoji = '👊';
            break;
        case 'paper':
            emoji = '✋';
            break;
        case 'scissor':
            emoji = '✌️';
            break;
        case 'lizard':
            emoji = '🦎';
            break;
        case 'spock':
            emoji = '🖖';
            break;
        default:
            emoji = '❓';
            break;
    }
    element.textContent = emoji;
}
//This gives us a function to get random picks 
function randomPick() {
    const options = ['rock', 'paper', 'scissor', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
//This will check the winner 
function checkWinner(playerSelection, computerSelection) {
    let element = document.getElementById('updating_player');
    //The if statements will let us know who won 
    if (playerSelection === computerSelection) {
        document.getElementById('player_hand_img_id').innerHTML = playerSelection;
        document.getElementById('comp_hand_img_id').innerHTML = computerSelection;

        element.innerHTML = "You chose " + playerSelection + " and the computer chose " + computerSelection + " , it's a tie!";

        return "It's a tie!";
    } else if (
        (playerSelection === 'rock' && (computerSelection === 'scissor' || computerSelection === 'lizard')) ||
        (playerSelection === 'paper' && (computerSelection === 'rock' || computerSelection === 'spock')) ||
        (playerSelection === 'scissor' && (computerSelection === 'paper' || computerSelection === 'lizard')) ||
        (playerSelection === 'lizard' && (computerSelection === 'spock' || computerSelection === 'paper')) ||
        (playerSelection === 'spock' && (computerSelection === 'scissor' || computerSelection === 'rock'))
    ) {
        playerScore += 1;
        console.log(playerScore);
        //This will update player score and above will add to the score 
        let yourScoreElement = document.getElementById('your_score');
        yourScoreElement.textContent = playerName + "'s score: " + playerScore;

        document.getElementById('player_hand_img_id').innerHTML = playerSelection;
        document.getElementById('comp_hand_img_id').innerHTML = computerSelection;

        element.innerHTML = "You chose " + playerSelection + " and the computer chose " + computerSelection + " , you win!";

        return 'Player wins!';
    } else {
        compScore += 1;
        console.log(compScore);
        let compScoreElement = document.getElementById('comps_score');
        compScoreElement.textContent = "Computer score: " + compScore;
        //This will update computer score and will add to the score 
        document.getElementById('player_hand_img_id').innerHTML = playerSelection;
        document.getElementById('comp_hand_img_id').innerHTML = computerSelection;
        //This will update the player update 
        element.innerHTML = `You chose ${playerSelection} and the computer chose ${computerSelection} , computer wins!`;

        return 'Computer wins!';
    }
}

//This is for the reset button 
const resetButton = document.getElementById('reset');

// ETis adds click function to the reset button 
resetButton.addEventListener('click', function () {
    // This resets scores 
    playerScore = 0;
    compScore = 0;

    // This resets the view to zero scores 
    updateScore();
});

// This is to update scores on scree, and reset the game 
function updateScore() {
    // Update the displayed scores, assuming you have elements with IDs "your_score" and "computer_score"
    document.getElementById('your_score').textContent = playerName + "'s score: " + playerScore;
    document.getElementById('comps_score').textContent = "Computer score: " + compScore;
    document.getElementById('updating_player').textContent = "Scores reset, pick a hand!";
    document.getElementById('player_hand_img_id').textContent = "❓";
    document.getElementById('comp_hand_img_id').textContent = "❓";
}