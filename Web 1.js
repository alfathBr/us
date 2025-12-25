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

/* LOVE TIME COUNTER */
const startDate = new Date(2025, 0, 6, 21, 0, 0); 
// Januari = 0

function updateLoveTime() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  if (hours < 0) {
    hours += 24;
    days--;
  }

  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  document.getElementById("loveTime").innerHTML =
    `💖 Kita sudah bersama selama<br>
     <strong>
     ${years} tahun · ${months} bulan · ${days} hari<br>
     ${hours} jam · ${minutes} menit · ${seconds} detik
     </strong>`;
}

setInterval(updateLoveTime, 1000);
updateLoveTime();
