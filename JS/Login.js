document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const empID = document.getElementById("empID").value.trim();
  const password = document.getElementById("password").value.trim();

  if (empID === "DRDO2501" && password === "drdo@2025") {
    sessionStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html?login=success";
  } else {
    document.getElementById("errorMsg").innerText = "Invalid credentials. Try again.";
  }
});

function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");
  const type = passwordField.getAttribute("type");

  if (type === "password") {
    passwordField.setAttribute("type", "text");
    toggleIcon.textContent = "👁️‍🗨️";
  } else {
    passwordField.setAttribute("type", "password");
    toggleIcon.textContent = "👁️";
  }
}
