import { Badge, Rating, Image, Text, Button, Container, Flex, Group, Stack, Title, Paper, Box } from "@mantine/core";
import { IconArrowLeft, IconBookmark, IconShare } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllMovies } from "../store/moviesSlice";

export default function MovieDesc() {
    const {id} = useParams();
    const movies = useSelector(selectAllMovies);
    const movie = movies.find((m) => m.id === Number(id));
    const navigate = useNavigate();

    if(!movie){
        return (
            <Container size="sm" py="xl">
                <Paper p="xl" radius="md" withBorder>
                    <Stack align="center">
                        <Title order={2}>Movie not found</Title>
                        <Text c="dimmed">The movie you're looking for doesn't exist.</Text>
                        <Button onClick={() => navigate('/')}>Go back to home</Button>
                    </Stack>
                </Paper>
            </Container>
        )
    }

  return (
    <>
        <Container size="xl" py="xl">
            <Button variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/')} mb="md">
                Back to Movies
            </Button>
            
            <Flex gap="xl" wrap="wrap">
                <Paper radius="md" withBorder style={{ maxWidth: 350, flex: 1, minWidth: 300 }}>
                    <Image src={movie.posterURL} alt={movie.title} radius="md" />
                </Paper>
                
                <Paper p="xl" radius="md" withBorder style={{ flex: 2, minWidth: 300 }}>
                    <Stack gap="md">
                        <Group justify="space-between" align="flex-start">
                            <Title order={1}>{movie.title}</Title>
                            <Group>
                                <Button variant="light" rightSection={<IconBookmark size={16} />}>
                                    Save
                                </Button>
                                <Button variant="light" rightSection={<IconShare size={16} />}>
                                    Share
                                </Button>
                            </Group>
                        </Group>
                        
                        <Group>
                            <Badge size="xl" variant="light" color="yellow">
                                {movie.rating}/5
                            </Badge>
                            <Rating value={movie.rating} fractions={2} readOnly size="md" />
                        </Group>
                        
                        <Text size="lg" fw={500}>Description</Text>
                        <Text c="dimmed">{movie.description}</Text>
                    </Stack>
                </Paper>
            </Flex>

            {movie.trailerLink && (
                <Paper p="md" radius="md" withBorder mt="xl">
                    <Title order={3} mb="md">Watch Trailer</Title>
                    <Box style={{ aspectRatio: '16/9' }}>
                        <iframe 
                            src={movie.trailerLink} 
                            style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
                            allowFullScreen
                            title={movie.title}
                        />
                    </Box>
                </Paper>
            )}
        </Container>
    </>
  )
}