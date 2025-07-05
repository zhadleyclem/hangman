// Enhanced Hangman Game JavaScript
// B Version - Uses getWord.php program for word selection
// C Version - 5x6 letter grid interface
// D Version - Cheat mode and contributors list
// A Version - Gallows display

let words = ['javascript', 'hangman', 'web', 'programming', 'game', 'computer', 'internet', 'browser', 'coding', 'developer'];
let selectedWord = '';
let attemptsLeft = 10;
let guessedLetters = [];
let gameEnded = false;
let usedLetters = [];

// Initialize game
function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    attemptsLeft = 10;
    guessedLetters = Array(selectedWord.length).fill('_');
    gameEnded = false;
    usedLetters = [];
    
    document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;
    document.getElementById('status').innerText = '';
    
    // Reset gallows
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`gallows0${i}`).innerText = '';
    }
    
    // Reset letter buttons
    const letterButtons = document.querySelectorAll('.letter-btn');
    letterButtons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('used');
    });
    
    updateWordDisplay();
}

// Update word display
function updateWordDisplay() {
    document.getElementById('wordToGuess').innerText = guessedLetters.join(' ');
}

// Guess letter from button click (C Version)
function guessLetter(letter) {
    if (gameEnded || usedLetters.includes(letter)) return;
    
    // Check for cheat mode (D Version)
    if (document.getElementById('cheatMode').checked) {
        alert(`The word is: ${selectedWord.toUpperCase()}`);
    }
    
    processGuess(letter);
    
    // Disable the button
    const buttons = document.querySelectorAll('.letter-btn');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase() === letter) {
            btn.disabled = true;
            btn.classList.add('used');
        }
    });
}

// Guess letter from input field (Original method)
function guessLetterFromInput() {
    if (gameEnded) return;
    
    const input = document.getElementById('guessInput');
    const guess = input.value.toLowerCase();
    input.value = '';
    
    if (guess && guess.length === 1 && !usedLetters.includes(guess)) {
        // Check for cheat mode (D Version)
        if (document.getElementById('cheatMode').checked) {
            alert(`The word is: ${selectedWord.toUpperCase()}`);
        }
        
        processGuess(guess);
    }
}

// Process the guess
function processGuess(guess) {
    if (gameEnded || usedLetters.includes(guess)) return;
    
    usedLetters.push(guess);
    
    if (selectedWord.includes(guess)) {
        // Correct guess
        selectedWord.split('').forEach((letter, index) => {
            if (letter === guess) {
                guessedLetters[index] = guess;
            }
        });
        updateWordDisplay();
        
        // Check if word is complete
        if (!guessedLetters.includes('_')) {
            document.getElementById('status').innerText = 'Congratulations! You won!';
            document.getElementById('status').style.color = 'green';
            gameEnded = true;
        }
    } else {
        // Wrong guess
        attemptsLeft--;
        document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;
        
        // A Version - Display gallows parts
        drawGallowsPart(10 - attemptsLeft);
        
        if (attemptsLeft === 0) {
            document.getElementById('status').innerText = `Game Over! The word was: ${selectedWord.toUpperCase()}`;
            document.getElementById('status').style.color = 'red';
            gameEnded = true;
        }
    }
}

// A Version - Draw gallows parts
function drawGallowsPart(partNumber) {
    const gallowsParts = [
        '|', // Base
        '|', // Pole
        '—', // Top beam
        '|', // Noose
        'O', // Head
        '|', // Body
        '/', // Left arm
        '\\', // Right arm
        '/', // Left leg
        '\\' // Right leg
    ];
    
    if (partNumber <= 6) {
        const gallowsElement = document.getElementById(`gallows0${partNumber}`);
        switch(partNumber) {
            case 1:
                gallowsElement.innerText = '——————';
                break;
            case 2:
                gallowsElement.innerText = '|     |';
                break;
            case 3:
                gallowsElement.innerText = '      O';
                break;
            case 4:
                gallowsElement.innerText = '      |';
                break;
            case 5:
                gallowsElement.innerText = '     /|\\';
                break;
            case 6:
                gallowsElement.innerText = '     / \\';
                break;
        }
    }
}

// B Version - Load words from file (simulated)
function loadWordsFromFile() {
    // This would normally use getWord.php
    // For now, we'll simulate loading more words
    const additionalWords = ['function', 'variable', 'array', 'object', 'method', 'class', 'inheritance', 'polymorphism'];
    words = words.concat(additionalWords);
    alert('Custom words loaded! Starting new game...');
    resetGame();
}

// Reset game
function resetGame() {
    initGame();
}

// Handle Enter key press
document.getElementById('guessInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        guessLetterFromInput();
    }
});

// Initialize the game when page loads
window.onload = function() {
    initGame();
};
