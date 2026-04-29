import { Container, Button, Flex, Modal, NumberInput, TextInput, Title, Stack, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Header } from "./layout/header/Header";
import MovieList from "./components/list/MovieList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Filter from "./components/filter/Filter";
import { useState } from "react";
import MovieDesc from "./pages/MovieDesc";
import { useMoviesStore, useFilteredMovies } from "./store/moviesStore";

function App() {
  const filteredMovies = useFilteredMovies();
  const titleFilter = useMoviesStore((state) => state.titleFilter);
  const rateFilter = useMoviesStore((state) => state.rateFilter);
  const setTitleFilter = useMoviesStore((state) => state.setTitleFilter);
  const setRateFilter = useMoviesStore((state) => state.setRateFilter);
  const addMovie = useMoviesStore((state) => state.addMovie);
  
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 0,
    trailerLink: "",
  });
  const [opened, setOpened] = useState(false);

  const handleAddMovie = () => {
    addMovie({
      ...newMovie,
      rating: Number(newMovie.rating),
    });
    setOpened(false);
    setNewMovie({
      title: "",
      description: "",
      posterURL: "",
      rating: 0,
      trailerLink: "",
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Container size="xl" py="xl">
                <Flex justify="space-between" align="center" mb="xl">
                  <Title order={1}>Movies</Title>
                  <Button leftSection={<IconPlus size={16} />} onClick={() => setOpened(true)}>
                    Add Movie
                  </Button>
                </Flex>
                
                <Filter
                  title={titleFilter}
                  rate={rateFilter}
                  onTitleChange={setTitleFilter}
                  onRatingChange={setRateFilter}
                />
                
                <MovieList movies={filteredMovies} />
              </Container>

              <Modal opened={opened} onClose={() => setOpened(false)} title="Add New Movie" size="lg">
                <Stack>
                  <TextInput
                    placeholder="Enter movie title"
                    label="Title"
                    value={newMovie.title}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, title: e.target.value })
                    }
                    required
                  />
                  <TextInput
                    placeholder="Enter movie description"
                    label="Description"
                    value={newMovie.description}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, description: e.target.value })
                    }
                    required
                  />
                  <TextInput
                    placeholder="Enter poster URL"
                    label="Poster URL"
                    value={newMovie.posterURL}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, posterURL: e.target.value })
                    }
                    required
                  />
                  <TextInput
                    placeholder="Enter movie trailer link"
                    label="Trailer Link"
                    value={newMovie.trailerLink}
                    onChange={(e) =>
                      setNewMovie({ ...newMovie, trailerLink: e.target.value })
                    }
                    required
                  />
                  <NumberInput
                    min={0}
                    max={5}
                    placeholder="Enter movie rating"
                    label="Rating"
                    value={newMovie.rating}
                    onChange={(value) =>
                      setNewMovie({ ...newMovie, rating: value })
                    }
                    required
                  />
                  <Group justify="flex-end" mt="md">
                    <Button variant="outline" onClick={() => setOpened(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMovie}>
                      Add Movie
                    </Button>
                  </Group>
                </Stack>
              </Modal>
            </>
          }
        ></Route>
        <Route path="/movie/:id" element={
          <MovieDesc />
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;