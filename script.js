const CONFIG = {
    password: "18042024", 
    typingSpeed: 95,     
    heartSpawnRate: 350,  
    message: "Happy Valentine’s my sweet, beautiful Aisha.\n\nYou always make every day feel special, even the bad ones, and I am so grateful to have you.\n\nI love you so much my pweety Pwincess!🥹❤️"
};

const elements = {
    loginContainer: document.getElementById("login"),
    noteContainer: document.getElementById("note"),
    passwordInput: document.getElementById("password"),
    errorMsg: document.getElementById("error"),
    noteText: document.getElementById("noteText"),
    unlockBtn: document.getElementById("unlockBtn"),
    heartLock: document.getElementById("heartLock"), 
    background: document.getElementById("bg"),
    bgMusic: document.getElementById("bgMusic"),
    bgVideo: document.getElementById("bgVideo")
};

// 1. HEART ANIMATION (Always runs in background)
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    const startLeft = Math.random() * 100;
    const size = 15 + Math.random() * 20; 
    const duration = 6 + Math.random() * 6;
    heart.style.left = startLeft + "vw";
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.animationDuration = duration + "s";
    if (elements.background) elements.background.appendChild(heart);
    setTimeout(() => { heart.remove(); }, duration * 1000);
}
setInterval(createHeart, CONFIG.heartSpawnRate);

// 2. PASSWORD CHECKING
function checkPassword() {
    const userInput = elements.passwordInput.value.replace(/[^0-9]/g, "");
    
    // Only triggers if password is correct
    if (userInput === CONFIG.password) {
        unlockSurprise();
    } else {
        elements.errorMsg.textContent = "Wrong date! Try again 💔";
        elements.passwordInput.classList.add("shake-animation");
        setTimeout(() => elements.passwordInput.classList.remove("shake-animation"), 500);
        elements.passwordInput.value = ""; // Clear the wrong input
    }
}

// 3. THE SURPRISE TRIGGER
function unlockSurprise() {
    // START MUSIC (Only on success)
    if (elements.bgMusic) {
        elements.bgMusic.play().catch(e => console.log("Audio play blocked: ", e));
    }

    // START VIDEO (Only on success)
    if (elements.bgVideo) {
        elements.bgVideo.playbackRate = 0.5; // Slower playback
        elements.bgVideo.play();
        elements.bgVideo.style.opacity = "0.3"; // Fade in at low opacity
    }

    // Lock PNG pop animation
    elements.heartLock.classList.add("heart-unlock-anim");
    elements.passwordInput.style.opacity = "0";
    elements.unlockBtn.style.opacity = "0";

    // Transition to the note
    setTimeout(() => {
        elements.loginContainer.style.transition = "opacity 0.8s ease";
        elements.loginContainer.style.opacity = "0";

        setTimeout(() => {
            elements.loginContainer.style.display = "none";
            elements.noteContainer.style.display = "block";
            elements.noteContainer.style.opacity = "0";
            
            setTimeout(() => {
                elements.noteContainer.style.transition = "opacity 1.5s ease";
                elements.noteContainer.style.opacity = "1";
                typeMessage(CONFIG.message); 
            }, 100);
        }, 800);
    }, 600); 
}

function typeMessage(text) {
    elements.noteText.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
        if (text.charAt(i) === "\n") {
            elements.noteText.innerHTML += "<br>";
        } else {
            elements.noteText.innerHTML += text.charAt(i);
        }
        i++;
        if (i >= text.length) clearInterval(interval);
    }, CONFIG.typingSpeed);
}

// Listeners for click and Enter key
elements.unlockBtn.addEventListener("click", checkPassword);
elements.passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
});
