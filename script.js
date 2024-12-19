// Repository of 5 quotes with sources
const quotes = [
    { text: "Quote1", source: "Real-Test", islib: true },
    { text: "Quote2", source: "Fake-Test", islib: false },
    { text: "Quote3", source: "Real-Test", islib: true },
    { text: "Quote4", source: "Fake-Test", islib: false },
    { text: "Quote5", source: "Real-Test", islib: true }
];

// Variables for game tracking
let currentQuote = null;
let score = 0;
let remainingQuotes = [...quotes]; // Copy of quotes to track progress

// Function to start the game
function startGame() {
    document.getElementById("intro-page").style.display = "none";  // Hide intro
    document.getElementById("game-page").style.display = "block";  // Show game
    document.getElementById("game-over-page").style.display = "none";  // Hide game over page
    displayRandomQuote();
}

// Function to display a random quote
function displayRandomQuote() {
    if (remainingQuotes.length === 0) {
        // End game when all quotes are used
        endGame();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuotes.length);
    currentQuote = remainingQuotes.splice(randomIndex, 1)[0];  // Remove quote from pool
    const quoteElement = document.getElementById("main-quote");
    quoteElement.textContent = currentQuote.text;

    // Hide feedback and next button
    document.getElementById("feedback-container").style.display = "none";
    document.getElementById("quote-source").style.display = "none";
    document.getElementById("next-button").style.display = "none";

    // Update remaining quotes
    document.getElementById("remaining-quotes").textContent = `Remaining Quotes: ${remainingQuotes.length}`;
}

// Function to handle a vote
function handleVote(userChoice) {
    const feedbackContainer = document.getElementById("feedback-container");
    const feedbackMessage = document.getElementById("feedback-message");
    const quoteSource = document.getElementById("quote-source");
    const sourceText = document.getElementById("source-text");

    // Show feedback
    feedbackContainer.style.display = "block";

    if (userChoice === currentQuote.islib) {
        feedbackMessage.textContent = "Correct!";
        score++;  // Increment score
        sourceText.textContent = currentQuote.source;
        quoteSource.style.display = "block";
    } else {
        feedbackMessage.textContent = "Incorrect!";
    }

    // Update score display
    document.getElementById("score").textContent = `Score: ${score}`;

    // Show the "Next" button
    document.getElementById("next-button").style.display = "inline-block";
}

// Function to end the game and show the score page
function endGame() {
    // Hide game page
    document.getElementById("game-page").style.display = "none";

    // Show game over page with final score
    document.getElementById("game-over-page").style.display = "block";
    document.getElementById("final-score").textContent = `Your Score: ${score}`;

    // Reset score and quotes for retry
    score = 0;
    remainingQuotes = [...quotes];  // Reset the pool
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("remaining-quotes").textContent = `Remaining Quotes: ${remainingQuotes.length}`;
}

// Event listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("lib-button").addEventListener("click", () => handleVote(true));
document.getElementById("lie-button").addEventListener("click", () => handleVote(false));
document.getElementById("next-button").addEventListener("click", displayRandomQuote);

// Share score functionality (can be expanded)
document.getElementById("share-score-button").addEventListener("click", () => {
    alert("Score shared! (This feature can be expanded later.)");
});

// Try again functionality
document.getElementById("try-again-button").addEventListener("click", startGame);
