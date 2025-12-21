let level = 1;
let xp = 0;
let xpMax = 100;

function getRank(lv) {
  if (lv >= 110) return ["MONARCH", "rank-M"];
  if (lv >= 90) return ["S-INTERNATIONAL", "rank-SI"];
  if (lv >= 70) return ["S-NATIONAL", "rank-SN"];
  if (lv >= 50) return ["S-RANK", "rank-S"];
  if (lv >= 40) return ["A-RANK", "rank-A"];
  if (lv >= 30) return ["B-RANK", "rank-B"];
  if (lv >= 20) return ["C-RANK", "rank-C"];
  if (lv >= 10) return ["D-RANK", "rank-D"];
  return ["E-RANK", "rank-E"];
}

function updateXP() {
  document.getElementById("level").textContent = level;
  document.getElementById("xp").textContent = xp;
  document.getElementById("xpMax").textContent = xpMax;

  document.getElementById("xpFill").style.width =
    Math.min((xp / xpMax) * 100, 100) + "%";

  const [rankText, rankClass] = getRank(level);
  const badge = document.getElementById("rankBadge");

  badge.textContent = rankText;
  badge.className = "rank-badge " + rankClass;
}

function gainXP(amount = 25) {
  xp += amount;

  while (xp >= xpMax) {
    xp -= xpMax;
    level++;
    xpMax = Math.floor(xpMax * 1.25);
  }

  updateXP();
}

// TEST BUTTON (temporary)
document.addEventListener("DOMContentLoaded", () => {
  updateXP();

  // auto test every 3 sec
  setInterval(() => gainXP(20), 3000);
});
