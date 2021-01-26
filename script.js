//  Event Listener and Functions

window.addEventListener("scroll", () => {
  //  Selectors
  const navigation = document.getElementById("navigation");
  // console.log(navigation);
  // console.log(document.body.scrollTop);
  // console.log(document.documentElement.scrollTop);
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    navigation.style.background = "rgba(20, 20, 20, 1)";
  } else {
    navigation.style.background = "rgba(20, 20, 20, 0.1)";
  }
});

//  Add Movies to the front end

const displayTvShows = function (tvShows) {
  // console.log(tvShows);
  const tvShowsEl = document.getElementById("tvShows");

  tvShows.results.forEach((tvShow) => {
    const imgHtml = `<img src="https://image.tmdb.org/t/p/original${tvShow.backdrop_path}" alt="${tvShow.original_name}">`;

    // console.log(imgHtml);
    tvShowsEl.innerHTML += imgHtml;
  });
};

//  Add Movies to the front end

const displayNetflixOriginal = function (tvShows) {
  console.log(tvShows);
  const tvShowsEl = document.getElementById("netflixOriginal");

  tvShows.results.forEach((tvShow) => {
    const imgHtml = `<img src="https://image.tmdb.org/t/p/original${tvShow.backdrop_path}" alt="${tvShow.original_name}">`;

    console.log(imgHtml);
    tvShowsEl.innerHTML += imgHtml;
  });
};

const callFetch = function () {
  const API_KEY = "92bcc12799d8068995c7c9650f414f3e";
  fetchMovies(API_KEY);
  fetchOrginalMovies(API_KEY);
};

// fetch movies data from IMDb API

const fetchMovies = function (API_KEY) {
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=5000`;

  fetch(url)
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
      // call displayTvShows() function and pass movies Object
      displayTvShows(data);
      // displayNetflixOriginal(data);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
};

// function call

window.onload = () => {
  callFetch();
};

function fetchOrginalMovies(API_KEY) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;

  fetch(url)
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
      // call displayTvShows() function and pass movies Object
      displayNetflixOriginal(data);
    })
    .catch((error) => {
      console.log("Fetch Error :-S", error);
    });
}
