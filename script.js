// --- PIN Authentication Logic ---
const pinBoxes = document.querySelectorAll('.pin-box');
const unlockBtn = document.getElementById('unlock-btn');
const errorMessage = document.getElementById('error-message');
const loginSection = document.getElementById('login-section');
const mainSection = document.getElementById('main-section');

// Auto-focus next input
pinBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < pinBoxes.length - 1) {
            pinBoxes[index + 1].focus();
        }
    });

    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
            pinBoxes[index - 1].focus();
        }
    });
});

unlockBtn.addEventListener('click', () => {
    let enteredPin = "";
    pinBoxes.forEach(box => enteredPin += box.value);

    // Setting PIN to user's requested 050213
    if (enteredPin === "050213") {
        loginSection.classList.remove('active');
        loginSection.classList.add('hidden');
        document.getElementById('questionnaire-section').classList.remove('hidden');
        document.getElementById('questionnaire-section').classList.add('active');
    } else {
        errorMessage.classList.remove('hidden');
        pinBoxes.forEach(box => {
            box.value = "";
            box.style.borderColor = "#ff3366";
        });
        pinBoxes[0].focus();
        setTimeout(() => {
            pinBoxes.forEach(box => box.style.borderColor = "rgba(255, 255, 255, 0.8)");
        }, 1000);
    }
});

// Update error message to specify PIN
errorMessage.innerText = "Hint: Oru memories ❤️";

