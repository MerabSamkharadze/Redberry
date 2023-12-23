const getElement = (elementId) => document.getElementById(elementId);

const loginButton = getElement("login-button");
const overlay = getElement("overlay");
const loginForm = getElement("login-form");
const closeIcon = getElement("close-icon");

loginButton.addEventListener("click", () => {
  overlay.classList.remove("invincible");
  loginForm.classList.remove("invincible");
});

overlay.addEventListener("click", () => {
  overlay.classList.add("invincible");
  loginForm.classList.add("invincible");
});

closeIcon.addEventListener("click", () => {
  overlay.classList.add("invincible");
  loginForm.classList.add("invincible");
});
