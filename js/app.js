/* ================================
   SOLO LEVELING SYSTEM — app.js
   ================================ */

/* ---------- SCREEN CONTROL ---------- */

/* ---------- LOAD HUNTER ---------- */

/* ---------- LANDING → MODAL ---------- */
document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const setupModal = document.getElementById("setupModal");
  const nextBtn = document.getElementById("nextToStats");
  const landing = document.getElementById("landing");
  const home = document.getElementById("home");

  // GET STARTED → OPEN MODAL
  startBtn.addEventListener("click", () => {
    setupModal.classList.remove("hidden");
    startBtn.style.opacity = "0";
    startBtn.style.pointerEvents = "none";
  });

  // SAVE BASIC INFO
  nextBtn.addEventListener("click", () => {

    const name = document.getElementById("nameInput").value.trim();
    const age = document.getElementById("ageInput").value;
    const weight = document.getElementById("weightInput").value;

    if (!name || !age) {
      alert("Hunter name and age are required");
      return;
    }

    const hunter = {
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

    // CLOSE MODAL + MOVE TO HOME
    setupModal.classList.add("hidden");
    landing.classList.remove("active");
    landing.style.display = "none";

    home.classList.add("active");
    home.style.display = "block";

    // UPDATE PROFILE UI
    document.getElementById("hunterName").textContent = hunter.name;
  });

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
