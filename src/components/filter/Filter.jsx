import { Flex, TextInput, NumberInput, Paper } from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons-react";

export default function Filter({title, rate, onTitleChange, onRatingChange}) {

  return (
    <Paper p="md" radius="md" mb="xl">
      <Flex gap="md" align="flex-end" wrap="wrap">
        <TextInput 
          placeholder="Search movies..."
          value={title} 
          onChange={(e) => onTitleChange(e.target.value)}
          leftSection={<IconSearch size={16} />}
          style={{ flex: 1, minWidth: 200 }}
          size="md"
        />
        <NumberInput 
          min={0} 
          max={5}
          placeholder="Min rating"
          value={rate} 
          onChange={onRatingChange}
          leftSection={<IconFilter size={16} />}
          style={{ width: 150 }}
          size="md"
        />
      </Flex>
    </Paper>
  )
}