// --- Countdown Logic ---
function startCountdown() {
    const now = new Date();
    let targetYear = now.getFullYear();
    let targetDate = new Date(`May 13, ${targetYear} 00:00:00`);

    if (now > targetDate) {
        targetDate = new Date(`May 13, ${targetYear + 1} 00:00:00`);
    }

    const timerElement = document.getElementById('timer');

    setInterval(() => {
        const currentDate = new Date().getTime();
        const timeLeft = targetDate - currentDate;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// --- Interactive Cake Logic ---
const cake = document.getElementById('cake');
const flame = document.getElementById('flame');

cake.addEventListener('click', () => {
    flame.classList.add('blown-out');
    createConfetti();
});

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff69b4', '#a6c1ee', '#ffcc00', '#fff'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        confetti.animate([
            { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${Math.random()*200 - 100}px, ${window.innerHeight}px, 0) rotate(${Math.random()*360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(.37,0,.63,1)',
            fill: 'forwards'
        });

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// --- Open When Letters Logic ---
const modal = document.getElementById('letter-modal');
const modalTitle = document.getElementById('letter-title');
const modalBody = document.getElementById('letter-body');

const letterContents = {
    'You miss me': 'I miss you too! Remember that time we laughed until we cried? I am just a text away. Sending a big virtual hug! 🤗',
    'You need a laugh': 'I am always here to make you smile! Remember that you are the best. Love you! ❤️',
    'You feel sad': 'Hey bestie, it\'s okay to feel sad sometimes. You are incredibly strong, beautiful, and loved. Take a deep breath, and remember I am always in your corner. ❤️'
};

function openLetter(type) {
    modalTitle.innerText = `Open when: ${type}`;
    modalBody.innerText = letterContents[type] || "You are amazing!";
    modal.classList.remove('hidden');
}

function closeLetter() {
    modal.classList.add('hidden');
}

// --- Shared Memories Quote Logic ---
const memoryQuotes = [
    "Every moment with you is a beautiful treasure ❤️",
    "My favorite place is always right next to you 🫂",
    "Life is just better when we are laughing together 💕",
    "Grateful for every single smile you give me ✨"
];

function showMemoryQuote(index) {
    const quote = memoryQuotes[index] || "You are amazing!";
    modalTitle.innerText = "A Memory Message ❤️";
    modalBody.innerText = quote;
    modal.classList.remove('hidden');
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
    const envModal = document.getElementById('envelope-modal');
    if (event.target == envModal) {
        envModal.classList.add('hidden');
    }
}

// --- Questionnaire Logic ---
let currentStep = 1;
const totalSteps = 5;
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressIndicator = document.getElementById('progress-indicator');
const qErrorMessage = document.getElementById('q-error-message');
const qSuccessMessage = document.getElementById('q-success-message');
const questionnaireSection = document.getElementById('questionnaire-section');

let answers = {};

nextBtn.addEventListener('click', () => {
    // Validate current step
    let isValid = false;
    if (currentStep < 5) {
        const selectedOption = document.querySelector(`input[name="q${currentStep}"]:checked`);
        if (selectedOption) {
            answers[`q${currentStep}`] = selectedOption.value;
            isValid = true;
        }
    }

    if (isValid) {
        qErrorMessage.classList.add('hidden');
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        document.getElementById(`step-${currentStep}`).classList.remove('active-step');
        
        currentStep++;
        progressIndicator.innerText = `Step ${currentStep} of ${totalSteps}`;
        
        document.getElementById(`step-${currentStep}`).classList.remove('hidden');
        document.getElementById(`step-${currentStep}`).classList.add('active-step');

        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
    } else {
        qErrorMessage.innerText = "Please select an option to continue! 🥺";
        qErrorMessage.classList.remove('hidden');
    }
});

submitBtn.addEventListener('click', async () => {
    const q5Text = document.getElementById('q5-text').value.trim();
    if (!q5Text) {
        qErrorMessage.innerText = "Please write something to continue! 🥺";
        qErrorMessage.classList.remove('hidden');
        return;
    }
    
    answers['q5'] = q5Text;
    qErrorMessage.classList.add('hidden');
    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;

    // --- Google Sheets Integration via Apps Script ---
    // 1. Follow the instructions in the linking_plan.md to get your Web App URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzy2US2uAAZEcTGlvevPfb8XtYeaOBOq356niaM807STIrk4_mLdR8KF9NRpmqwpTkN8g/exec"; 

    try {
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", // Use no-cors to avoid preflight issues if necessary, but JSON is better with CORS
            headers: {
                "Content-Type": "text/plain" // Apps Script doPost often prefers text/plain for JSON
            },
            body: JSON.stringify(answers)
        });
        
        // Since no-cors doesn't return a readable body, we show success based on the fetch completing
        qSuccessMessage.classList.remove('hidden');
        submitBtn.classList.add('hidden');
        
        // Wait 2 seconds, then start cinematic experience
        setTimeout(() => {
            questionnaireSection.classList.remove('active');
            questionnaireSection.classList.add('hidden');
            startCinematicExperience();
        }, 2000);

    } catch (error) {
        console.error("Submission error:", error);
        qErrorMessage.innerText = "Error submitting response. Try again! 🥺";
        qErrorMessage.classList.remove('hidden');
        submitBtn.innerText = "Submit";
        submitBtn.disabled = false;
    }
});

// --- Special Letter Logic ---
const specialLetterCard = document.getElementById('special-letter-card');
const envelopeModal = document.getElementById('envelope-modal');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const specialLetterModal = document.getElementById('special-letter-modal');
const closeSpecialLetter = document.getElementById('close-special-letter');
const typewriterText = document.getElementById('typewriter-text');
const letterFooter = document.getElementById('letter-footer');

const fullLetterText = `My dear mine ❤️,

Wish you many more happy returns of the day, thangoo ❤️💕
Stay happy always!

I just wanted to share a few sweet memories with you 💕
From our very first call, our talks, and even the photos — everything was so special to me ❤️

Enaku unna romba pidikkum. Ne engita sanda podra… apram neye vandhu "na thaan thappu" nu solluva, even naan thappu pannirundhaalum atha un mela eduthukkura…
That's what I call true understanding and a beautiful friendship mine ❤️

Adhuku apram, ne feel aagakoodadhu… always move forward in life. I really want to see you become successful one day 💕

Ne chinna chinna vishayangal kooda en kitta share pandra… daily nadakkara ellame solluva… athu enaku romba pidikkum ❤️
Oru naal pesala na kooda, "yen iniki pesala?" nu yosippen… because I miss you that much 💔
Sometimes situations irukkum nu theriyum… but inimey namakku time irukkum nu namburen 💕

Na unaku epovum help pannuva… ne en kitta edhavadhu ketta, naan iruppen ❤️
Indha 2 years bonding… avlo easy ah kadachadhu illa… idhu namakku oru special sign 💫

Ne sonna na kekka try panren… naan sonna ne kekka maata sometimes 😅
but rendu thadava sonna apram kekkura 😄
Aana matha ellam ne en kitta share panra… adhu podhum ❤️

Ippadiye iru… epovum change aagadhe…
Enaku un pathi theriyum… unakku en pathi theriyum… adhu podhum namakku 🤍

Inimey edhukum ne feel pannadhe… naan irukken…
Yendha situation a irundhaalum, naan un kooda iruppen 💕

Once again, dear…
Wish you a very happy birthday da thangooo ❤️🎉🎂

With lots of love,
Yours ❤️`;

let isTyping = false;

specialLetterCard.addEventListener('click', () => {
    envelopeModal.classList.remove('hidden');
});

envelopeWrapper.addEventListener('click', () => {
    envelopeModal.classList.add('hidden');
    specialLetterModal.classList.remove('hidden');
    startTypewriter();
    createFloatingHearts();
});

closeSpecialLetter.addEventListener('click', () => {
    specialLetterModal.classList.add('hidden');
    isTyping = false; // Stop the typewriter
});

function startTypewriter() {
    if (isTyping) return;
    isTyping = true;
    typewriterText.innerHTML = "";
    letterFooter.classList.add('hidden');
    
    let index = 0;
    let currentHTML = "";

    function typeChar() {
        if (!isTyping) return; // Exit if modal was closed
        
        if (index < fullLetterText.length) {
            let char = fullLetterText[index];
            
            // Handle surrogate pairs for emojis
            if (fullLetterText.codePointAt(index) > 0xFFFF) {
                char = fullLetterText.substring(index, index + 2);
                index += 2;
            } else {
                index++;
            }

            if (char === '\n') {
                currentHTML += "<br>";
                typewriterText.innerHTML = currentHTML;
                
                // Pause for paragraphs
                if (fullLetterText[index] === '\n') {
                    setTimeout(typeChar, 600);
                } else {
                    setTimeout(typeChar, 200);
                }
            } else {
                currentHTML += char;
                typewriterText.innerHTML = currentHTML;
                setTimeout(typeChar, 50); // Speed of typing
            }
            
            // Auto scroll to bottom
            const paperLetter = document.querySelector('.paper-letter');
            paperLetter.scrollTop = paperLetter.scrollHeight;
        } else {
            isTyping = false;
            letterFooter.classList.remove('hidden');
        }
    }
    
    typeChar();
}

function createFloatingHearts() {
    const bg = document.querySelector('.floating-hearts-bg');
    bg.innerHTML = ''; // clear previous
    for(let i=0; i<15; i++) {
        let heart = document.createElement('div');
        heart.classList.add('letter-heart');
        heart.innerHTML = ['❤️', '💕', '🤍', '💖'][Math.floor(Math.random()*4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 3) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        bg.appendChild(heart);
    }
}

// --- Cinematic Experience Logic ---
function startCinematicExperience() {
    const cinematicSection = document.getElementById('cinematic-section');
    const loadingScreen = document.getElementById('loading-screen');
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownNumber = document.getElementById('countdown-number');
    
    cinematicSection.classList.remove('hidden');
    cinematicSection.classList.add('active');

    // Step 1: Loading Screen (2s)
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        loadingScreen.classList.add('hidden');
        countdownScreen.classList.remove('hidden');
        countdownScreen.classList.add('active');
        
        // Step 2: Countdown 5 to 0
        let count = 5;
        countdownNumber.innerText = count;
        
        const countInterval = setInterval(() => {
            count--;
            if (count < 0) {
                clearInterval(countInterval);
                countdownScreen.classList.remove('active');
                countdownScreen.classList.add('hidden');
                startRevealScreen();
            } else {
                // re-trigger CSS animation
                countdownNumber.style.animation = 'none';
                countdownNumber.offsetHeight; /* trigger reflow */
                countdownNumber.style.animation = null; 
                countdownNumber.innerText = count;
            }
        }, 1000);
        
    }, 2000);
}

