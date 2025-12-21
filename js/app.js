const screens = document.querySelectorAll(".screen");
const modal = document.getElementById("authModal");

function show(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

loginBtn.onclick = () => modal.classList.remove("hidden");
registerBtn.onclick = () => {
  modal.classList.remove("hidden");
  authTitle.textContent = "Create Account";
};

authNext.onclick = () => {
  modal.classList.add("hidden");
  show("basicInfo");
};

toStats.onclick = () => show("statsSetup");
finishSetup.onclick = () => show("profile");
