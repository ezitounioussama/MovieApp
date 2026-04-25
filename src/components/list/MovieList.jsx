import { SimpleGrid } from "@mantine/core";
import { MovieCard } from "../card/MovieCard";

export default function MovieList({ movies }) {
  return (
    <>
      <SimpleGrid cols={{base:1, sm:2, md:3, lg:4}} spacing={"md"}>
        {movies.map(movie => (<MovieCard key={movie.id} movie={movie}/>))}
      </SimpleGrid>
    </>
  );
}
