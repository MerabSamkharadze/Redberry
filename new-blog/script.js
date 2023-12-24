const author = getElement("author-input");
const header = getElement("header-input");
const description = getElement("description-input");
const emailInput = getElement("new-email-input");
const errorEmail = getElement("error-email");
const date = getElement("date-input");

if (loggedIn === null || loggedIn === false) {
  window.location.href = "/";
}

author.addEventListener("keyup", (e) => {
  const filters = e.target.nextElementSibling.children;

  if (e.target.value.trim().split(" ").join("").length < 4) {
    filters[0].style.color = "#EA1919";
    author.style.background = "#FAF2F3";
    author.style.border = "1px solid #EA1919";
  } else if (e.target.value.trim().split(" ").join("").length > 3) {
    filters[0].style.color = "#14D81C";
  }

  if (e.target.value.trim().split(" ").length < 2) {
    filters[1].style.color = "#EA1919";
    author.style.background = "#FAF2F3";
    author.style.border = "1px solid #EA1919";
  } else if (e.target.value.trim().split(" ").length > 1) {
    filters[1].style.color = "#14D81C";
  }

  if (!/^[ა-ჰ ]+$/.test(e.target.value)) {
    filters[2].style.color = "#EA1919";
    author.style.background = "#FAF2F3";
    author.style.border = "1px solid #EA1919";
  } else if (/^[ა-ჰ ]+$/.test(e.target.value)) {
    filters[2].style.color = "#14D81C";
  }

  if (
    e.target.value.trim().split(" ").join("").length > 3 &&
    /^[ა-ჰ ]+$/.test(e.target.value) &&
    e.target.value.trim().split(" ").length > 1
  ) {
    author.style.background = "#F8FFF8";
    author.style.border = "1px solid #14D81C";
  }
});

header.addEventListener("keyup", (e) => {
  const filters = e.target.nextElementSibling;

  if (e.target.value.trim().split(" ").join("").length < 4) {
    filters.style.color = "#EA1919";
    header.style.background = "#FAF2F3";
    header.style.border = "1px solid #EA1919";
  } else if (e.target.value.trim().split(" ").join("").length > 3) {
    filters.style.color = "#14D81C";
    header.style.background = "#F8FFF8";
    header.style.border = "1px solid #14D81C";
  }
});

description.addEventListener("keyup", (e) => {
  const filters = e.target.nextElementSibling;

  if (e.target.value.trim().split(" ").join("").length < 4) {
    filters.style.color = "#EA1919";
    description.style.background = "#FAF2F3";
    description.style.border = "1px solid #EA1919";
  } else if (e.target.value.trim().split(" ").join("").length > 3) {
    filters.style.color = "#14D81C";
    description.style.background = "#F8FFF8";
    description.style.border = "1px solid #14D81C";
  }
});

emailInput.addEventListener("keyup", (e) => {
  if (e.target.value.endsWith("@redberry.ge")) {
    errorEmail.classList.add("invincible");
    emailInput.style.background = "#F8FFF8";
    emailInput.style.border = "1px solid #14D81C";
  } else {
    errorEmail.classList.remove("invincible");
    errorEmail.lastElementChild.innerText =
      "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";

    emailInput.style.background = "#FAF2F3";
    emailInput.style.border = "1px solid #EA1919";
  }
});

date.addEventListener("change", (e) => {
  if (e.target.value === "") {
    date.style.background = "#FAF2F3";
    date.style.border = "1px solid #EA1919";
  } else {
    date.style.background = "#F8FFF8";
    date.style.border = "1px solid #14D81C";
  }
});
