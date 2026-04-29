import { createSlice } from '@reduxjs/toolkit';

const initialMovies = [
  {
    id: 1,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    posterURL:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rating: 5,
    trailerLink: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    id: 2,
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests.",
    posterURL:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rating: 5,
    trailerLink: "https://www.youtube.com/embed/EXeTwLQv6o4",
  },
  {
    id: 3,
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterURL:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rating: 4,
    trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 4,
    title: "Titanic",
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the Titanic.",
    posterURL:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rating: 4,
    trailerLink: "https://www.youtube.com/embed/2g811Eo7K8U",
  },
];

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: initialMovies,
    titleFilter: '',
    rateFilter: 0,
  },
  reducers: {
    addMovie: (state, action) => {
      const newMovie = {
        ...action.payload,
        id: state.items.length + 1,
      };
      state.items.push(newMovie);
    },
    setTitleFilter: (state, action) => {
      state.titleFilter = action.payload;
    },
    setRateFilter: (state, action) => {
      state.rateFilter = action.payload;
    },
  },
});

export const { addMovie, setTitleFilter, setRateFilter } = moviesSlice.actions;

export const selectAllMovies = (state) => state.movies.items;
export const selectTitleFilter = (state) => state.movies.titleFilter;
export const selectRateFilter = (state) => state.movies.rateFilter;
export const selectFilteredMovies = (state) => {
  const { items, titleFilter, rateFilter } = state.movies;
  return items.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesRate = movie.rating >= rateFilter;
    return matchesTitle && matchesRate;
  });
};

export default moviesSlice.reducer;