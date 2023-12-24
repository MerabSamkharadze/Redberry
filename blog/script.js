const apiKey =
  "0ef38445fff55adcfe4bc2d673c9192ecc741377890587ab4b934520c2e908dc";

const chosenId = new URLSearchParams(window.location.search).get("id");

const blogContainer = getElement("new-blog-container");

const similarBlogs = getElement("similar-blogs");

const arrowRight = getElement("arrow-right");
const arrowLeft = getElement("arrow-left");

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

    aTag.style.color = category.text_color;

    aTag.style.background = category.background_color;

    aTag.innerText = category.title;

    categoryCont.appendChild(aTag);
  });

  blogContainer.appendChild(categoryCont);

  blogContainer.appendChild(description);

  const res2 = await fetch("https://api.blog.redberryinternship.ge/api/blogs", {
    headers: {
      Authorization: "Bearer " + apiKey,
    },
  });

  const data2 = await res2.json();

  data2.data.forEach((blog) => {
    const currentDate = new Date();
    const specificDate = new Date(blog.publish_date);

    const includesCategory =
      blog.categories.filter((category) =>
        data.categories.some((cat) => cat.title === category.title)
      ).length > 0;

    if (currentDate > specificDate && includesCategory) {
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

      aTag.href = `./../blog/?id=${blog.id}`;

      aTag.innerHTML = `სრულად ნახვა <img src='./../assets/blue-arrow.svg' alt='blue arrow' />`;

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

        aTag.style.color = category.text_color;

        aTag.style.background = category.background_color;

        aTag.innerText = category.title;

        categoryCont.appendChild(aTag);
      });

      childBlog.appendChild(categoryCont);

      childBlog.appendChild(description);
      childBlog.appendChild(aTag);

      similarBlogs.appendChild(childBlog);
    }
  });

  if (similarBlogs.childElementCount < 4) {
    arrowRight.src = "./../assets/arrow-right-grey.svg";
  }
};

fetchBlogInfo();

const scrolled = similarBlogs.scrollWidth;

arrowRight.addEventListener("click", () => {
  similarBlogs.scrollLeft += 440;

  if (similarBlogs.scrollLeft >= scrolled) {
    arrowRight.src = "./../assets/arrow-right-grey.svg";
  }

  if (similarBlogs.childElementCount > 3) {
    arrowLeft.src = "./../assets/arrow-left-blue.svg";
  }
});

arrowLeft.addEventListener("click", () => {
  similarBlogs.scrollLeft -= 440;

  if (similarBlogs.scrollLeft - 440 <= 0) {
    arrowLeft.src = "./../assets/arrow-left-grey.svg";
  }

  if (similarBlogs.childElementCount > 3) {
    arrowRight.src = "./../assets/arrow-right-blue.svg";
  }
});
