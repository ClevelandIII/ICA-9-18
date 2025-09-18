// Function runs on page load to view current popular movies in the US
// endpoint here: https://developer.themoviedb.org/reference/movie-popular-list
function getPopularMovies() {
    // the endpoint
    let url =
        "https://api.themoviedb.org/3/movie/popular?api_key=8219eea69558dbf7110a4e1b338ab1ac&language=en-US&page=1";
    // the place on the page where we'll display the movies
    let popularMovies = document.getElementById("popular");
    let imgUrl = "https://image.tmdb.org/t/p/w400";

    // ajax time!
    // create the object
    let xhr = new XMLHttpRequest();

    // attach event handlers
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let json = this.response;

            let html = "";

            // This code can be used for the display of the featured movie
            // (it is a string template)
            html += `<section id="featured">
                <h3>${json.results[0].title}</h3>
                <img src="${imgUrl}${json.results[0].poster_path}" alt="">
                <p>"${json.results[0].overview}"</p>
            </section>`;

            for (let i = 1; i < 19; i++) {
                // This code can be used for the display of the other popular movies (18 of them)
                // (it is a string template)

                html += `<section class="movie">
                <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                <div>
                    <h3>${json.results[i].title}</h3>
                    <p>${json.results[i].overview}
                        <span class="vote">Vote Average: ${json.results[i].vote_average}</span>
                    </p>
                </div>
            </section>`;
            }

            popularMovies.innerHTML = html;
        }
    });

    // set the response type
    xhr.responseType = "json";
    // open the request
    xhr.open("GET", url);
    // send the request
    xhr.send();
}

// function runs only after a year is entered/chosen and submitted through the form
// endpoint here: https://developer.themoviedb.org/reference/discover-movie
function getBirthYearMovies(e) {
    e.preventDefault();

    // Get the user's input/year value
    let year = encodeURI(document.getElementById("userYear").value);
    // the place on the page where we'll add the movies
    let birthYearMovies = document.getElementById("birthYear");

    if (year < 1940 || year > 2024 || year == "") {
        birthYearMovies.innerHTML = `<p style="color: red; background-color: white;">Please enter a year between 1940 and 2022</p>`;
    } else {
        // TO DO - Build the endpoint we need (this one has additional parameters)
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=8219eea69558dbf7110a4e1b338ab1ac&include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=revenue.desc`;
        let imgUrl = "https://image.tmdb.org/t/p/w400";

        // ajax time!
        // create the object
        let xhr = new XMLHttpRequest();

        // attach event handlers
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let json = this.response;

                let html = "";

                // This code can be used for the display of the movies from the given year
                // It skips any movies that don't include a poster
                // currently only displays the top six movies from that year but can be adjusted
                let counter = 0;
                for (let i = 0; counter < 12; i++) {
                    if (json.results[i].poster_path === null) {
                        continue;
                    } else {
                        html += `<section class="yrMovie">
                        <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                        <h3>${json.results[i].title}</h3>
                    </section>`;
                        counter++;
                    }
                }
                birthYearMovies.innerHTML = html;
            }
        });

        // set the response type
        xhr.responseType = "json";
        // open the request
        xhr.open("GET", url);
        // attach the headers (optional)

        // send the request
        xhr.send();
    }
}

window.addEventListener("load", function () {
    getPopularMovies();
    document
        .getElementById("yearBtn")
        .addEventListener("click", getBirthYearMovies);
});
