// Repository of quotes with sources
const quotes = [
    { text: "Migration isn’t the issue; nationalism and white supremacy are.", source: "https://www.tandfonline.com/doi/full/10.1080/01419870.2021.1909743?", istrue: true, fellforit: false, baited: " " },
    { text: "Policing exists to terrorize and kill marginalized groups.", source: "https://level.medium.com/the-demand-for-abolition-979c759ff6f", istrue: true, fellforit: false, baited: " " },
    { text: "Black officers represent anti-Black violence in pop culture.", source: "https://level.medium.com/pop-culture-helped-turn-police-officers-into-rock-stars-and-black-folks-into-criminals-1ac9e3faffa1", istrue: true, fellforit: false, baited: " " },
    { text: "Milk is a Symbol of Colonial Oppression: Activists Demand Rebranding of Dairy Products", source: "Fake", istrue: false },
    { text: "Universities to Implement Trigger Warnings for Shakespeare", source: "https://www.bbc.co.uk/news/uk-england-cambridgeshire-41678937", istrue: true, fellforit: false, baited: " " },
    { text: "'Good Morning' reinforces capitalist norms, study claims.", source: "Fake", istrue: false, fellforit: false, baited: " " },
    { text: "Math is taught as a cold, hard fact, erasing diverse cultures and forcing Western ideas as the only truth.", source: "Fake", istrue: false, fellforit: false, baited: " " },
    { text: "'Goldilocks' perpetuates harmful settler-colonial ideas.", source: "Fake", istrue: false, fellforit: false, baited: " " },
    { text: "Climate Change Data Manipulated to Show Warming", source: "https://www.lse.ac.uk/granthaminstitute/news/the-times-fox-news-and-breitbart-still-promoting-fake-news-about-climate-change/?utm_source=chatgpt.com", istrue: false, fellforit: true, baited: "This is Fake! Breitbart Shared Dalse Data!" },
    { text: "Muslim No-Go Zones Dominate London", source: "https://theweek.com/speedreads/534325/fox-news-apologizes-multiple-false-claims-about-european-muslims", istrue: false, fellforit: true, baited: "Don't Worry, Fox News fell for this as well!"},
    { text: "Cows to Be Fitted With VR Headsets to Experience Life as Humans", source: "fake", istrue: false, fellforit: false, baited: " " },
    { text: "Dutch Government Declares Meat-Eating a Hate Crime", source: "fake", istrue: false, fellforit: false, baited: " " },
    { text: "Study: White People Are More Likely to Be Attacked by Sharks", source: "fake", istrue: false, fellforit: false, baited: " " },
    { text: "Books By Straight White Authors to be Removed from Ohio Public Libraries", source: "fake", istrue: false, fellforit: false, baited: " " },
    { text: "California to Tax People for Breathing due to Carbon Emissions", source: "fake", istrue: false, fellforit: false, baited: " " },
    { text: "French Government to Replace Armed Police with Therapists", source: "fake", istrue: false, fellforit: false, baited: " " },
    { text: "Berkeley Ban on Gendered Language - City to replace 'Manhole' with 'Maintenance Hole'", source: "https://www.theguardian.com/us-news/2019/jul/18/berkeley-city-council-manhole-gendered-language", istrue: true, fellforit: false, baited: " " },
    { text: "Australian University Forces Students to Sit 'White Privlige' Assesment", source: "https://www.dailymail.co.uk/news/article-12029695/University-Queensland-students-feared-expulsion-failed-white-privilege-assessment.html", istrueue: true, fellforit: false, baited: " " },
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
    score = 0; // Reset score at the start of the game
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
        if (currentQuote.istrue) {
            quoteSource.style.display = "inline-block";
            quoteSource.onclick = () => window.open(currentQuote.source, '_blank');
            sourceContainer.style.display = "block";  // Show the container for source button
        }

        // Update score display immediately
        document.getElementById("score").textContent = `Score: ${score}`;

        // Show the "Next" button
        nextButton.style.display = "inline-block";
        nextContainer.style.display = "block";
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
    remainingQuotes = [...quotes];
}

// Share button functionality
document.getElementById("share-button").addEventListener("click", function () {
    console.log("Score when sharing button clicked:", score); // Debug score before sharing

    const shareMessage = `I just scored ${score} points on Lib vs Lie! Can you beat me? Play now: https://libvslie.com`;

    navigator.clipboard.writeText(shareMessage).then(() => {
        const shareButton = document.getElementById("share-button");
        shareButton.textContent = "Message Copied!";

        setTimeout(() => {
            shareButton.textContent = "Share";
        }, 3000);
    }).catch((err) => {
        console.error("Failed to copy text to clipboard:", err);
    });
});


document.getElementById("share-button2").addEventListener("click", function () {
    console.log("Score when sharing button clicked:", score); // Debug score before sharing

    const shareMessage = `I just scored ${score} points on Lib vs Lie! Can you beat me? Play now: https://libvslie.com`;

    navigator.clipboard.writeText(shareMessage).then(() => {
        const shareButton = document.getElementById("share-button2");
        shareButton.textContent = "Message Copied!";

        setTimeout(() => {
            shareButton.textContent = "Share";
        }, 3000);
    }).catch((err) => {
        console.error("Failed to copy text to clipboard:", err);
    });
});


document.getElementById("share-button3").addEventListener("click", function () {
    console.log("Score when sharing button clicked:", score); // Debug score before sharing

    const shareMessage = `I just scored ${score} points on Lib vs Lie! Can you beat me? Play now: https://libvslie.com`;

    navigator.clipboard.writeText(shareMessage).then(() => {
        const shareButton = document.getElementById("share-button3");
        shareButton.textContent = "Message Copied!";

        setTimeout(() => {
            shareButton.textContent = "Share";
        }, 3000);
    }).catch((err) => {
        console.error("Failed to copy text to clipboard:", err);
    });
});


// Event listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("lib-button").addEventListener("click", () => handleVote(true));
document.getElementById("lie-button").addEventListener("click", () => handleVote(false));
document.getElementById("next-button").addEventListener("click", displayRandomQuote);
document.getElementById("retry-button").addEventListener("click", startGame);
document.getElementById("retry-button2").addEventListener("click", startGame);
document.getElementById("retry-button3").addEventListener("click", startGame);