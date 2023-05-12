import { Container, Title, Text, Flex } from '@mantine/core';
import { FC } from 'react';
import { IconMapPin } from '@tabler/icons-react';

type Props = {
  profession: string;
  firmName: string;
  town: string;
  workType: string;
  paymentTo: string;
  paymentFrom: string;
  currency: string;
};

export const VacancyItem: FC<Props> = ({
  profession,
  firmName,
  town,
  workType,
  currency,
  paymentFrom,
  paymentTo,
}) => {
  const titleText = profession + (firmName ? ` (${firmName})` : '');
  const salary = `з/п ${currency} rub`;

  return (
    <Container>
      <Title>{titleText}</Title>
      <Flex>
        <Text>{salary}</Text>
        <Text>{workType}</Text>
      </Flex>
      <Flex>
        <IconMapPin color={'grey'} />
        <Text>town</Text>
      </Flex>
    </Container>
  );
};