function startRevealScreen() {
    const revealScreen = document.getElementById('reveal-screen');
    const mainTextContainer = document.getElementById('reveal-main-text');
    const subContent = document.getElementById('reveal-sub-content');
    const dynamicDate = document.getElementById('dynamic-date');
    const openSurpriseBtn = document.getElementById('open-surprise-btn');
    
    revealScreen.classList.remove('hidden');
    revealScreen.classList.add('active');
    
    // Set Dynamic Date
    dynamicDate.innerText = "May 13, 2026";
    
    // Add Sparkles
    createSparkles();
    
    // Sequence Animation: Oi -> Srinisha Thangoo -> A Surprise From Me
    const sequence = ["Oi", "Srinisha Thangoo", "A Surprise From Me"];
    let step = 0;

    function showNextText() {
        if (step < sequence.length) {
            const isFirst = step === 0;
            
            if (!isFirst) {
                // Phase 1: Fade Out existing text
                mainTextContainer.style.opacity = "0";
                mainTextContainer.style.transform = "translateY(-20px)";
                mainTextContainer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            }

            setTimeout(() => {
                // Phase 2: Update Text and Reset Position for Fade In
                mainTextContainer.innerText = sequence[step];
                mainTextContainer.style.transition = "none";
                mainTextContainer.style.transform = "translateY(20px)";
                mainTextContainer.style.opacity = "0";
                
                // Force a reflow to ensure the "none" transition and position reset are applied
                mainTextContainer.offsetHeight;

                setTimeout(() => {
                    // Phase 3: Fade In new text
                    mainTextContainer.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                    mainTextContainer.style.opacity = "1";
                    mainTextContainer.style.transform = "translateY(0)";
                    
                    step++;
                    if (step < sequence.length) {
                        // Wait then show next
                        setTimeout(showNextText, 2500);
                    } else {
                        // Final step reached
                        createConfetti(); 
                        createRevealBalloons();
                        setTimeout(() => {
                            subContent.classList.remove('hidden');
                        }, 1000);
                    }
                }, 50);
            }, isFirst ? 0 : 600);
        }
    }
    
    // Initial setup
    mainTextContainer.style.opacity = "0";
    
    setTimeout(showNextText, 500);

    // Button to continue
    openSurpriseBtn.addEventListener('click', () => {
        const cinematicSection = document.getElementById('cinematic-section');
        const mainSection = document.getElementById('main-section');
        
        cinematicSection.style.opacity = '0';
        setTimeout(() => {
            cinematicSection.classList.remove('active');
            cinematicSection.classList.add('hidden');
            cinematicSection.style.display = 'none';
            
            mainSection.classList.remove('hidden');
            mainSection.classList.add('active');
            startCountdown();
        }, 1000);
    });
}

