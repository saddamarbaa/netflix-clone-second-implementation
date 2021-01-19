//  Selectors

const navigation = document.getElementById("navigation");
const tvShowsEl = document.querySelector("#tvShows");
const bigMovies = document.querySelector(".big-movies");

// console.log(navigation);
// console.log(tvShowsEl);

//  Event Listener and Functions

window.addEventListener("scroll", () => {
  // console.log(document.body.scrollTop);
  // console.log(document.documentElement.scrollTop);
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    navigation.style.background = "rgba(20, 20, 20, 1)";
  } else {
    navigation.style.background = "rgba(20, 20, 20, 0.1)";
  }
});

//  Add Movies to the front end

function addMovies(movies, moveEl) {
  // console.log(movies);
  // console.log(movie.backdrop_path);

  movies.forEach((movie) => {
    const image = `<img src=https://image.tmdb.org/t/p/original${movie.backdrop_path} alt = "img" >`;

    // console.log(image);
    moveEl.innerHTML += image;
  });
}

// fetch movies data from IMDb API

function fetchMovies() {
  fetch(
    "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // throw new Error(response.statusText);
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      // console.log(data);
      // call add function and pass movies array
      addMovies(data.results, tvShowsEl);
      addMovies(data.results, bigMovies);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}

// function call

window.onload = () => {
  fetchMovies();
};
