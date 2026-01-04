document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start-btn");
  const overlay = document.getElementById("systemOverlay");
  const popup = document.querySelector(".system-card");
  const flash = document.getElementById("flash");

  startBtn.addEventListener("click", () => {

    // 1️⃣ Time freeze (blur + brightness)
    document.body.classList.add("freeze");

    // 2️⃣ Blue flash
    flash.classList.add("active");

    // 3️⃣ Screen shake
    document.body.classList.add("shake");
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 450);

    // 4️⃣ Open login popup
    setTimeout(() => {
      overlay.classList.remove("hidden");
      popup.classList.add("system-popup");
    }, 300);

    // Cleanup effects
    setTimeout(() => {
      document.body.classList.remove("freeze");
      flash.classList.remove("active");
    }, 500);
  });
});

function showCreate() {
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("createForm").classList.add("active");
}

function showLogin() {
  document.getElementById("createForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
}

function login() {
  const email = loginEmail.value.trim();
  const pass = loginPassword.value.trim();

  if (!email || !pass) {
    alert("SYSTEM: INPUT REQUIRED");
    return;
  }
  alert("SYSTEM: ACCESS GRANTED");
}

function createAccount() {
  const email = createEmail.value.trim();
  const pass = createPassword.value.trim();

  if (!email || !pass) {
    alert("SYSTEM: INPUT REQUIRED");
    return;
  }
  alert("SYSTEM: ACCOUNT CREATED");
}
