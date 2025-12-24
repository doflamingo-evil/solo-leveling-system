document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start-btn");
  const overlay = document.getElementById("systemOverlay");

  startBtn.addEventListener("click", () => {
    // Screen shake
    document.body.classList.add("shake");

    // Remove shake after animation
    setTimeout(() => {
      document.body.classList.remove("shake");
    }, 500);

    // Open login after slight delay
    setTimeout(() => {
      overlay.classList.remove("hidden");
    }, 120);
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
