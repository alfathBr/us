const audios = [
    document.getElementById("audio0"),
    document.getElementById("audio1"),
    document.getElementById("audio2")
];

const buttons = document.querySelectorAll(".play-btn");
let started = false;
let current = 1;

/* Auto play lagu tengah */
window.onload = () => {
    createHearts(); // hearts tetap jalan
};

document.addEventListener("click", () => {
    if (!started) {
        audios[current].play();
        updateButtons(current, true);
        started = true;
    }
}, { once: true });


/* Play / Pause */
function playSong(index) {

    // Jika klik lagu yang sama
    if (current === index) {

        if (audios[index].paused) {
            audios[index].play();
            updateButtons(index, true);
        } else {
            audios[index].pause();
            updateButtons(index, false);
        }

        started = true;
        return;
    }

    // Jika pindah lagu
    audios.forEach((audio, i) => {
        audio.pause();
        updateButtons(i, false);
    });

    audios[index].play();
    updateButtons(index, true);
    current = index;
    started = true;
}
function updateButtons(index, isPlaying) {
    if (isPlaying) {
        buttons[index].classList.add("active");
        buttons[index].innerHTML = "⏸ Pause";
    } else {
        buttons[index].classList.remove("active");
        buttons[index].innerHTML = "▶ Play Song";
    }
}


/* Falling Hearts Generator */
function createHearts(){
    const container = document.querySelector(".hearts-container");

    setInterval(()=>{
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (3 + Math.random() * 5) + "s";
        container.appendChild(heart);

        setTimeout(()=>{
            heart.remove();
        },8000);
    },400);
}

const starsContainer = document.querySelector(".stars");
const STAR_COUNT = 180;

for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  const size = Math.random() * 2 + 0.5;
  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  star.style.opacity = Math.random();
  star.style.animationDuration = Math.random() * 3 + 2 + "s";

  starsContainer.appendChild(star);
}

let isClosing = false;


const popupIcon = document.querySelector('.popup-icon');
const popupText = document.querySelector('.popup-text');

const ceritaSections = document.querySelectorAll(
  '#cerita-kita, #cerita-kita-2, #cerita-kita-3, #cerita-kita-4'
);

let ceritaVisibleCount = 0;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

  if (isClosing) return; // ⬅️ STOP total kalau sudah masuk closing

    if (entry.isIntersecting) {
      ceritaVisibleCount++;
    } else {
      ceritaVisibleCount--;
    }

    // clamp supaya tidak minus
    ceritaVisibleCount = Math.max(0, ceritaVisibleCount);

    if (ceritaVisibleCount > 0) {
      popupIcon.textContent = '💖';
      popupText.textContent = 'Our Story';
    } else {
      popupIcon.textContent = '🎵';
      popupText.textContent = 'Our Playlist';
    }
  });
}, {
  threshold: 0.4
});

ceritaSections.forEach(section => observer.observe(section));

// ===== HILANGKAN POPUP SAAT CLOSING =====
const popup = document.getElementById('popup');
const closingSection = document.getElementById('closing-section');

const closingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {


   if (entry.isIntersecting) {
  isClosing = true;          // ⬅️ KUNCI
  popup.classList.add('hide');
} else {
  isClosing = false;
  popup.classList.remove('hide');
}

  });
}, {
  threshold: 0.3
});

closingObserver.observe(closingSection);


