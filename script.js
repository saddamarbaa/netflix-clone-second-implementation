// Navigation Scroll feature
const navigation = document.getElementById("navigation");

window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    navigation.style.transition = "background 0.2s ease-in";
    navigation.style.background = "rgba(20, 20, 20, 1)";
  } else {
    navigation.style.transition = "background 0.4s 0.15s";
    navigation.style.background =
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0)";
  }
});

const alreadyDisplayed = [];

const getPopular = function () {
  const popularURL =
    "https://api.themoviedb.org/3/discover/tv?api_key=92bcc12799d8068995c7c9650f414f3e&sort_by=vote_average.desc&vote_count.gte=5000";
  callFetch(popularURL, "popular");
};
// function calls
callFetch();
findGenreID("Drama");

// Giving back the GENRES
//  https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
