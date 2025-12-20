const motivation = document.getElementById("motivation");
const setupModal = document.getElementById("setupModal");
const statSetup = document.getElementById("statSetup");
const home = document.getElementById("home");

const startBtn = document.getElementById("startBtn");
const nextToStats = document.getElementById("nextToStats");
const finishSetup = document.getElementById("finishSetup");

const statsList = document.getElementById("statsList");
const addStatBtn = document.getElementById("addStatBtn");
const customStatInput = document.getElementById("customStatInput");

// INITIAL DATA
let data = {
  hunter: {},
  stats: {}
};

// MANDATORY STATS
const mandatoryStats = ["Strength", "Vitality", "Discipline"];

// CHECK IF ALREADY SETUP
const saved = loadData();
if (saved) {
  showHome();
}

// EVENTS
startBtn.onclick = () => {
  setupModal.classList.remove("hidden");
};

nextToStats.onclick = () => {
  data.hunter.name = nameInput.value;
  data.hunter.age = ageInput.value;
  data.hunter.weight = weightInput.value;

  setupModal.classList.add("hidden");
  motivation.classList.remove("active");
  statSetup.classList.add("active");

  renderStats();
};

addStatBtn.onclick = () => {
  const stat = customStatInput.value.trim();
  if (!stat || data.stats[stat]) return;

  data.stats[stat] = { xp: 0 };
  customStatInput.value = "";
  renderStats();
};

finishSetup.onclick = () => {
  saveData(data);
  showHome();
};

// FUNCTIONS
function renderStats() {
  statsList.innerHTML = "";

  mandatoryStats.forEach(stat => {
    if (!data.stats[stat]) {
      data.stats[stat] = { xp: 0 };
    }
  });

  Object.keys(data.stats).forEach(stat => {
    const div = document.createElement("div");
    div.textContent = stat;
    statsList.appendChild(div);
  });
}

function showHome() {
  motivation.classList.remove("active");
  statSetup.classList.remove("active");
  home.classList.add("active");
}
