const apiKey =
  "0ef38445fff55adcfe4bc2d673c9192ecc741377890587ab4b934520c2e908dc";

const chosenId = new URLSearchParams(window.location.search).get("id");

const blogContainer = getElement("new-blog-container");

const fetchBlogInfo = async () => {
  const res = await fetch(
    `https://api.blog.redberryinternship.ge/api/blogs/${chosenId}`,
    {
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    }
  );

  const data = await res.json();

  const image = document.createElement("img");

  image.src = data.image;

  const author = document.createElement("h2");

  author.innerText = data.author;

  author.classList.add("blog-author-name");

  const dateAndEmail = document.createElement("p");

  dateAndEmail.classList.add("date-and-email");

  dateAndEmail.innerText = `${data.publish_date} • ${data.email}`;

  const title = document.createElement("h2");

  title.innerText = data.title;

  title.classList.add("single-blog-title");

  const description = document.createElement("p");

  description.classList.add("single-blog-description");

  description.innerText = data.description;

  blogContainer.appendChild(image);
  blogContainer.appendChild(author);
  blogContainer.appendChild(dateAndEmail);
  blogContainer.appendChild(title);

  const categoryCont = document.createElement("div");

  categoryCont.classList.add("blog-tags");

  data.categories.forEach((category) => {
    const aTag = document.createElement("a");

    aTag.href = `./?filter=${category.title}`;

    aTag.style.color = category.text_color;

    aTag.style.background = category.background_color;

    aTag.innerText = category.title;

    categoryCont.appendChild(aTag);
  });

  blogContainer.appendChild(categoryCont);

  blogContainer.appendChild(description);

  console.log(data);
};

fetchBlogInfo();
