const apiKey = `f6c3f29b344b791c27282aa760c4adae`;
const movieId = window.location.search.split("=")[1];
const MovieApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
let movieDetails = document.querySelector(".movie-details");

if(!movieId){
    movieDetails = `This Is Not Valid Id `
}else {
    fetchMovieDetails(movieId);
}

async function fetchMovieDetails (id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        const details = await response.json();
        console.log(details);
        let movieInfo = `
            <div class="row d-flex flex-wrap">
                <div class="col-sm-10 col-md-5">
                    <div class="card">
                        <img class="image-details rounded-3" style="height:550px" src="https://image.tmdb.org/t/p/w500/${details.poster_path}" alt="${details.title}">
                    </div>
                </div>
                <div class="col-sm-11 col-md-7">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="text-center my-3">${details.title}</h2>
                            <p class="text-center my-3"><B>Genres: </B>${details.genres[0].name}</p>
                            <p class="text-center my-3"><B>Duration: </B>${details.runtime} min</p>
                            <p class="text-center my-3"><B>Date: </B> ${details.release_date}</p>
                            <p class="text-center my-3"><B>Rate: </B> ${details.vote_average}</p>
                            <p class="text-center my-3"><B>Language: </B> ${details.spoken_languages[0]}</p>
                            <p class="text-center my-3"><B>Country: </B> ${details.origin_country[0]}</p>
                            <p class="text-center my-3"><B>Production countries: </B> ${details.production_countries[0].name}</p>
                            <p class="overview text-center"><B>Overview: </B> <br><span> ${details.overview}</span></p>
                            <p class="overview text-center"><B>Home page: </B> <br><span> ${details.homepage}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        movieDetails.innerHTML = movieInfo;
    }
    catch (error) {
        console.log("Fetching an error",error);        
    }
}