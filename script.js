const apiKey =
  "ed94de27207ab408ae5fd225c02b0b690a54073dd4e26b98939d944d69801185";

const filterContainer = getElement("filters");

const chosenFilter = new URLSearchParams(window.location.search).get("filter");

const fetchCategories = async () => {
  const res = await fetch(
    "https://api.blog.redberryinternship.ge/api/categories"
  );

  const categories = await res.json();

  categories.data.forEach((category) => {
    const aTag = document.createElement("a");

    aTag.href = `/?filter=${category.title}`;

    aTag.style.color = category.text_color;

    aTag.style.background = category.background_color;

    aTag.innerText = category.title;

    if (chosenFilter === category.title) {
      aTag.style.border = "2px solid #000";
    }

    filterContainer.appendChild(aTag);
  });
};

fetchCategories();
