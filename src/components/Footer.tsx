import { Container, Center, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;