# Redux vs Zustand - A Quick Comparison

Both are state management libraries for React, but they differ significantly in complexity and developer experience.

## Redux

```javascript
// 1. Define actions
const addMovie = (movie) => ({ type: 'ADD_MOVIE', payload: movie });

// 2. Create reducer
function moviesReducer(state = { items: [] }, action) {
  switch (action.type) {
    case 'ADD_MOVIE':
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
}

// 3. Create store
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({ reducer: { movies: moviesReducer } });

// 4. Wrap app with Provider
import { Provider } from 'react-redux';
<Provider store={store}><App /></Provider>

// 5. Use in components
const dispatch = useDispatch();
const movies = useSelector((state) => state.movies.items);
dispatch(addMovie(newMovie));
```

**Key Points:**
- Requires action types, action creators, reducers
- Needs Provider wrapper
- Uses `useDispatch` and `useSelector` hooks
- More boilerplate but powerful for large apps

---

## Zustand

```javascript
// 1. Create store (one file!)
import { create } from 'zustand';

const useMoviesStore = create((set) => ({
  movies: [],
  addMovie: (movie) => set((state) => ({
    movies: [...state.movies, movie]
  })),
}));

// 2. Use in components (no Provider needed!)
const movies = useMoviesStore((state) => state.movies);
const addMovie = useMoviesStore((state) => state.addMovie);
addMovie(newMovie);
```

**Key Points:**
- No Provider needed
- No action types or reducers
- Simpler API with hooks
- Great for small to medium apps

---

## Quick Comparison Table

| Feature | Redux | Zustand |
|---------|------|--------|
| Boilerplate | High | Low |
| Provider | Required | Not needed |
| Actions | Action types + creators | Direct functions |
| Learning curve | Steeper | Easy |
| Best for | Large teams/apps | Quick prototyping |

---

## When to Use Which?

- **Redux**: Large applications with complex state logic, many developers, need for middleware (sagas, thunks)
- **Zustand**: Small to medium apps, simple state, prototyping, developer happiness