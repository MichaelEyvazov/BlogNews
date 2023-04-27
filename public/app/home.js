const blogSection = document.querySelector('.blogs-section');

const API_KEY = '7d6483a2fcc34394ba7bc5e83d301558';
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";

const newsdetails = document.getElementById("output");
let newsDataArr = [];

db.collection("blogs").get().then((blogs) => {
    fetchGeneralNews();
    blogs.forEach(blog => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title" title=${data.title}">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn btn-dark">read</a>
    </div>
    `;
}

const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

function displayNews() {

    newsDataArr.forEach(data => {

        // var date = data.publishedAt.split("T");
        let latersNewsSection = document.createElement('div');
        latersNewsSection.className = "blog-card";

        let image = document.createElement('img');
        image.className = "blog-image";
        image.src = data.urlToImage;

        let blogTitle = document.createElement('h1');
        blogTitle.className = "blog-title";
        blogTitle.title = data.title;
        blogTitle.innerHTML = data.title.substring(0, 100) + '...';

        let discription = document.createElement('p');
        discription.className = "blog-overview";
        discription.innerHTML = data.description.substring(0, 200) + '...';

        let link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = data.url;
        link.innerHTML = "read";

        latersNewsSection.appendChild(image);
        latersNewsSection.appendChild(blogTitle);
        latersNewsSection.appendChild(discription);
        latersNewsSection.appendChild(link);

        console.log(latersNewsSection);

        blogSection.appendChild(latersNewsSection)
    });

}