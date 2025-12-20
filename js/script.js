// SOLO LEVELING SYSTEM CORE

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Load hunter
const hunter = JSON.parse(localStorage.getItem("hunter"));

// Initial screen logic
if (!hunter) {
  showScreen("landing");
} else {
  showScreen("home");
}

// Get Started
document.getElementById("startBtn")?.addEventListener("click", () => {
  showScreen("register");
});

// Save hunter
document.getElementById("saveHunter")?.addEventListener("click", () => {
  const name = document.getElementById("hunterName").value;
  const age = document.getElementById("hunterAge").value;
  const weight = document.getElementById("hunterWeight").value;

  if (!name || !age) return alert("Fill required fields");

  const hunterData = {
    name,
    age,
    weight,
    level: 1,
    xp: 0,
    stats: {
      strength: { level: 1, xp: 0 },
      vitality: { level: 1, xp: 0 },
      discipline: { level: 1, xp: 0 }
    }
  };

  localStorage.setItem("hunter", JSON.stringify(hunterData));
  showScreen("home");
});

// DEV RESET
window.resetSystem = () => {
  localStorage.clear();
  location.reload();
};
