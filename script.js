const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Swiper initialization
let swiper = new Swiper('.swiper-container', {
    // Optional parameters
    effect: 'coverflow', 
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50, 
        stretch: 0, 
        depth: 100, 
        modifier: 1, 
        slideShadows : true // 
    },
    /*pagination: {
      el: '.swiper-pagination',
      clickable: true,
    
    },*/
});

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // Clear existing slides
    swiper.removeAllSlides();

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        // Create elements
        const movieEl = document.createElement("div");
        movieEl.classList.add("swiper-slide", "movie");
        
        const imgEl = document.createElement("img");
        imgEl.src = IMGPATH + poster_path;
        imgEl.alt = title;

        const movieInfoEl = document.createElement("div");
        movieInfoEl.classList.add("movie-info");
        
        const titleEl = document.createElement("h3");
        titleEl.textContent = title;

        const ratingEl = document.createElement("span");
        ratingEl.textContent = vote_average;
        ratingEl.classList.add(getClassByRate(vote_average));

        const overviewEl = document.createElement("div");
        overviewEl.classList.add("overview");

        const overviewHeadingEl = document.createElement("h3");
        overviewHeadingEl.textContent = "Overview:";

        const overviewContentEl = document.createElement("p");
        overviewContentEl.textContent = overview;

        // Append elements
        movieInfoEl.appendChild(titleEl);
        movieInfoEl.appendChild(ratingEl);

       
        overviewEl.appendChild(overviewHeadingEl);
        overviewEl.appendChild(overviewContentEl);

        movieEl.appendChild(imgEl);
        movieEl.appendChild(movieInfoEl);
        movieEl.appendChild(overviewEl);

        swiper.appendSlide(movieEl);
    });
}


function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";  
    }
});
