const apiKey =
  "ed94de27207ab408ae5fd225c02b0b690a54073dd4e26b98939d944d69801185";

const filterContainer = getElement("filters");
const blogsContainer = getElement("blogs");

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

const fetchBlogs = async () => {
  const res = await fetch("https://api.blog.redberryinternship.ge/api/blogs", {
    headers: {
      Authorization: "Bearer " + apiKey,
    },
  });

  const data = await res.json();

  data.data.forEach((blog) => {
    const currentDate = new Date();
    const specificDate = new Date(blog.publish_date);

    if (
      (blog.categories.some((category) => category.title === chosenFilter) ||
        chosenFilter === null) &&
      currentDate > specificDate
    ) {
      const image = document.createElement("img");

      image.src = blog.image;

      const author = document.createElement("h2");

      author.classList.add("author");

      author.innerText = blog.author;

      const time = document.createElement("p");

      time.classList.add("blog-time");

      time.innerText = blog.publish_date;

      const description = document.createElement("p");

      description.classList.add("blogs-desc");

      description.innerText = blog.description;

      const title = document.createElement("h2");

      title.classList.add("blog-title");

      title.innerText = blog.title;

      const aTag = document.createElement("a");

      aTag.classList.add("blog-a");

      aTag.href = `/blog?id=${blog.id}`;

      aTag.innerHTML = `სრულად ნახვა <img src='./assets/blue-arrow.svg' alt='blue arrow' />`;

      const childBlog = document.createElement("div");

      childBlog.classList.add("blogs");

      childBlog.appendChild(image);
      childBlog.appendChild(author);
      childBlog.appendChild(time);

      childBlog.appendChild(title);

      const categoryCont = document.createElement("div");

      categoryCont.classList.add("blog-tags");

      blog.categories.forEach((category) => {
        const aTag = document.createElement("a");

        aTag.href = `/?filter=${category.title}`;

        aTag.style.color = category.text_color;

        aTag.style.background = category.background_color;

        aTag.innerText = category.title;

        categoryCont.appendChild(aTag);
      });

      childBlog.appendChild(categoryCont);

      childBlog.appendChild(description);
      childBlog.appendChild(aTag);

      blogsContainer.appendChild(childBlog);
    }
  });

  console.log(data.data);
};

fetchBlogs();
