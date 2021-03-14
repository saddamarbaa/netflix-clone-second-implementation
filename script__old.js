/** @format */

// Call functions whe the page is loaded
window.onload = () => {
	getPopular();
	getTrending();
	getGenres();
};

// Navigation Scroll feature
const navigation = document.getElementById('navigation');

window.addEventListener('scroll', () => {
	if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
		navigation.style.transition = 'background 0.2s ease-in';
		navigation.style.background = 'rgba(20, 20, 20, 1)';
	} else {
		navigation.style.transition = 'background 0.4s 0.15s';
		navigation.style.background =
			'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0)';
	}
});

const alreadyDisplayed = [];

const getPopular = function () {
	const popularURL =
		'https://api.themoviedb.org/3/discover/tv?api_key=92bcc12799d8068995c7c9650f414f3e&sort_by=vote_average.desc&vote_count.gte=5000';
	callFetch(popularURL, 'popular');
};

const getTrending = function () {
	const trendingURL =
		'https://api.themoviedb.org/3/trending/tv/week?api_key=92bcc12799d8068995c7c9650f414f3e';
	callFetch(trendingURL, 'trending');
};

const callFetch = function (URL, id) {
	console.log(URL);
	fetch(URL)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Something went wrong');
			} else {
				return response.json();
			}
		})
		.then((data) => {
			displayMovies(data, id);
		})
		.catch((error) => {
			console.log(error);
		});
};

// Check if a movie is already displayed
const movieIsNotDisplayed = function (movieID) {
	// push movie_id in the array when is NOT DISPLAYED
	if (!alreadyDisplayed.includes(movieID)) {
		alreadyDisplayed.push(movieID);
		return true; // When the movie is not in the [alreadyDisplayed] array
	}
	return false; // When the movie is already displayed
};

const displayMovies = function (data, id) {
	const containerEL = document.getElementById(id);

	data.results.forEach((movie) => {
		if (movieIsNotDisplayed(movie.id)) {
			const imageEl = ` <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="${id}">`;
			containerEL.innerHTML += imageEl;
		}
	});
	console.log(alreadyDisplayed);
};

/************************* START FROM HERE *******/

// https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US

/**
 * this are the list of official genres for movies
 * https://developers.themoviedb.org/3/genres/get-movie-list
 */

// https://api.themoviedb.org/3/genre/movie/list?api_key=92bcc12799d8068995c7c9650f414f3e&language=en-US

/**
 * this are movies genres
 * https://developers.themoviedb.org/3/discover/movie-discover
 */

//https://api.themoviedb.org/3/discover/movie?api_key=92bcc12799d8068995c7c9650f414f3e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53

/**
 * function to fetch movies from (TMDb) base on given genre ID
 * the form so that we can handle things instead.
 * @param {genreId} genre ID
 */

const fetchMoviesBasedOnGenre = (genreId) => {
	let url = 'https://api.themoviedb.org/3/discover/movie?';

	url +=
		'api_key=92bcc12799d8068995c7c9650f414f3e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2';

	url += `&with_genres=${genreId}`;
	return fetch(url).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error('something went wrong');
		}
	}); // returns a promise already
};

/**
 * function to fetch movies genres from (TMDb) API
 */

const getGenres = () => {
	const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=92bcc12799d8068995c7c9650f414f3e&language=en-US`;

	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				// throw new Error(response.statusText);
				throw new Error('Something went wrong');
			}
		})
		.then((data) => {
			// object with List of official genres for movies
			console.log(data);
			showMoviesGenres(data);
		})
		.catch((error) => {
			console.log('Fetch Error :-S', error);
		});
};

/**
 * function to show Movies to the front end based on their genres
 *  @param {genreName}  genre Name
 *  @param {movies}  movies
	* 
	 <div class="movie-section spacing-left">
    <h2>Trending Now</h2>
    <div class="movie-container basic-movies" id="trending">
      <!-- Inserted with JavaScript -->
    </div>
  </div>
 *
 */

const showMoviesBasedOnGenre = (genreName, movies) => {
	// console.log(movies);
	// console.log(genreName);

	// create  <div class="movie-section spacing-left"> for each row
	let movies_section = document.querySelector('.movie-section');
	console.log(movies_section);

	// create h <h2>{genreName}</h2> for each row
	let genreEl = document.createElement('h2');
	genreEl.innerHTML = genreName;
	// console.log(genreEl);

	// create <div class="movie-container basic-movies" id=genreName> for each row
	let moviesEl = document.createElement('div');
	moviesEl.classList.add('movie-container');
	moviesEl.classList.add('basic-movies');
	moviesEl.setAttribute('id', genreName);
	// console.log(moviesEl);

	for (let movie of movies.results) {
		// console.log(movie);
		let imageElement = document.createElement('img');
		let { backdrop_path, id } = movie;
		console.log('TESTING DESCONSTRUCT:', id, backdrop_path);
		imageElement.src = `https://image.tmdb.org/t/p/original${backdrop_path}`;

		moviesEl.appendChild(imageElement);
		console.log(moviesEl);
	}

	movies_section.appendChild(genreEl);
	movies_section.appendChild(moviesEl);
};

/**
 * function to loop through all the given genres and pass each genner ID to
 * fetchMoviesBasedOnGenre() function and after get movies back will pass to  *showMoviesBasedOnGenre() to show on the front end
 * @param {genres}  all the genres from API
 *
 */

const showMoviesGenres = (genres) => {
	// console.log(genres);
	genres.genres.forEach((genre) => {
		// console.log(genre);

		// get list of movies
		let movies = fetchMoviesBasedOnGenre(genre.id);

		// now we have the movies based on genres ready
		movies
			.then((movies) => {
				// console.log(movies);
				showMoviesBasedOnGenre(genre.name, movies);
			})
			.catch((error) => {
				console.log('BAD BAD', error);
			});
		// show movies based on genre
	});
};