function createRevealBalloons() {
    const bg = document.getElementById('reveal-bg-effects');
    for(let i=0; i<20; i++) {
        const balloon = document.createElement('div');
        balloon.innerText = ['🎈', '💕', '✨', '🎉'][Math.floor(Math.random()*4)];
        balloon.style.position = 'absolute';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.bottom = '-50px';
        balloon.style.fontSize = (Math.random() * 30 + 20) + 'px';
        balloon.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
        bg.appendChild(balloon);
    }
}

function createSparkles() {
    const container = document.getElementById('reveal-sparkles');
    container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const dot = document.createElement('div');
        dot.className = 'sparkle-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 3 + 's';
        dot.style.opacity = Math.random();
        container.appendChild(dot);
    }
}

// --- Final Ending Logic ---
const finalEndingBtn = document.getElementById('final-ending-btn');
const finalEndingSection = document.getElementById('final-ending-section');

finalEndingBtn.addEventListener('click', () => {
    const mainSection = document.getElementById('main-section');
    mainSection.style.transition = "opacity 1s ease";
    mainSection.style.opacity = "0";
    


    setTimeout(() => {
        mainSection.classList.add('hidden');
        finalEndingSection.classList.remove('hidden');
        finalEndingSection.classList.add('active');
        
        startFinalConfetti();
        startFinalHearts();
    }, 1000);
});

function startFinalConfetti() {
    const container = document.getElementById('final-confetti-container');
    const colors = ['#ff69b4', '#ffffff', '#ffd700', '#ffb6c1', '#da70d6'];
    
    for (let i = 0; i < 100; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'absolute';
        conf.style.width = Math.random() * 8 + 6 + 'px';
        conf.style.height = Math.random() * 8 + 6 + 'px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = Math.random() * 100 + '%';
        conf.style.top = '-20px';
        conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        conf.style.opacity = Math.random() + 0.5;
        conf.style.animation = `fallDown ${Math.random() * 3 + 4}s linear forwards`;
        conf.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(conf);
    }
}

