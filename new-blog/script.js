const apiKey =
  "0ef38445fff55adcfe4bc2d673c9192ecc741377890587ab4b934520c2e908dc";

const author = getElement("author-input");
const header = getElement("header-input");
const description = getElement("description-input");
const emailInput = getElement("new-email-input");
const errorEmail = getElement("error-email");
const date = getElement("date-input");

if (loggedIn === null || loggedIn === false) {
  window.location.href = "/";
}

author.value = localStorage.getItem("author");

header.value = localStorage.getItem("header");

description.value = localStorage.getItem("description");

emailInput.value = localStorage.getItem("email");

date.value = localStorage.getItem("date");

author.addEventListener("keyup", (e) => {
  const filters = e.target.nextElementSibling.children;

  localStorage.setItem("author", e.target.value);

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

  localStorage.setItem("header", e.target.value);

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

  localStorage.setItem("description", e.target.value);

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
  localStorage.setItem("email", e.target.value);

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
  localStorage.setItem("date", e.target.value);

  if (e.target.value === "") {
    date.style.background = "#FAF2F3";
    date.style.border = "1px solid #EA1919";
  } else {
    date.style.background = "#F8FFF8";
    date.style.border = "1px solid #14D81C";
  }
});

const imageFirst = getElement("image-first");
const imageSecond = getElement("image-second");

const imageContainer = getElement("image-container");
const image = getElement("image");
const imageName = getElement("image-name");
const imageDelete = getElement("image-delete-icon");

image.addEventListener("change", (e) => {
  imageContainer.style.height = "56px";
  imageContainer.style.background = "#F2F2FA";
  imageContainer.style.border = "none";

  imageFirst.classList.add("invincible");

  imageSecond.classList.remove("invincible");

  imageName.innerText = e.target.files[0].name;
});

imageDelete.addEventListener("click", () => {
  imageContainer.style.height = "180px";
  imageContainer.style.background = "#f4f3ff";
  imageContainer.style.border = "1px dashed #85858d";

  imageFirst.classList.remove("invincible");

  imageSecond.classList.add("invincible");

  image.value = "";
});

const dropdown = getElement("dropdown");
const selectedDropdown = getElement("selected-dropdown");
const dropdownInput = getElement("dropdown-input");

const dropSaved = localStorage.getItem("dropdown");

if (dropSaved) {
  selectedDropdown.innerHTML = dropSaved;

  selectedDropdown.querySelectorAll("p").forEach((pTag) => {
    pTag.querySelector("img").addEventListener("click", () => {
      pTag.remove();

      localStorage.setItem("dropdown", selectedDropdown.innerHTML);

      if (selectedDropdown.innerText === "") {
        selectedDropdown.innerText = "შეიყვნეთ სათაური";
        dropdownInput.style.background = "#FAF2F3";
        dropdownInput.style.border = "1px solid #EA1919";
      }
    });
  });
}

const fetchCategories = async () => {
  const res = await fetch(
    "https://api.blog.redberryinternship.ge/api/categories"
  );

  const categories = await res.json();

  categories.data.forEach((category) => {
    const p = document.createElement("p");

    p.classList.add("dropdown-item");

    p.style.color = category.text_color;

    p.style.background = category.background_color;

    p.innerText = category.title;

    p.addEventListener("click", () => {
      const insideP = document.createElement("p");

      insideP.classList.add("dropdown-item");

      insideP.style.color = category.text_color;

      insideP.style.background = category.background_color;

      insideP.innerText = category.title;

      insideP.setAttribute("id", category.id);

      insideP.classList.add("inside-p");

      const image = document.createElement("img");

      image.src = "./../assets/add.svg";

      image.addEventListener("click", () => {
        insideP.remove();

        localStorage.setItem("dropdown", selectedDropdown.innerHTML);

        if (selectedDropdown.innerText === "") {
          selectedDropdown.innerText = "შეიყვნეთ სათაური";
          dropdownInput.style.background = "#FAF2F3";
          dropdownInput.style.border = "1px solid #EA1919";
        }
      });

      insideP.appendChild(image);

      if (!selectedDropdown.innerText.includes(category.title)) {
        if (selectedDropdown.innerText === "შეიყვნეთ სათაური") {
          selectedDropdown.innerText = "";
          selectedDropdown.appendChild(insideP);
          dropdownInput.style.background = "#F8FFF8";
          dropdownInput.style.border = "1px solid #14D81C";
        } else {
          selectedDropdown.appendChild(insideP);
          dropdownInput.style.background = "#F8FFF8";
          dropdownInput.style.border = "1px solid #14D81C";
        }

        localStorage.setItem("dropdown", selectedDropdown.innerHTML);
      }
    });

    dropdown.appendChild(p);
  });
};

fetchCategories();

dropdownInput.addEventListener("click", () => {
  dropdown.classList.remove("invincible");
});

const dropContainer = getElement("dropdown-container");

window.addEventListener("click", (e) => {
  if (!dropContainer.contains(e.target)) {
    dropdown.classList.add("invincible");
  }
});

const addBlog = getElement("add-blog");

addBlog.addEventListener("click", async () => {
  if (
    author.value.trim().split(" ").join("").length < 4 ||
    author.value.trim().split(" ").length < 2 ||
    !/^[ა-ჰ ]+$/.test(author.value)
  ) {
    return;
  }

  if (
    header.value.trim().split(" ").join("").length < 4 ||
    description.value.trim().split(" ").join("").length < 4
  ) {
    return;
  }

  if (date.value === "") {
    return;
  }

  const dropElements = selectedDropdown.querySelectorAll("p");

  if (dropElements.length < 1) {
    return;
  }

  if (image.value === "") {
    return;
  }

  const dropdownIds = Array.from(dropElements).map((el) =>
    el.getAttribute("id")
  );

  const sendMail =
    !emailInput.value.endsWith("@redberry.ge") && emailInput.value.length < 1;

  const formData = new FormData();

  formData.append("title", header.value);
  formData.append("description", description.value);
  formData.append("publish_date", date.value);
  formData.append("author", author.value);
  formData.append("email", sendMail ? emailInput.value : "");

  dropdownIds.forEach((categoryId) => {
    formData.append("categories[]", categoryId);
  });

  const imageFile = image.files[0];
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await fetch("https://api.blog.redberryinternship.ge/api/blogs", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    body: formData,
  });

  if (res.status === 204) {
    console.log(1);
  }
});
