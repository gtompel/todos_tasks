import { CheckIcon, ChevronDownIcon, StarIcon } from '@chakra-ui/icons';
import { Button, HStack } from '@chakra-ui/react';

interface TodoFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ setFilter }) => {
  return (
    <HStack
    spacing={2}
    mb={4}
    justify="center"
    letterSpacing="tight">
      <Button
      leftIcon={<ChevronDownIcon/>}
      onClick={() => setFilter('all')}>Все</Button>
      <Button
      leftIcon={<CheckIcon/>}
      onClick={() => setFilter('completed')}>Завершенные</Button>
      <Button
      leftIcon={<StarIcon/>}
      onClick={() => setFilter('active')}>Активные</Button>
    </HStack>
  );
};

export default TodoFilter;