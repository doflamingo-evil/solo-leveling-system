/* ===============================
   ARCANE ASCENT — CORE SYSTEM
   =============================== */

/* ---------- UTIL ---------- */
const $ = (id) => document.getElementById(id);

/* ---------- SCREENS ---------- */
const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => {
    s.classList.remove("active");
    s.classList.add("hidden");
  });

  const target = $(id);
  if (target) {
    target.classList.remove("hidden");
    target.classList.add("active");
  }
}

/* ---------- ELEMENTS ---------- */
const landing = $("landing");
const startBtn = $("startBtn");

const authModal = $("authModal");
const authTitle = $("authTitle");
const authActionBtn = $("authActionBtn");
const toggleAuth = $("toggleAuth");

const emailInput = $("emailInput");
const passwordInput = $("passwordInput");

const basicInfo = $("basicInfo");
const statSetup = $("statSetup");
const home = $("home");

const nameInput = $("nameInput");
const ageInput = $("ageInput");
const weightInput = $("weightInput");

/* ---------- STATE ---------- */
let isLoginMode = true;
let hunter = JSON.parse(localStorage.getItem("hunter")) || null;

/* ---------- INITIAL LOAD ---------- */
window.addEventListener("load", () => {
  if (hunter) {
    loadProfile();
    showScreen("home");
  } else {
    showScreen("landing");
  }
});

/* ---------- LANDING → AUTH ---------- */
startBtn.addEventListener("click", () => {
  authModal.classList.remove("hidden");
});

/* ---------- LOGIN / CREATE TOGGLE ---------- */
toggleAuth.addEventListener("click", () => {
  isLoginMode = !isLoginMode;

  authTitle.textContent = isLoginMode ? "Login" : "Create Account";
  authActionBtn.textContent = isLoginMode ? "Login" : "Create Account";
  toggleAuth.textContent = isLoginMode ? "Create account" : "Back to login";
});

/* ---------- AUTH ACTION ---------- */
authActionBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  if (!isLoginMode) {
    // CREATE ACCOUNT
    localStorage.setItem("auth", JSON.stringify({ email, password }));
  } else {
    // LOGIN
    const saved = JSON.parse(localStorage.getItem("auth"));
    if (!saved || saved.email !== email || saved.password !== password) {
      alert("Invalid login credentials");
      return;
    }
  }

  authModal.classList.add("hidden");
  showScreen("basicInfo");
});

/* ---------- BASIC INFO → STATS ---------- */
$("continueToStats").addEventListener("click", () => {
  const name = nameInput.value.trim();
  const age = ageInput.value;
  const weight = weightInput.value;

  if (!name || !age) {
    alert("Name and age are required");
    return;
  }

  hunter = {
    name,
    age,
    weight,
    level: 1,
    xp: 0,
    xpMax: 100,
    rank: "E",
    stats: {
      strength: { level: 1, xp: 0 },
      vitality: { level: 1, xp: 0 },
      discipline: { level: 1, xp: 0 }
    }
  };

  localStorage.setItem("hunter", JSON.stringify(hunter));
  showScreen("statSetup");
});

/* ---------- STATS SETUP ---------- */
$("addStatBtn").addEventListener("click", () => {
  const input = $("customStatInput");
  const statName = input.value.trim().toLowerCase();

  if (!statName) return;
  if (hunter.stats[statName]) {
    alert("Stat already exists");
    return;
  }

  hunter.stats[statName] = { level: 1, xp: 0 };
  input.value = "";
  renderStats();
  saveHunter();
});

$("finishSetup").addEventListener("click", () => {
  showScreen("home");
  loadProfile();
});

/* ---------- PROFILE ---------- */
function loadProfile() {
  $("profileName").textContent = hunter.name;
  $("level").textContent = hunter.level;
  $("xp").textContent = hunter.xp;
  $("xpMax").textContent = hunter.xpMax;
  $("rankBadge").textContent = hunter.rank + "-RANK";
  updateXPBar();
}

/* ---------- XP SYSTEM ---------- */
$("testXP").addEventListener("click", () => {
  gainXP(25);
});

function gainXP(amount) {
  hunter.xp += amount;

  if (hunter.xp >= hunter.xpMax) {
    hunter.xp -= hunter.xpMax;
    hunter.level++;
    hunter.xpMax += 25;
    updateRank();
  }

  saveHunter();
  loadProfile();
}

function updateXPBar() {
  const percent = (hunter.xp / hunter.xpMax) * 100;
  $("xpFill").style.width = percent + "%";
}

/* ---------- RANK SYSTEM ---------- */
function updateRank() {
  const lvl = hunter.level;

  if (lvl >= 110) hunter.rank = "MONARCH";
  else if (lvl >= 90) hunter.rank = "EMPEROR";
  else if (lvl >= 70) hunter.rank = "INTERNATIONAL";
  else if (lvl >= 60) hunter.rank = "NATIONAL";
  else if (lvl >= 50) hunter.rank = "S";
  else if (lvl >= 40) hunter.rank = "A";
  else if (lvl >= 30) hunter.rank = "B";
  else if (lvl >= 20) hunter.rank = "C";
  else if (lvl >= 10) hunter.rank = "D";
  else hunter.rank = "E";
}

/* ---------- HELPERS ---------- */
function renderStats() {
  const container = $("statsList");
  container.innerHTML = "";

  Object.keys(hunter.stats).forEach(stat => {
    const div = document.createElement("div");
    div.textContent = `${stat.toUpperCase()} — Lv ${hunter.stats[stat].level}`;
    container.appendChild(div);
  });
}

function saveHunter() {
  localStorage.setItem("hunter", JSON.stringify(hunter));
}

/* ---------- DEV RESET ---------- */
window.resetSystem = () => {
  localStorage.clear();
  location.reload();
};
