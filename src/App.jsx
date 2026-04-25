import { Box, Flex } from "@mantine/core";
import { MovieCard } from "./components/card/MovieCard";
import { Header } from "./layout/header/Header";

function App() {
  return <>
    <Header />

    <Flex gap={10} wrap={"wrap"} justify={"center"}>
      {[1, 2, 3, 4, 5].map((id) => (
        <MovieCard key={id} />
      ))}
    </Flex>
  </>;
}

export default App;
