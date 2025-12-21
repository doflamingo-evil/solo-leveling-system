/* ================================
   SOLO LEVELING SYSTEM — app.js
   ================================ */

/* ---------- SCREEN CONTROL ---------- */
const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

/* ---------- LOAD HUNTER ---------- */
let hunter = JSON.parse(localStorage.getItem("hunter"));

document.addEventListener("DOMContentLoaded", () => {
  if (!hunter) {
    showScreen("landing");
  } else {
    loadHome();
    showScreen("home");
  }
});

/* ---------- LANDING → MODAL ---------- */
const startBtn = document.getElementById("startBtn");
const setupModal = document.getElementById("setupModal");
const nextBtn = document.getElementById("nextTostats");
startBtn.addEventListener("click", () => {
  // show modal
  setupModal.classList.remove("hidden");

  // hide Get Started button
  startBtn.style.opacity = "0";
  startBtn.style.pointerEvents = "none";
});
nextBtn.addEventListener("click", () => {
  // hide modal
  setupModal.classList.add("hidden");

  // OPTIONAL: if you ever want to show button again
  // (for back navigation later)
  startBtn.style.opacity = "1";
  startBtn.style.pointerEvents = "auto";
});

/* ---------- BASIC INFO → STATS ---------- */
document.getElementById("nextToStats")?.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const age = document.getElementById("ageInput").value;
  const weight = document.getElementById("weightInput").value;

  if (!name || !age) {
    alert("Hunter name and age are required");
    return;
  }

  hunter = {
    name,
    age,
    weight,
    level: 1,
    xp: 0,
    xpMax: 100,
    stats: {
      strength: { level: 1, xp: 0 },
      vitality: { level: 1, xp: 0 },
      discipline: { level: 1, xp: 0 }
    }
  };

  localStorage.setItem("hunter", JSON.stringify(hunter));

  setupModal.classList.add("hidden");
  buildStatsUI();
  showScreen("statSetup");
});

/* ---------- STAT SETUP ---------- */
const statsList = document.getElementById("statsList");

function buildStatsUI() {
  statsList.innerHTML = "";

  Object.keys(hunter.stats).forEach(stat => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${stat.toUpperCase()}</strong> (Lv ${hunter.stats[stat].level})`;
    statsList.appendChild(div);
  });
}

document.getElementById("addStatBtn")?.addEventListener("click", () => {
  const statName = document.getElementById("customStatInput").value.trim().toLowerCase();
  if (!statName || hunter.stats[statName]) return;

  hunter.stats[statName] = { level: 1, xp: 0 };
  localStorage.setItem("hunter", JSON.stringify(hunter));
  buildStatsUI();
  document.getElementById("customStatInput").value = "";
});

document.getElementById("finishSetup")?.addEventListener("click", () => {
  localStorage.setItem("hunter", JSON.stringify(hunter));
  loadHome();
  showScreen("home");
});

/* ---------- HOME / PROFILE ---------- */
function loadHome() {
  document.getElementById("home").innerHTML = `
    <h2>Hunter Profile</h2>

    <p><strong>Name:</strong> ${hunter.name}</p>
    <p><strong>Level:</strong> ${hunter.level}</p>
    <p><strong>XP:</strong> ${hunter.xp} / ${hunter.xpMax}</p>

    <div class="xp-bar">
      <div id="xpFill" style="width:${(hunter.xp / hunter.xpMax) * 100}%"></div>
    </div>

    <h3>Stats</h3>
    ${Object.keys(hunter.stats).map(stat => `
      <p>${stat.toUpperCase()} — Lv ${hunter.stats[stat].level}</p>
    `).join("")}

    <button onclick="gainXP(25)">Complete Quest (+XP)</button>
  `;
}

/* ---------- XP SYSTEM ---------- */
function gainXP(amount) {
  hunter.xp += amount;

  while (hunter.xp >= hunter.xpMax) {
    hunter.xp -= hunter.xpMax;
    hunter.level++;
    hunter.xpMax = Math.floor(hunter.xpMax * 1.25);
  }

  localStorage.setItem("hunter", JSON.stringify(hunter));
  loadHome();
}

/* ---------- DEV TOOL ---------- */
window.resetSystem = function () {
  localStorage.clear();
  location.reload();
};
