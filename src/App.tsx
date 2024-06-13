
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Container, Center } from '@chakra-ui/react';
import TodoInput from './components/TodoInput';
import TodoFilter  from './components/TodoFilter';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { Todo } from './components/Todo';


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get<Todo[]>('http://localhost:5000/todos');
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const response = await axios.post<Todo>('http://localhost:5000/todos', {
      title: newTodo,
      completed: false
    });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const updateTodo = async (id: number, title: string) => {
    const updatedTodo = { title, completed: false };
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = async (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    }
  };

  return (
    <Box maxW="1280px"  mx="auto" py={15} px={{ base: 40, md: 8 }} shadow='xl' rounded='lg'>
      <Container maxW="container.md" py={5} px={4}>
        <Center>
          <Heading
          as="h1"
          mb={5}
          textAlign="center"
          size="xl"
          color='teal'
          fontWeight="extrabold"
          letterSpacing="tight"
          >
            Список задач
          </Heading>
        </Center>
        <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList todos={todos} filter={filter} toggleComplete={toggleComplete} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
