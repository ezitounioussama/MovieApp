import { Badge, Card, Rating, Title, Image, Text, Box, Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom"

export default function MovieDesc({movies}) {
    const {id} = useParams();
    const movie = movies.find((m) => m.id === Number(id));
    const navigate = useNavigate();

    if(!movie){
        return (
            <Box>
                <Text>Movie not found!</Text>
                <Button onClick={() => navigate('/')}>Go back to home</Button>
            </Box>
        )
    }

  return (
    <>
    <Box>
        <Button onClick={() => navigate('/')}>Go back to home</Button>
    </Box>
     <Card>
        <Image src={movie.posterURL} alt={movie.title} height={200} />
        <Card.Section>
            <Text fz={"xl"} fw={700}>{movie.title}</Text>
            <Badge variant="light">
                {movie.rating}/5
            </Badge>
            <Rating value={movie.rating} mt={5} readOnly/>
            <Text mt={"md"} fz={"md"}>{movie.description}</Text>
        </Card.Section>
        {movie.trailerLink && (<Card.Section>
            <iframe src={movie.trailerLink} width={"50%"} height={300}></iframe>
        </Card.Section>)}
    </Card>
    </>
   
  )
}
