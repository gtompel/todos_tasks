import { VStack, HStack, Checkbox, Input, Button } from '@chakra-ui/react';
import { Todo } from './Todo';
import { DeleteIcon } from '@chakra-ui/icons';

interface TodoListProps {
  todos: Todo[];
  filter: string;
  toggleComplete: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, filter, toggleComplete, updateTodo, deleteTodo }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <VStack spacing={4} align="stretch">
      {filteredTodos.map(todo => (
        <HStack key={todo.id} spacing={4} justify="space-between">
          <HStack>
            <Checkbox
              isChecked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <Input
              defaultValue={todo.title}
              onBlur={(e) => updateTodo(todo.id, e.target.value)}
              readOnly={todo.completed}
            />
          </HStack>
          <Button
          leftIcon={<DeleteIcon />}
          onClick={() => deleteTodo(todo.id)}
          colorScheme="red"
          size="sm"
          letterSpacing="tight"
          >
            Удалить
          </Button>
        </HStack>
      ))}
    </VStack>
  );
};

export default TodoList;
