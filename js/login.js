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

  const savedAccount = localStorage.getItem("hunterAccount");

  if (!savedAccount) {
    alert("SYSTEM: NO ACCOUNT FOUND");
    return;
  }

  const account = JSON.parse(savedAccount);

  if (email !== account.email || pass !== account.password) {
    alert("SYSTEM: ACCESS DENIED");
    return;
  }

  // ✅ SESSION CREATED
  localStorage.setItem("loggedIn", "true");

  alert("SYSTEM: ACCESS GRANTED");
  window.location.href = "chambers.html";
}

function createAccount() {
  const email = createEmail.value.trim();
  const pass = createPassword.value.trim();

  if (!email || !pass) {
    alert("SYSTEM: Input Required");
    return;
  }

  if (!email.includes("@")) {
    alert("SYSTEM: Invalid Email");
    return;
  }

  // save account locally
  const account = {
    email: email,
    password: pass,
    xp: 0,
    stats: {
      strength: 1,
      vitality: 1,
      discipline: 1
    }
  };

  localStorage.setItem("hunterAccount", JSON.stringify(account));

  alert("SYSTEM: ACCOUNT CREATED");
  showLogin();
}
