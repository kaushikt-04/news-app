const API_KEY = "b872a6efcf7a4277b37a4ac2fd7c2764";
const url = "https://newsapi.org/v2/everything?q=" ;

window.addEventListener("load",() => fetchNews("India") ); 

function reload(){
    window.location.reload();
}

// async function fetchNews(query) {

//     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data = await res.json();
//     bindData(data.articles);
// }


async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.articles && Array.isArray(data.articles)) {
            bindData(data.articles);
        } else {
            console.error('No articles found or response format is incorrect');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}


function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplet = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
      articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplet.content.cloneNode(true);
        console.log(cardClone);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article) {
    
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newSource = cardClone.querySelector('#news-source');
    const newsDasc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDasc.innerHTML = article.description;
       
    const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta"
    });
    newSource.innerHTML = `${article.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click',() =>{
        window.open(article.url,"_blank");
    })
}
    var curSelectedNav = null;
    function onNavItemClick(id){
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove('active');
        curSelectedNav = navItem;
        curSelectedNav.classList.add('active');
    }

    const searchButton = document.getElementById('search-button');
    const searchText = document.getElementById('search-text');

    searchButton.addEventListener('click',() =>{
        const query = searchText.value;
        if(!query) return;
        fetchNews(query);
       
        curSelectedNav?.classList.remove('active');
        curSelectedNav = null;
    })