let hunter = JSON.parse(localStorage.getItem("hunter")) || {
  name: "HUNTER",
  level: 1,
  xp: 0,
  xpMax: 100,
  stats: {
    strength: 1,
    vitality: 1,
    discipline: 1
  }
};

const ranks = [
  "E-RANK","D-RANK","C-RANK","B-RANK","A-RANK",
  "S-RANK","S-NATIONAL","S-INTERNATIONAL","EMPEROR","MONARCH"
];

function updateUI() {
  hunterName.textContent = hunter.name;
  level.textContent = hunter.level;
  xp.textContent = hunter.xp;
  xpMax.textContent = hunter.xpMax;

  xpFill.style.width = (hunter.xp / hunter.xpMax) * 100 + "%";

  rank.textContent = ranks[Math.min(Math.floor(hunter.level / 10), ranks.length - 1)];

  str.textContent = hunter.stats.strength;
  vit.textContent = hunter.stats.vitality;
  dis.textContent = hunter.stats.discipline;

  localStorage.setItem("hunter", JSON.stringify(hunter));
}

function gainXP() {
  hunter.xp += 25;

  if (hunter.xp >= hunter.xpMax) {
    hunter.xp = 0;
    hunter.level++;
    hunter.xpMax += 20;

    hunter.stats.strength++;
    hunter.stats.vitality++;
    hunter.stats.discipline++;
  }

  updateUI();
}

updateUI();
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
