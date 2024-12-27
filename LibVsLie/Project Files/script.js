// Repository of quotes with sources
const quotes = [
    { text: "TrueTest 1", source: "https://signsjournal.org", istrue: true, fellforit: false, baited: " " },
    { text: "FalseTest 1", source: "https://google.com", istrue: false, fellforit: false, baited: " " },
    { text: "FalseTest 2", source: "https://facebook.com", istrue: false, fellforit: true, baited: "The Sun" },
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
    document.getElementById("game-over-page2").style.display = "none";  // Hide game end screen 2
    document.getElementById("game-over-page3").style.display = "none";  // Hide game end screen 3
    document.getElementById("score").textContent = `Score: ${score}`;
    displayRandomQuote();
}

// Function to handle a vote
function handleVote(userChoice) {
    const feedbackContainer = document.getElementById("feedback-container");
    const feedbackMessage = document.getElementById("feedback-message");
    const quoteSource = document.getElementById("source-button");
    const nextButton = document.getElementById("next-button");
    const sourceContainer = document.getElementById("source-container");
    const nextContainer = document.getElementById("next-container");

    // Show feedback
    feedbackContainer.style.display = "block";

    if (userChoice === currentQuote.istrue) {
        feedbackMessage.textContent = "Correct!";
        score++;  // Increment score

        // Show the source button if the quote is true
        quoteSource.style.display = "inline-block";
        quoteSource.onclick = () => window.open(currentQuote.source, '_blank');

        // Update score display immediately
        document.getElementById("score").textContent = `Score: ${score}`;

        // Show the "Next" button
        nextButton.style.display = "inline-block";
        nextContainer.style.display = "block";

        // Show the container for source button
        sourceContainer.style.display = "block";
    } else {
        feedbackMessage.textContent = "Incorrect!";
        if (!currentQuote.istrue && currentQuote.fellforit) {
            endGameScreen2(); // Direct to game end screen 2 if the answer is incorrect and fellforit is true
        } else if (currentQuote.istrue) {
            endGameScreen3(); // Direct to game end screen 3 if the answer is incorrect and istrue is true
        } else {
            endGame(); // End game if the answer is incorrect
        }
    }

    // Hide the "Real" and "Fake" buttons
    document.getElementById("lib-button").style.display = "none";
    document.getElementById("lie-button").style.display = "none";
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

    // Show the "Real" and "Fake" buttons
    document.getElementById("lib-button").style.display = "inline-block";
    document.getElementById("lie-button").style.display = "inline-block";

    // Hide feedback, next button, and source button
    document.getElementById("feedback-container").style.display = "none";
    document.getElementById("source-button").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("source-container").style.display = "none";
    document.getElementById("next-container").style.display = "none";

    // Update remaining quotes
    document.getElementById("remaining-quotes").textContent = `Remaining Quotes: ${remainingQuotes.length}`;
}

// Function to end the game and show the score page
function endGame() {
    // Hide game page
    document.getElementById("game-page").style.display = "none";

    // Show game over page with final score
    document.getElementById("game-over-page").style.display = "block";
    document.getElementById("final-score").textContent = `Your Score: ${score}`;

    // Hide the source button
    document.getElementById("source-button").style.display = "none";

    // If the current quote is true, show the source button
    if (currentQuote.istrue) {
        const sourceText = document.getElementById("game-over-source-text");
        sourceText.innerHTML = `<button onclick="window.open('${currentQuote.source}', '_blank')">Go to Source</button>`;
        document.getElementById("game-over-quote-source").style.display = "block";
    } else {
        // Handle the case where istrue: false and fellforit: false
        document.getElementById("game-over-quote-source").style.display = "none";
    }

    // Reset score and quotes for retry
    score = 0;
    remainingQuotes = [...quotes];  // Reset the pool
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("remaining-quotes").textContent = `Remaining Quotes: ${remainingQuotes.length}`;
}

// Function to end the game and show the secondary game end screen
function endGameScreen2() {
    // Hide game page
    document.getElementById("game-page").style.display = "none";

    // Show game end screen 2 with final score
    document.getElementById("game-over-page2").style.display = "block";
    document.getElementById("baited-text").textContent = currentQuote.baited;

    // Display the source button and set functionality
    const sourceContainer2 = document.getElementById("source-container2");
    sourceContainer2.style.display = "block";
    const sourceButton2 = document.getElementById("source-button2");
    sourceButton2.onclick = () => window.open(currentQuote.source, '_blank');

    // Reset score and quotes for retry
    score = 0;
    remainingQuotes = [...quotes];
}

// Function to end the game and show the third game end screen
function endGameScreen3() {
    // Hide game page
    document.getElementById("game-page").style.display = "none";

    // Show game end screen 3 with final score
    document.getElementById("game-over-page3").style.display = "block";

    // Display the source button and set functionality
    const sourceContainer3 = document.getElementById("source-container3");
    sourceContainer3.style.display = "block";
    const sourceButton3 = document.getElementById("source-button3");
    sourceButton3.onclick = () => window.open(currentQuote.source, '_blank');

    // Reset score and quotes for retry
    score = 0;
    remainingQuotes = [...quotes];
}

// Event listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("lib-button").addEventListener("click", () => handleVote(true));
document.getElementById("lie-button").addEventListener("click", () => handleVote(false));
document.getElementById("next-button").addEventListener("click", displayRandomQuote);
document.getElementById("share-button").addEventListener("click", () => {
    alert("Score shared! (This feature can be expanded later.)");
});
document.getElementById("retry-button").addEventListener("click", startGame);
document.getElementById("share-button2").addEventListener("click", () => {
    alert("Score shared! (This feature can be expanded later.)");
});
document.getElementById("retry-button2").addEventListener("click", startGame);
document.getElementById("share-button3").addEventListener("click", () => {
    alert("Score shared! (This feature can be expanded later.)");
});
document.getElementById("retry-button3").addEventListener("click", startGame);