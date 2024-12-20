// Repository of quotes with sources
const quotes = [
    { text: "Unless Trump is hiding under a table, I bet he is throwing ketchup because he is going to be minimized because he was bought and paid for by Elon Musk.", source: "https://www.dailykos.com/stories/2024/12/19/2292883/-President-Musk-Can-you-hear-Trump-throwing-Ketchup", islib: true },
    { text: "It is not migration that is the problem, but nationalism, white supremacy and the highly policed borders that require dangerous border crossings.", source: "https://www.tandfonline.com/doi/full/10.1080/01419870.2021.1909743?utm_source=chatgpt.com", islib: true },
    { text: "Ultimately, if expanded, a feminist commons could replace the exclusionary format of nation-states", source: "https://signsjournal.org/covid/ticktin/", islib: true },
    { text: "The central intent of policing is to surveil, terrorize, capture, and kill marginalized populations, specifically Black folks.", source: "https://level.medium.com/the-demand-for-abolition-979c759ff6f", islib: true },
    { text: "In much of popular culture Black officers are no longer race men at all — but, rather, stand-ins for the very anti-Black violence directed at Black communities.", source: "https://level.medium.com/pop-culture-helped-turn-police-officers-into-rock-stars-and-black-folks-into-criminals-1ac9e3faffa1", islib: true },
    { text: "Milk is a Symbol of Colonial Oppression: Activists Demand Rebranding of Dairy Products", source: "Fake", islib: false },
    { text: "Universities to Implement Trigger Warnings for Shakespearean Texts: 'Macbeth' Deemed Problematic", source: "Fake", islib: false },
    { text: "Stop Saying 'Good Morning': Study Finds Greeting Reinforces Capitalist Productivity Norms", source: "Fake", islib: false },
    { text: "Teaching of math as an objective science disregards cultural contributions and prioritizes Western ways of knowing.", source: "Fake", islib: false },
    { text: "Children should be taught that fairy tales like 'Goldilocks' perpetuate harmful ideas of property and entitlement, which are rooted in settler-colonial ideologies.", source: "Fake", islib: false },
];

// Variables for game tracking
let currentQuote = null;
let score = 0;
let totalQuestionsAnswered = 0; // New variable to track total questions answered
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

    totalQuestionsAnswered++; // Increment total questions answered

    // Update score display
    document.getElementById("score").textContent = `Score: ${score} out of ${totalQuestionsAnswered}`;

    // Show the "Next" button
    document.getElementById("next-button").style.display = "inline-block";
}

// Function to end the game and show the score page
function endGame() {
    // Hide game page
    document.getElementById("game-page").style.display = "none";

    // Show game over page with final score
    document.getElementById("game-over-page").style.display = "block";
    document.getElementById("final-score").textContent = `Your Score: ${score} out of ${totalQuestionsAnswered}`;

    // Reset score and quotes for retry
    score = 0;
    totalQuestionsAnswered = 0; // Reset total questions answered
    remainingQuotes = [...quotes];  // Reset the pool
    document.getElementById("score").textContent = `Score: ${score} out of ${totalQuestionsAnswered}`;
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