function startFinalHearts() {
    const container = document.getElementById('final-hearts-container');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'final-float-heart';
        heart.innerHTML = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.animationDuration = Math.random() * 4 + 6 + 's';
        
        container.appendChild(heart);
        
        // Remove after animation completes
        setTimeout(() => heart.remove(), 10000);
    }, 300); // create a new heart slowly
}

// --- Fireworks Experience Logic ---
const fireworksBtn = document.getElementById('fireworks-btn');
const fireworksModal = document.getElementById('fireworks-modal');
const closeFireworksBtn = document.getElementById('close-fireworks');
const fireworksVideo = document.getElementById('fireworks-video');
const fireworksText = document.getElementById('fireworks-text');
const memoryPhotosContainer = document.getElementById('memory-photos-container');
const fireworksParticles = document.getElementById('fireworks-particles');

let photosInterval;
let particlesInterval;

const fwPinModal = document.getElementById('fireworks-pin-modal');
const fwPinBoxes = document.querySelectorAll('.fw-pin-box');
const fwUnlockBtn = document.getElementById('fw-unlock-btn');
const fwErrorMessage = document.getElementById('fw-error-message');
const closeFwPinBtn = document.getElementById('close-fireworks-pin');

// Auto-focus logic for Fireworks PIN boxes
fwPinBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < fwPinBoxes.length - 1) {
            fwPinBoxes[index + 1].focus();
        }
    });

    box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
            fwPinBoxes[index - 1].focus();
        }
    });
});

fireworksBtn.addEventListener('click', () => {
    // Show PIN modal first
    fwPinModal.classList.remove('hidden');
    fwPinModal.style.display = 'flex';
    fwPinBoxes[0].focus();
});

closeFwPinBtn.addEventListener('click', () => {
    fwPinModal.classList.add('hidden');
    fwPinModal.style.display = 'none';
});

fwUnlockBtn.addEventListener('click', () => {
    let enteredPin = "";
    fwPinBoxes.forEach(box => enteredPin += box.value);

    if (enteredPin === "050220") {
        fwPinModal.classList.add('hidden');
        fwPinModal.style.display = 'none';
        
        // Correct PIN - Start Fireworks!
        fireworksModal.classList.remove('hidden');
        setTimeout(() => {
            fireworksModal.style.opacity = '1';
            fireworksVideo.src = "https://cdn.pixabay.com/video/2020/01/03/30894-384351658_large.mp4"; // Placeholder fireworks video
            fireworksVideo.play();
            
            // Show Text after 2 seconds
            setTimeout(() => {
                fireworksText.style.opacity = '1';
                fireworksText.style.transform = 'translateY(0)';
            }, 2000);

            startFireworksParticles();
            startMemoryPhotosSequence();
        }, 50);
    } else {
        fwErrorMessage.classList.remove('hidden');
        fwPinBoxes.forEach(box => {
            box.value = "";
            box.style.borderColor = "#ff3366";
        });
        fwPinBoxes[0].focus();
        setTimeout(() => {
            fwPinBoxes.forEach(box => box.style.borderColor = "rgba(255, 255, 255, 0.8)");
        }, 1000);
    }
});

closeFireworksBtn.addEventListener('click', () => {
    fireworksModal.style.opacity = '0';
    setTimeout(() => {
        fireworksModal.classList.add('hidden');
        fireworksVideo.pause();
        fireworksVideo.src = ""; // Stop video loading
        fireworksText.style.opacity = '0';
        fireworksText.style.transform = 'translateY(20px)';
        memoryPhotosContainer.innerHTML = '';
        fireworksParticles.innerHTML = '';
        clearInterval(photosInterval);
        clearInterval(particlesInterval);
    }, 2000); // wait for fade out
});

