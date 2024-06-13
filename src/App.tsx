import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, Checkbox, HStack, Container, Heading, Center, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Todo } from './components/Todo';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');


  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      const response = await axios.get<Todo[]>('http://localhost:5000/todos');
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  const addTodo = async (): Promise<void> => {
    const response = await axios.post<Todo>('http://localhost:5000/todos', {
      title: newTodo,
      completed: false
    });

    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const updateTodo = async (id: number, title: string): Promise<void> => {
    const updatedTodo = { title, completed: false };
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = async (id: number): Promise<void> => {
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <Box maxW="1280px" mx="auto" py={10} px={{ base: 4, md: 8 }} >
    <Container maxW="container.md" py={5} px={4}>
      <Center>
        <Heading as="h1" mb={5} textAlign="center" size="xl">
          Список задач
        </Heading>
      </Center>

      <HStack mb={5} justify="center">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новую задачу"
          maxW="300px"
          mr={2}
        />
        <Button onClick={addTodo} colorScheme="teal">
          Добавить
        </Button>
      </HStack>

      <HStack spacing={2} mb={4} justify="center">
        <Button onClick={() => setFilter('all')}>Все</Button>
        <Button onClick={() => setFilter('completed')}>Завершенные</Button>
        <Button onClick={() => setFilter('active')}>Активные</Button>
      </HStack>

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
            <Button onClick={() => deleteTodo(todo.id)} colorScheme="red">
              Удалить
            </Button>
          </HStack>
        ))}
      </VStack>
    </Container>

    <Container maxW="container.md" py={5} px={4}>
      <Center>
        <Link
          color='teal.500'
          href="https://github.com/gtompel/todos_tasks.git"
          isExternal
          fontSize="lg"
        >
          GitHub <ExternalLinkIcon mx="2px" />
        </Link>
      </Center>
    </Container>
  </Box>
  );
};

export default App;