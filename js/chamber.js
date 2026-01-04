let hunter = JSON.parse(localStorage.getItem("hunter"));

function openChamber(name) {
  document.querySelectorAll(".chamber").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  document.getElementById(name).classList.add("active");
  event.target.classList.add("active");
}

function gainStatXP(stat, amount) {
  hunter.stats[stat]++;
  hunter.xp += amount;

  localStorage.setItem("hunter", JSON.stringify(hunter));
  alert(`SYSTEM: ${stat.toUpperCase()} increased`);
}

function completeQuest(xp) {
  hunter.xp += xp;
  localStorage.setItem("hunter", JSON.stringify(hunter));
  alert("SYSTEM: QUEST COMPLETED");
}
