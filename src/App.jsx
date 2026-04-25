import { Box, Button, Flex, Modal, NumberInput, TextInput } from "@mantine/core";
import { MovieCard } from "./components/card/MovieCard";
import { Header } from "./layout/header/Header";
import MovieList from "./components/list/MovieList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Filter from "./components/filter/Filter";
import { useState } from "react";
import MovieDesc from "./pages/MovieDesc";

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

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState("");
  const [rateFilter, setRateFilter] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 0,
    trailerLink: "",
  });
  const [opened, setOpened] = useState(false);

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesRate = movie.rating >= rateFilter;

    return matchesTitle && matchesRate;
  })


  const addMovie = () => {
    const movie = {
      ...newMovie,
      id: movies.length + 1,
      rating: Number(newMovie.rating),
    };

    setMovies([...movies, movie]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Box>
                <Filter
                  title={titleFilter}
                  rate={rateFilter}
                  onTitleChange={setTitleFilter}
                  onRatingChange={setRateFilter}
                />
                <Button onClick={() => setOpened(true)}>Add a new Movie</Button>
                <Flex gap={10} wrap={"wrap"} justify={"center"}>
                  <MovieList movies={filteredMovies} />
                </Flex>
                <Modal opened={opened} onClose={() => setOpened(false)}>

                  <TextInput
                    placeholder="enter movie title"
                    label={"Title"}
                    value={newMovie.title}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, title: e.target.value })
                    }
                    required
                  />
                  <TextInput
                    placeholder="enter movie description"
                    label={"Description"}
                    value={newMovie.description}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, description: e.target.value })
                    }
                    required
                  />
                  <TextInput
                    placeholder="enter poster URl"
                    label={"Poster URL"}
                    value={newMovie.posterURL}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, posterURL: e.target.value })
                    }
                    required
                  />
                  <TextInput
                    placeholder="enter movie trailer link"
                    label={"Trailer link"}
                    value={newMovie.trailerLink}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, trailerLink: e.target.value })
                    }
                    required
                  />
                  <NumberInput
                    min={0}
                    max={5}
                    placeholder="enter movie rating"
                    label={"Rating"}
                    value={newMovie.rating}
                    onChange={(value) =>
                      setNewMovie({ ...newMovie, rating: value })
                    }
                    required
                  />
                  <Button onClick={addMovie}>Add the movie</Button>
                </Modal>
              </Box>
            </>
          }
        ></Route>
        <Route path="/movie/:id" element={
          <MovieDesc movies={movies} />
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
