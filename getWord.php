<?php
// getWord.php - B Version requirement
// This program selects a random word for the hangman game
// Modified so that the file of words cannot be loaded by the user

// Set content type to JSON
header('Content-Type: application/json');

// Internal word list (user cannot access this file directly)
$words = array(
    'javascript',
    'hangman',
    'web',
    'programming',
    'game',
    'computer',
    'internet',
    'browser',
    'coding',
    'developer',
    'function',
    'variable',
    'array',
    'object',
    'method',
    'class',
    'inheritance',
    'polymorphism',
    'algorithm',
    'database',
    'framework',
    'library',
    'debugging',
    'testing',
    'deployment',
    'responsive',
    'frontend',
    'backend',
    'fullstack',
    'repository'
);

// B Version - Create a larger word file for the game
// This prevents users from easily accessing the word list
$larger_words = array(
    'extraordinary',
    'revolutionary',
    'unprecedented',
    'sophisticated',
    'comprehensive',
    'intermediate',
    'professional',
    'international',
    'technological',
    'functionality',
    'development',
    'implementation',
    'specification',
    'documentation',
    'configuration',
    'optimization',
    'authentication',
    'authorization',
    'synchronization',
    'compatibility'
);

// Combine word lists
$all_words = array_merge($words, $larger_words);

// Select a random word
$selected_word = $all_words[array_rand($all_words)];

// Return JSON response
$response = array(
    'word' => strtolower($selected_word),
    'length' => strlen($selected_word),
    'difficulty' => strlen($selected_word) > 10 ? 'hard' : (strlen($selected_word) > 7 ? 'medium' : 'easy')
);

echo json_encode($response);
?>
