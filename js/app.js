<script>
function openSystem() {
  document.getElementById("systemOverlay").classList.remove("hidden");
}

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
    alert("SYSTEM: Input Required");
    return;
  }

  alert("SYSTEM: Login Successful");
}

function createAccount() {
  const email = createEmail.value.trim();
  const pass = createPassword.value.trim();

  if (!email || !pass) {
    alert("SYSTEM: Input Required");
    return;
  }

  alert("SYSTEM: Account Created");
}
</script>
