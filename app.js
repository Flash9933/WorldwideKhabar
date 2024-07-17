document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('news-container');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const apiKey = '1932816420f34617b2c061162fba7fc0';
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    const fetchNews = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const articles = data.articles;
                let output = '';

                articles.forEach(article => {
                    output += `
                        <div class="news-article">
                            <h2>${article.title}</h2>
                            <img src="${article.urlToImage}" alt="${article.title}">
                            <p>${article.description}</p>
                            <a href="${article.url}" target="_blank">Read more</a>
                            <button class="share-button" onclick="shareArticle('${article.url}', '${article.title}')">Share</button>
                        </div>
                    `;
                });

                newsContainer.innerHTML = output;
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    };

    const shareArticle = (url, title) => {
        const message = `Check out this news article: ${title}\n${url}`;
        if (navigator.share) {
            navigator.share({
                title: title,
                text: message,
                url: url
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(console.error);
        } else {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            const searchUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
            fetchNews(searchUrl);
        }
    });

    fetchNews(apiUrl);
});
