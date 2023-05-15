import { Button, Flex, Title } from '@mantine/core';
import { IconBug } from '@tabler/icons-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const handleRedirect = () => navigate('/search');

  return (
    <Flex mt={120} align={'center'} direction={'column'} gap={24} w={'100%'}>
      <IconBug color="#5E96FC" size={230} />
      <Title size={24}>Упс, что-то пошло не так</Title>
      <Button variant="light" onClick={handleRedirect}>
        Вернуться к поиску
      </Button>
    </Flex>
  );
};
