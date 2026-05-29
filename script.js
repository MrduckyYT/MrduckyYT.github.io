// --- DOM Element Selection & Initialization ---
//
// Selecting key elements from the HTML document to manipulate them later
const startScreen = document.getElementById('start-screen'); // The initial question screen
const noScreen = document.getElementById('no-screen');     // The "Oh, I'm sorry" screen
const slideScreen = document.getElementById('slide-screen'); // The 8-slide viewer
const finaleScreen = document.getElementById('finale-screen'); // The final love message screen

const btnYesStart = document.getElementById('btn-yes');      // Start 'Yes' button
const btnNoStart = document.getElementById('btn-no');        // Start 'No' button
const btnChangeMind = document.getElementById('btn-change-mind'); // Button on the 'No' screen

const slideContentDiv = document.getElementById('slide-content'); // Where slide text appears
const btnNextSlide = document.getElementById('btn-next-slide');   // Next slide button
const heartElement = document.getElementById('heart-animation');    // The visible heart icon

// --- DATA STRUCTURES (The Content) ---

// Array holding the 8 slides of text provided by you
const birthdaySlides = [
    "HAPPY BIRTHDAY ADDYSON!!\nI hope you had a amazing time hanging out with your best friends and your family for your sweet 16, i want to tell you everything i love about you because i really wasn't sure what to do for your birthday", // Slide 1
    "A thing i seriously love the most about you, is your smile. i haven't told you thing but i had a dream about you before we were talking again and i just cant forget how beautiful your smile was and i get so happy inside seeing it every time we call", // Slide 2
    "Definitely your love for the walking dead, yes I haven't seen it yet but i really do love how into the show you are, and.. how much you like rick aka your husband", // Slide 3
    "Didn't forget about all the things you say to me, telling me im a bad person, saying for me to die, and that im embarrassing, its just funny to me and i love you for being that comfortable around me.", // Slide 4
    "You call me nicknames i seriously love, baby my sweet boy, my handsome boy, and now honey. they are just all so sweet and i get so nervous or anxious inside every time you call me it, it just makes me so happy", // Slide 5
    "So interesting how you are into birds, i never met anyone who's that interested on something like that, especially with the out side, i would love to talk to you all day about birds, i’d love to learn. oo i wonder what your favorite bird is", // Slide 6
    "One of the things i love aswell open you are with me. even if you weren't at first, who is really? i had no idea what to do at the moment and i kinda js felt useless at that time. im still really happy i was at least able to try", // Slide 7
    "Never forget in the end of the day, love all of you. i love how beautiful you are i love how happy you look with your with people you love. how bright you glow when you talk about your Interests, and passionate you are of those interested. and how much you mean to me i love you. i don't care what anyone says i love you, i don't care about anyone else because i love you. i don't care if we we're thousands of miles away i will still love you. nothing can change that ever", // Slide 8
    "Btw the first letter of all 7 of those spelled your name <3",
    "I really do care about you, and i want you to know that. i will be there for you on anything that happens in your life. i want to be someone you can just cry to and it will make you feel so much better."
];

// State variables to track progress
let currentSlideIndex = -1; // Start at -1 so the first click loads index 0 (the first slide)


// --- CORE FUNCTIONALITY: SCREEN MANAGEMENT ---

/**
 * @description Hides all screens and shows only the target screen.
 * @param {HTMLElement} activeScreenElement The element that should be visible.
 */
function setActiveScreen(activeScreenElement) {
    // 1. Hide everything first (by removing 'active' class)
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });

    // 2. Show only the target screen
    activeScreenElement.classList.remove('hidden');
    activeScreenElement.classList.add('active');
}


// --- EVENT HANDLERS ---

// 1. Start Button Handlers (Start Screen)
btnYesStart.addEventListener('click', () => {
    setActiveScreen(slideScreen); // Transition to the slide viewer
    loadSlide(0);              // Load the first slide immediately
});

btnNoStart.addEventListener('click', () => {
    setActiveScreen(noScreen);   // Transition to the "Sorry" screen
});

// 2. Change Mind Button Handler (Goes back to start)
btnChangeMind.addEventListener('click', () => {
    setActiveScreen(startScreen); // Return to the main question screen
});


// --- SLIDE VIEWER LOGIC ---

/**
 * @description Updates the slide content based on the given index.
 * @param {number} index The zero-based index of the slide in birthdaySlides array.
 */
