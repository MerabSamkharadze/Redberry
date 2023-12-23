const getElement = (elementId) => document.getElementById(elementId);

const loginButton = getElement("login-button");
const overlay = getElement("overlay");
const loginForm = getElement("login-form");
const successButton = getElement("success-button");
const loginInput = getElement("login-input");
const formButton = getElement("form-button");
const closeIcon = getElement("close-icon");
const loginModal = getElement("login-modal");
const successModal = getElement("success-modal");
const blogAddButton = getElement("blog-add-button");
const error = getElement("error");

const loginUser = async (value) => {
  const res = await fetch("https://api.blog.redberryinternship.ge/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: value,
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 204) {
    loginModal.classList.add("invincible");
    successModal.classList.remove("invincible");
    localStorage.setItem("login", true);
    blogAddButton.classList.remove("invincible");
    loginButton.classList.add("invincible");
  } else {
    error.classList.remove("invincible");
    error.lastElementChild.innerText = "ელ-ფოსტა არ მოიძებნა";
  }
};

loginButton.addEventListener("click", () => {
  overlay.classList.remove("invincible");
  loginForm.classList.remove("invincible");
});

successButton.addEventListener("click", () => {
  overlay.classList.add("invincible");
  loginForm.classList.add("invincible");
});

overlay.addEventListener("click", () => {
  overlay.classList.add("invincible");
  loginForm.classList.add("invincible");
});

closeIcon.addEventListener("click", () => {
  overlay.classList.add("invincible");
  loginForm.classList.add("invincible");
});

formButton.addEventListener("click", () => {
  if (loginInput.value.trim() === "") {
    error.classList.remove("invincible");
    error.lastElementChild.innerText = "ველი სავალდებულოა";
    return;
  } else if (!loginInput.value.endsWith("@redberry.ge")) {
    return;
  }

  loginUser(loginInput.value);
});

loginInput.addEventListener("keyup", (e) => {
  if (e.target.value.endsWith("@redberry.ge")) {
    error.classList.add("invincible");
  } else {
    error.classList.remove("invincible");
    error.lastElementChild.innerText =
      "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
  }
});

const loggedIn = JSON.parse(localStorage.getItem("login"));

if (loggedIn) {
  blogAddButton.classList.remove("invincible");
  loginButton.classList.add("invincible");
} else {
  blogAddButton.classList.add("invincible");
  loginButton.classList.remove("invincible");
}
