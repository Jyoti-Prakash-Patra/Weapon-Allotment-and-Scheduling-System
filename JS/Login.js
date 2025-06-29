// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const empID = document.getElementById("empID").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (empID === "DRDO2501" && password === "drdo@2025") {
//     sessionStorage.setItem("isLoggedIn", "true");
//     window.location.href = "index.html?login=success";
//   } else {
//     document.getElementById("errorMsg").innerText = "Invalid credentials. Try again.";
//   }
// });

// function togglePassword() {
//   const passwordField = document.getElementById("password");
//   const toggleIcon = document.querySelector(".toggle-password");
//   const type = passwordField.getAttribute("type");

//   if (type === "password") {
//     passwordField.setAttribute("type", "text");
//     toggleIcon.textContent = "👁️‍🗨️";
//   } else {
//     passwordField.setAttribute("type", "password");
//     toggleIcon.textContent = "👁️";
//   }
// }



const loginForm = document.getElementById("loginForm");
const empIDInput = document.getElementById("empID");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const togglePasswordBtn = document.querySelector(".toggle-password");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const empID = empIDInput.value.trim();
  const password = passwordInput.value.trim();

  if (empID === "DRDO2501" && password === "drdo@2025") {
    sessionStorage.setItem("isLoggedIn", "true");
    errorMsg.innerText = "";
    // Correct relative path to index.html in /HTML folder
    window.location.href = "index.html?login=success";
  } else {
    errorMsg.innerText = "Invalid credentials. Try again.";
  }
});

// Clear error message when user starts typing again
empIDInput.addEventListener("input", () => {
  errorMsg.innerText = "";
});
passwordInput.addEventListener("input", () => {
  errorMsg.innerText = "";
});

// Toggle password visibility
togglePasswordBtn.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type");
  if (type === "password") {
    passwordInput.setAttribute("type", "text");
    togglePasswordBtn.textContent = "👁️‍🗨️";
  } else {
    passwordInput.setAttribute("type", "password");
    togglePasswordBtn.textContent = "👁️";
  }
});