function loadSlide(index) {
    if (index < 0 || index >= birthdaySlides.length) return;

    currentSlideIndex = index; // Update global state
    const textContent = birthdaySlides[index]; // Get the correct slide text

    // Replace newlines (\n) with HTML line breaks (<br>) for proper formatting in HTML
    const formattedText = textContent.replace(/\n/g, '<br>'); 
    
    slideContentDiv.innerHTML = formattedText; // Display the formatted text
    btnNextSlide.textContent = (index === birthdaySlides.length - 1) ? "What else?" : `Next (${index + 1} / ${birthdaySlides.length})`;
}

// Event listener for moving to the next slide
btnNextSlide.addEventListener('click', () => {
    if (currentSlideIndex < birthdaySlides.length - 1) {
        // Move to the next index and load that slide
        loadSlide(currentSlideIndex + 1);
    } else {
        // If this was the last slide, transition to the finale screen
        setActiveScreen(finaleScreen);
        showFinaleButtons(); // Call the function to set up the final love buttons
    }
});


// --- FINALE SCREEN LOGIC (The Love Sequence) ---

const loveBtns = [
    document.getElementById('love-btn-1'), 
    document.getElementById('love-btn-2'), 
];

/**
 * @description Populates and enables the final set of love buttons.
 */
function showFinaleButtons() {
    // Set up button texts if they weren't already set in HTML (good practice)
    if (!loveBtns[0].textContent) loveBtns[0].textContent = "I love you";
    if (!loveBtns[1].textContent) loveBtns[1].textContent = "I love you more";

    // Add event listeners to all three final buttons
    loveBtns.forEach(button => {
        button.addEventListener('click', handleConfettiAndHeart);
    });
}

/**
 * @description Handles the confetti, heart animation, and visual effects when any love button is clicked.
 */
function handleConfettiAndHeart() {
    // 1. Trigger Confetti Burst
    triggerConfetti();

    // 2. Show Heart Animation
    heartElement.style.opacity = '1'; // Make the heart visible instantly
    setTimeout(() => {
        // Wait a moment, then trigger disappearance (the animation)
        heartElement.style.transform = 'scale(0.5)'; // Shrink it down slightly before hiding
        heartElement.style.transition = 'transform 1s ease-out, opacity 2s ease-out';
        setTimeout(() => {
             // After the scale/fade out animation time (e.g., 2 seconds), reset it to hide fully
            heartElement.style.opacity = '0'; 
        }, 1800); // Set a delay slightly less than the total transition time for clean fade-out
    }, 50); // Small delay after button click

    // Optional: Disable buttons temporarily so they don't re-fire instantly
    loveBtns.forEach(btn => btn.disabled = true);
}


/**
 * @description Simulates a confetti burst using DOM elements for visual flair.
 */
function triggerConfetti() {
    const container = document.getElementById('app-container'); // Use the main app area as the canvas
    let confettiCount = 100; // Number of pieces to drop

    // Loop to create and animate individual confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece'); // Needs corresponding CSS class!
        
        // Random positioning, size, color setup
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * -50}%`; // Start slightly above the screen
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`; // Random HSL color
        confetti.style.transform = `rotate(${Math.random() * 360}deg) scale(1)`;

        // Append to the body/container so it covers everything
        document.body.appendChild(confetti);

        // Animation logic using setTimeout/setInterval for falling effect (Simulating random physics)
        setTimeout(() => {
            // Apply final transformation styles over time (This relies heavily on CSS Keyframes for best results, but we simulate the action here)
            confetti.style.transition = 'all 2s ease-out'; 
            confetti.style.opacity = Math.random() * 0.9 + 0.1; // Random starting opacity
            confetti.style.transform = `translateY(calc(${Math.random() * 150}vh)) rotate(${Math.random() * 720}deg) scale(0.8)`;

        }, 10); // Small stagger for the initial burst
    }

    // Clean up all confetti pieces after animation duration (e.g., 2 seconds + buffer)
    setTimeout(() => {
        document.querySelectorAll('.confetti-piece').forEach(c => c.remove());
        document.body.style.overflow = 'hidden'; // Keep the body clean afterwards
    }, 3000);
}


// --- INITIALIZATION CALL (Run when JS loads) ---
// Ensure that only the start screen is active when the page first loads
setActiveScreen(startScreen);

/* 
 * NOTE FOR IMPLEMENTATION: 
 * To make this confetti look amazing, you MUST add these styles to your style.css file:
 */
/*
@keyframes fall {
    from { transform: translate(-50%, -100px) rotate(0deg); opacity: 0; }
    to { transform: translate(var(--x), 100vh) rotate(720deg); opacity: 0.3; }
}

.confetti-piece {
    position: fixed; // Important for full-screen coverage
    width: 8px;     // Size of the piece
    height: 15px;   // Size of the piece
    border-radius: 2px;
    opacity: 0;     // Start invisible
}

// Note: The JS above handles the animation triggers, but these CSS rules define *how* they look.
*/
