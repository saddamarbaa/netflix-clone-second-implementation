//  Selectors

const navigation = document.getElementById("navigation");
const tvShowsEl = document.getElementById("tvShows");

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
// Functions
