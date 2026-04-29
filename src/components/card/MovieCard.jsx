import {
  Badge,
  Card,
  Group,
  Image,
  Rating,
  Text,
} from "@mantine/core";
import classes from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";

export function MovieCard({ movie }) {
  const { id, title, description, posterURL, rating } = movie;

  const navigate = useNavigate();

  return (
    <Card withBorder radius="md" p="md" className={classes.card} onClick={() => navigate(`/movie/${id}`)}>
      <Card.Section>
        <Image src={posterURL} alt={title} height={220} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={600} style={{ flex: 1 }}>
            {title}
          </Text>
          <Badge size="lg" variant="light" color="yellow">
            {rating}/5
          </Badge>
        </Group>
        <Text fz="sm" mt="xs" lineClamp={2}>
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Rating
        </Text>
        <Rating value={rating} fractions={2} readOnly mt={3} />
      </Card.Section>
    </Card>
  );
}