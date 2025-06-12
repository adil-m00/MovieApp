import axios from 'axios';

const API_KEY = 'b5b8e99d1bc880236a5894044527618a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (searchQuery:string) => {
  try {
    const discoverUrl = searchQuery?`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`:`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;

    const response = await axios.get(discoverUrl);

    const movies = response.data.results;

    const moviesWithDirectors = await Promise.all(
      movies.slice(0, 10).map(async (movie) => {
        try {
          const creditsRes = await axios.get(
            `${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}`
          );
          const crew = creditsRes.data.crew;
          const director = crew.find((member) => member.job === 'Director');

          return {
            id: movie.id,
            title: movie.title,
            year: movie.release_date?.split('-')[0] || 'N/A',
            director: director ? director.name : 'Unknown',
          };
        } catch (err) {
          return {
            id: movie.id,
            title: movie.title,
            year: movie.release_date?.split('-')[0] || 'N/A',
            director: 'Unknown',
          };
        }
      })
    );

    return moviesWithDirectors;
  } catch (err) {
    console.error('Failed to fetch movies:', err);
    return [];
  }
};
// export const fetchMovies = async (query = '') => {
//   try {
//     const url = query ? `${BASE_URL}?search=${query}` : BASE_URL;
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const fetchMovieDetails = async (movieId:number) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
