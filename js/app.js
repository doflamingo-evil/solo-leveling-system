document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start-btn");
  const overlay = document.getElementById("systemOverlay");
  const popup = document.querySelector(".system-card");

  startBtn.addEventListener("click", () => {

    // 1️⃣ Slow-motion zoom on whole screen
    document.body.classList.add("system-zoom");

    // 2️⃣ Screen shake (from previous step)
    document.body.classList.add("shake");

    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 450);

    // 3️⃣ Open popup slightly after zoom starts
    setTimeout(() => {
      overlay.classList.remove("hidden");
      popup.classList.add("system-popup");
    }, 280);

    // Cleanup zoom class
    setTimeout(() => {
      document.body.classList.remove("system-zoom");
    }, 700);
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
