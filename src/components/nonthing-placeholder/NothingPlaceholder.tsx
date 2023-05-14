import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Title } from '@mantine/core';
import nothingSRC from '../../assets/nothing-placeholder.svg';

type Props = {
  message: string;
  withRedirect: boolean;
};

export const NothingPlaceholder: FC<Props> = ({ message, withRedirect }) => {
  const navigate = useNavigate();
  const handleRedirect = () => navigate('/search');

  return (
    <Flex mt={120} align={'center'} direction={'column'} gap={24}>
      <img src={nothingSRC} alt="" />
      <Title size={24}>{message}</Title>
      {withRedirect && (
        <Button variant="light" onClick={handleRedirect}>
          Поиск вакансий
        </Button>
      )}
    </Flex>
  );
};
