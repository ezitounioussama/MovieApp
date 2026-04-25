import { Flex, TextInput } from "@mantine/core";

export default function Filter({title, rate, onTitleChange, onRatingChange}) {

  return (
    <Flex gap={2} mt={5}>
        <TextInput placeholder="filter by title..." value={title} onChange={(e) => onTitleChange(e.target.value)}/>
        <TextInput type="number" min={0} max={5} placeholder="filter by rating..." value={rate} onChange={(e) => onRatingChange(Number(e.target.value))}/>
    </Flex>
  )
}
