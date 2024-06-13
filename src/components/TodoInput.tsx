import { AddIcon } from '@chakra-ui/icons';
import { Button, Input, HStack } from '@chakra-ui/react';


interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodo: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ newTodo, setNewTodo, addTodo }) => {
  return (
    <HStack mb={5} justify="center">
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Добавить новую задачу"
        maxW="300px"
        mr={2}
      />
      <Button
      rightIcon={<AddIcon />}
      padding={5}
      onClick={addTodo}
      colorScheme="blue"
      size="sm"
      letterSpacing="tight">
        Добавить
      </Button>
    </HStack>
  );
};

export default TodoInput;