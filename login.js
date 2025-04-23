const form = document.getElementById("loginForm");
const progressBar = document.getElementById("progressBar");
const errorMsg = document.getElementById("errorMsg");
const loginButton = document.querySelector("button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const validUser = "admin";
  const validPass = "1234";

  if (username === validUser && password === validPass) {
    errorMsg.textContent = "";
    loginButton.style.display = "none"; // 🔥 Hides the button
    progressBar.style.width = "100%";
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1300);
  } else {
    progressBar.style.width = "0%";
    errorMsg.textContent = "Invalid username or password!";
  }
});
