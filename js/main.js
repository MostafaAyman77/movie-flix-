const apiKey = `f6c3f29b344b791c27282aa760c4adae`;
const apiUrl = ` https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
let movieContainer = document.querySelector(".movies-container")

async function fetchMovies () {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        //console.log(data.results);
        showMovies(data.results);
        slideShow(data.results);
        topTenMovies(data.results);
        showLatestMovies(data.results)
    }
    catch (error) {
        console.log("Fetching an error",error);
    }
}

function slideShow(movies) {
    let slide = document.querySelector(".slide-swp"); 
    let currentIndex = 0;

    function showNextSlide() {
        if (movies.length > 0) {
            slide.innerHTML = `<a href="#"><img class="rounded-3" src="https://image.tmdb.org/t/p/w500/${movies[currentIndex].backdrop_path}" alt="${movies.original_title}"></a>`;
            currentIndex = (currentIndex + 1) % movies.length; 
        }
    }
    showNextSlide();
    setInterval(showNextSlide, 5000); 
}

function topTenMovies(movies) {
    let topTen = document.querySelector(".top-ten");
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");
    let visibleCount = 5;
    let currentIndex = visibleCount; 
    let displayedCards = []; 

    topTen.innerHTML = "";
    movies.sort((a, b) => b.vote_average - a.vote_average);
    let top10 = movies.slice(0, 10);

    for (let i = 0; i < visibleCount; i++) {
        let card = createCard(top10[i]);
        topTen.appendChild(card);
        displayedCards.push(card);
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < top10.length) {
            let newCard = createCard(top10[currentIndex]);
            topTen.appendChild(newCard);
            displayedCards.push(newCard);
            topTen.removeChild(displayedCards.shift());
            currentIndex++;
        }
    });
    prevBtn.addEventListener("click", () => {
        if (currentIndex > visibleCount) {
            currentIndex--;
            let prevCard = createCard(top10[currentIndex - visibleCount]);
            topTen.insertBefore(prevCard, topTen.firstChild);
            displayedCards.unshift(prevCard);
            topTen.removeChild(displayedCards.pop());
        }
    });
    function createCard(movie) {
        let card = document.createElement("div");
        card.classList.add("card", "movie-card", "col-sm-12");
        card.style.width = "12rem";
        card.style.height = "22rem";
        card.innerHTML = `
            <a class="link" href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body info">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="title">${movie.title}</p>
                    <p class="date">${movie.release_date[0]}${movie.release_date[1]}${movie.release_date[2]}${movie.release_date[3]}</p>
                </div>
                <h4 class="card-text mt-3">${movie.vote_average}</h4>
            </a>
        `;
        return card;
    }
}

function showMovies(movies){
    movies.forEach( movie => {
        let movieCard = `
            <div class="card movie-card overflow-hidden p-2" style="width: 12rem; height: 23rem;">
                <a class="link" href="movie-details.html?id=${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body info">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="title">${movie.title}</p>
                        <p class="date">${movie.release_date[0]}${movie.release_date[1]}${movie.release_date[2]}${movie.release_date[3]}</p>
                    </div>
                    <p class="card-text">${movie.overview}</p>
                </a>
            </div>
        `;
        movieContainer.innerHTML += movieCard;
    });
}
function showLatestMovies(movies){
    let latest = document.querySelector(".latest");

    movies.sort((a, b) => b.release_date - a.release_date);
    let latestFive = movies.slice(0, 5);

    for (let i = 0; i <= 5; i++){
        let movieCard = `
        <div class="card col-sm-12 movie-card overflow-hidden p-2" style="width: 12rem; height: 23rem;">
        <a class="link" href="movie-details.html?id=${latestFive[i].id}">
            <img src="https://image.tmdb.org/t/p/w500/${latestFive[i].poster_path}" class="card-img-top" alt="${latestFive[i].title}">
                <div class="card-body info">
                    <h5 class="card-title">${latestFive[i].title}</h5>
                    <p class="title">${latestFive[i].title}</p>
                    <p class="date">${latestFive[i].release_date[0]}${latestFive[i].release_date[1]}${latestFive[i].release_date[2]}${latestFive[i].release_date[3]}</p>    
                </div>
                <p class="card-text">${latestFive[i].overview}</p>
        </a>
        `;
        latest.innerHTML += movieCard;
    }
}
let backToTopButton = document.querySelector(".back-to");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

fetchMovies();





