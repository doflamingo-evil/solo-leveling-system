/* ===============================
   SOLO LEVELING SYSTEM — CORE
   =============================== */

/* ---------- SCREEN CONTROL ---------- */
const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

/* ---------- MODAL ---------- */
const setupModal = document.getElementById("setupModal");

/* ---------- BUTTONS ---------- */
const startBtn = document.getElementById("startBtn");
const nextToStatsBtn = document.getElementById("nextToStats");

/* ---------- INPUTS ---------- */
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const weightInput = document.getElementById("weightInput");

/* ---------- GLOBAL DATA ---------- */
let hunter = null;

/* ---------- INITIAL LOAD ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const savedHunter = localStorage.getItem("hunter");

  if (savedHunter) {
    hunter = JSON.parse(savedHunter);
    loadHome();
    showScreen("home");
  } else {
    showScreen("landing");
  }
});

/* ---------- LANDING → MODAL ---------- */
if (startBtn) {
  startBtn.addEventListener("click", () => {
    setupModal.classList.add("show"); // animation
  });
}

/* ---------- BASIC INFO → STATS ---------- */
if (nextToStatsBtn) {
  nextToStatsBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const weight = weightInput.value.trim();

    // 🔴 VALIDATION (CRITICAL)
    if (!name || !age) {
      alert("Hunter name and age are required");
      return; // ⛔ STOP FLOW
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

    setupModal.classList.remove("show");
    showScreen("home");
    loadHome();
  });
}

/* ---------- LOAD HOME ---------- */
function loadHome() {
  if (!hunter) return;

  const nameEl = document.getElementById("hunterName");
  const levelEl = document.getElementById("level");
  const xpEl = document.getElementById("xp");
  const xpMaxEl = document.getElementById("xpMax");
  const xpFill = document.getElementById("xpFill");
  const rankBadge = document.getElementById("rankBadge");

  if (nameEl) nameEl.textContent = hunter.name;
  if (levelEl) levelEl.textContent = hunter.level;
  if (xpEl) xpEl.textContent = hunter.xp;
  if (xpMaxEl) xpMaxEl.textContent = hunter.xpMax;

  if (xpFill) {
    const percent = (hunter.xp / hunter.xpMax) * 100;
    xpFill.style.width = percent + "%";
  }

  if (rankBadge) {
    rankBadge.textContent = getRank(hunter.level);
  }
}

/* ---------- XP SYSTEM ---------- */
window.gainXP = function (amount = 25) {
  if (!hunter) return;

  hunter.xp += amount;

  if (hunter.xp >= hunter.xpMax) {
    hunter.xp -= hunter.xpMax;
    hunter.level++;
    hunter.xpMax += 50;
  }

  localStorage.setItem("hunter", JSON.stringify(hunter));
  loadHome();
};

/* ---------- RANK SYSTEM ---------- */
function getRank(level) {
  if (level >= 110) return "MONARCH";
  if (level >= 90) return "EMPEROR";
  if (level >= 70) return "S-INTERNATIONAL";
  if (level >= 60) return "S-NATIONAL";
  if (level >= 50) return "S-RANK";
  if (level >= 40) return "A-RANK";
  if (level >= 30) return "B-RANK";
  if (level >= 20) return "C-RANK";
  if (level >= 10) return "D-RANK";
  return "E-RANK";
}

/* ---------- DEV RESET (OPTIONAL) ---------- */
window.resetSystem = function () {
  localStorage.clear();
  location.reload();
};