function startFireworksParticles() {
    // Generate glowing spark particles trails continuously
    particlesInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = ['#ffd700', '#ffaa00', '#ff5500', '#ffffff'][Math.floor(Math.random() * 4)];
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particle.style.background}`;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = '0';
        
        // Random drift
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;
        
        particle.animate([
            { opacity: 0, transform: 'scale(0) translate(0, 0)' },
            { opacity: 1, transform: 'scale(1) translate(0, 0)' },
            { opacity: 0, transform: `scale(0.5) translate(${tx}px, ${ty}px)` }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        fireworksParticles.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }, 100);
}

function startMemoryPhotosSequence() {
    // Using the beautiful photos you just uploaded!
    // Make sure these images are saved in your "my dear" folder.
    const photos = [
        "memory1.jpg",
        "memory2.jpg",
        "memory3.jpg",
        "memory4.jpg",
        "memory5.jpg"
    ];

    let currentPhotoIndex = 0;

    function showNextPhoto() {
        if (currentPhotoIndex >= 5) {
            currentPhotoIndex = 0; // loop forever or stop
        }

        const photoWrapper = document.createElement('div');
        photoWrapper.style.position = 'absolute';
        // Random position, keeping it within view
        photoWrapper.style.left = (Math.random() * 60 + 20) + 'vw';
        photoWrapper.style.top = (Math.random() * 60 + 20) + 'vh';
        photoWrapper.style.transform = 'translate(-50%, -50%) scale(0.5)';
        photoWrapper.style.opacity = '0';
        photoWrapper.style.transition = 'all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        photoWrapper.style.zIndex = '20';
        
        // Heart shaped mask for the photo
        photoWrapper.innerHTML = `
            <div style="position: relative; width: 250px; height: 250px; filter: drop-shadow(0 0 30px rgba(255,105,180,0.8));">
                <div style="
                    width: 100%; height: 100%;
                    background-image: url('${photos[currentPhotoIndex % photos.length]}');
                    background-size: cover;
                    background-position: center;
                    clip-path: path('M125,230 C125,230 10,140 10,75 C10,35 45,10 80,10 C105,10 125,30 125,30 C125,30 145,10 170,10 C205,10 240,35 240,75 C240,140 125,230 125,230 Z');
                    animation: pulseHeart 2s infinite alternate;
                "></div>
                <!-- Glowing border effect -->
                <div style="position: absolute; top:0; left:0; width:100%; height:100%; clip-path: path('M125,230 C125,230 10,140 10,75 C10,35 45,10 80,10 C105,10 125,30 125,30 C125,30 145,10 170,10 C205,10 240,35 240,75 C240,140 125,230 125,230 Z'); box-shadow: inset 0 0 20px #fff; pointer-events: none;"></div>
            </div>
        `;

        memoryPhotosContainer.appendChild(photoWrapper);

        // Animate in
        setTimeout(() => {
            photoWrapper.style.opacity = '1';
            photoWrapper.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);

        // Float slightly
        photoWrapper.animate([
            { transform: 'translate(-50%, -50%) scale(1)' },
            { transform: 'translate(-50%, -60%) scale(1.05)' }
        ], {
            duration: 4000,
            easing: 'ease-in-out',
            direction: 'alternate',
            iterations: Infinity
        });

        // Remove after 5 seconds
        setTimeout(() => {
            photoWrapper.style.opacity = '0';
            photoWrapper.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => photoWrapper.remove(), 2000);
        }, 5000);

        currentPhotoIndex++;
    }

    // Add pulse keyframes dynamically if not exists
    if (!document.getElementById('heart-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'heart-pulse-style';
        style.innerHTML = `
            @keyframes pulseHeart {
                0% { filter: brightness(1); }
                100% { filter: brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.5)); }
            }
        `;
        document.head.appendChild(style);
    }

    showNextPhoto(); // first one immediately
    photosInterval = setInterval(showNextPhoto, 4000); // next every 4s
}

// --- Voices Memories Logic ---
const voicesData = [
    { id: 1, title: "Midnight Laughs", sender: "Mukesh", duration: "0:45", date: "May 1, 2026", audioUrl: "voice1.mp3", avatar: "😂" },
    { id: 2, title: "Birthday Wish", sender: "Bestie", duration: "1:12", date: "May 5, 2026", audioUrl: "voice2.mp3", avatar: "💖" },
    { id: 3, title: "Secret Message", sender: "Srinisha", duration: "0:30", date: "May 7, 2026", audioUrl: "voice3.mp3", avatar: "🤫" }
];

let currentAudio = null;
let playerPhotoInterval = null;

function initVoices() {
    const openVoicesBtn = document.getElementById('open-voices-btn');
    if (!openVoicesBtn) return;
    
    renderVoiceCards();
    
    openVoicesBtn.addEventListener('click', openVoicesGallery);
    document.getElementById('close-voices-btn').addEventListener('click', closeVoicesGallery);
    document.getElementById('close-player-btn').addEventListener('click', closeAudioPlayer);
}

function renderVoiceCards() {
    const voicesGrid = document.getElementById('voices-grid');
    voicesGrid.innerHTML = '';
    voicesData.forEach(voice => {
        const card = document.createElement('div');
        card.className = 'voice-card';
        card.innerHTML = `
            <div class="voice-card-top">
                <div class="voice-avatar">${voice.avatar}</div>
                <div class="voice-info">
                    <h3>${voice.title}</h3>
                    <p>From: ${voice.sender}</p>
                </div>
            </div>
            <div class="mini-waveform">
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
                <div class="waveform-bar"></div>
            </div>
            <div class="voice-meta">
                <span>${voice.date}</span>
                <span>${voice.duration}</span>
            </div>
        `;
        card.addEventListener('click', () => playVoiceMoment(voice));
        voicesGrid.appendChild(card);
    });
}

async function openVoicesGallery() {
    const intro = document.getElementById('voices-intro-overlay');
    intro.classList.remove('hidden');
    intro.style.opacity = '1';
    const text = intro.querySelector('.cinematic-text');
    text.classList.add('cinematic-active');

    setTimeout(() => {
        intro.style.opacity = '0';
        document.getElementById('voices-section').classList.remove('hidden');
        document.getElementById('main-section').classList.add('hidden');
        
        setTimeout(() => {
            intro.classList.add('hidden');
            text.classList.remove('cinematic-active');
        }, 1000);
    }, 3500);
}

function closeVoicesGallery() {
    document.getElementById('voices-section').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');
    stopAudio();
}

function playVoiceMoment(voice) {
    stopAudio();
    const overlay = document.getElementById('audio-player-overlay');
    overlay.classList.remove('hidden');
    overlay.style.opacity = '1';
    
    const introText = document.getElementById('player-intro-text');
    const controlsUI = document.getElementById('player-controls-ui');
    
    introText.classList.add('cinematic-active');
    controlsUI.classList.add('hidden');
    
    document.getElementById('player-title').innerText = voice.title;
    document.getElementById('player-sender').innerText = `From: ${voice.sender}`;
    document.getElementById('player-avatar').innerText = voice.avatar;

    currentAudio = new Audio(voice.audioUrl);
    
    setTimeout(() => {
        introText.classList.remove('cinematic-active');
        controlsUI.classList.remove('hidden');
        
        currentAudio.play().catch(e => console.log("Audio play failed - likely no file yet"));
        startPlayerPhotoAnimation();
        startWaveformAnimation();
        
        const playBtn = document.getElementById('player-play-pause-btn');
        playBtn.innerText = '⏸';
        playBtn.onclick = () => {
            if (currentAudio.paused) {
                currentAudio.play();
                playBtn.innerText = '⏸';
            } else {
                currentAudio.pause();
                playBtn.innerText = '▶';
            }
        };
        
        currentAudio.ontimeupdate = () => {
            const mins = Math.floor(currentAudio.currentTime / 60);
            const secs = Math.floor(currentAudio.currentTime % 60).toString().padStart(2, '0');
            document.getElementById('player-time').innerText = `${mins}:${secs}`;
        };

        currentAudio.onended = closeAudioPlayer;
    }, 3500);
}

function startPlayerPhotoAnimation() {
    const bg = document.getElementById('player-photo-bg');
    const photos = ["memory1.jpg", "memory2.jpg", "memory3.jpg", "memory4.jpg", "memory5.jpg"];
    let i = 0;
    
    const updateBg = () => {
        bg.style.backgroundImage = `url('${photos[i]}')`;
        bg.style.transition = 'none';
        bg.style.transform = 'scale(1)';
        bg.offsetHeight;
        bg.style.transition = 'transform 10s linear, background-image 2s ease-in-out';
        bg.style.transform = 'scale(1.1)';
        i = (i + 1) % photos.length;
    };
    
    updateBg();
    playerPhotoInterval = setInterval(updateBg, 5000);
}

function startWaveformAnimation() {
    const bars = document.querySelectorAll('.waveform-container .waveform-bar');
    bars.forEach((bar, idx) => {
        bar.classList.add('waveform-anim');
        bar.style.animationDelay = `${idx * 0.1}s`;
    });
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    clearInterval(playerPhotoInterval);
}

function closeAudioPlayer() {
    const overlay = document.getElementById('audio-player-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.classList.add('hidden');
        stopAudio();
    }, 1000);
}


// --- Memories Mood Engine Logic ---
const moodData = {
    happy: {
        chats: [
            "Screenshot_2026-05-01-13-02-34-98_1c337646f29875672b5a61192b9010f9.jpg",
            "Screenshot_2026-05-07-19-39-17-18_1c337646f29875672b5a61192b9010f9.jpg",
            "Screenshot_2026-05-07-19-39-43-97_1c337646f29875672b5a61192b9010f9.jpg"
        ],
        quote: "Namma sirippu, sandai, memories ellam ennoda life oda best part 🥺💕",
        theme: "happy-theme"
    },
    sad: {
        chats: [
            "Screenshot_2026-05-01-13-02-57-08_1c337646f29875672b5a61192b9010f9.jpg",
            "Screenshot_2026-05-01-13-03-26-75_1c337646f29875672b5a61192b9010f9.jpg",
            "Screenshot_2026-05-07-19-39-33-01_1c337646f29875672b5a61192b9010f9.jpg"
        ],
        quote: "Enaku unna romba pidikkum. Ne engita sanda podra… but always know I am here. ❤️",
        theme: "sad-theme"
    }
};

let currentMood = 'happy';

function initMoodEngine() {
    const openBtn = document.getElementById('open-mood-engine-btn');
    if (!openBtn) return;

    openBtn.addEventListener('click', openMoodEngine);
    document.getElementById('close-mood-btn').addEventListener('click', closeMoodEngine);
    document.getElementById('happy-mood-btn').addEventListener('click', () => setMood('happy'));
    document.getElementById('sad-mood-btn').addEventListener('click', () => setMood('sad'));
}

async function openMoodEngine() {
    const transition = document.getElementById('mood-transition-overlay');
    transition.classList.remove('hidden');
    transition.style.opacity = '1';
    transition.querySelector('.cinematic-text').classList.add('cinematic-active');

    setTimeout(() => {
        transition.style.opacity = '0';
        document.getElementById('mood-engine-section').classList.remove('hidden');
        document.getElementById('main-section').classList.add('hidden');
        setMood('happy'); // default
        
        setTimeout(() => {
            transition.classList.add('hidden');
            transition.querySelector('.cinematic-text').classList.remove('cinematic-active');
        }, 1000);
    }, 3500);
}

function closeMoodEngine() {
    document.getElementById('mood-engine-section').classList.add('hidden');
    document.getElementById('main-section').classList.remove('hidden');
}

function setMood(mode) {
    currentMood = mode;
    const data = moodData[mode];
    
    // Update Theme
    const bg = document.getElementById('mood-bg');
    bg.className = 'mood-bg ' + data.theme;
    
    // Update Tabs
    document.getElementById('happy-mood-btn').classList.toggle('active', mode === 'happy');
    document.getElementById('sad-mood-btn').classList.toggle('active', mode === 'sad');
    
    // Update Content
    document.getElementById('mood-quote').innerText = data.quote;
    renderMoodChats(data.chats);
}

function renderMoodChats(chats) {
    const slider = document.getElementById('chat-slider');
    slider.innerHTML = '';
    slider.style.transform = 'translateX(0)';

    chats.forEach((chat, idx) => {
        const frame = document.createElement('div');
        frame.className = `chat-frame ${idx === 0 ? 'active' : ''}`;
        frame.innerHTML = `<img src="${chat}" alt="Chat Memory">`;
        
        frame.addEventListener('click', () => {
            // Focus on this chat
            document.querySelectorAll('.chat-frame').forEach(f => f.classList.remove('active'));
            frame.classList.add('active');
            
            // Center the slider
            const offset = -(idx * 310); // frame width + gap
            slider.style.transform = `translateX(${offset}px)`;
        });
        
        slider.appendChild(frame);
    });
}


// Consolidated Initialization
function startSurpriseApp() {
    console.log("Surprise App Initializing...");
    initVoices();
    initMoodEngine();
}

// Call init on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSurpriseApp);
} else {
    startSurpriseApp();
}
