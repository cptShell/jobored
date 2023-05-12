import { FC, useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  rem,
  Image,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/logo.svg';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    maxWidth: '1280px',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },

  logo: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    left: 0,
  },

  linkActive: {
    '&, &:hover': {
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

type Link = { link: string; label: string };
type Props = { links: Array<Link> };

export const AppHeader: FC<Props> = ({ links }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map(({ link, label }) => {
    const className = cx(classes.link, {
      [classes.linkActive]: active === link,
    });
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setActive(link);
      navigate(link);
    };

    return (
      <a key={label} href={link} className={className} onClick={handleClick}>
        {label}
      </a>
    );
  });

  return (
    <Header height={60} className={classes.wrapper}>
      <Container className={classes.header}>
        <Container className={classes.logo}>
          <Image width={140} height={30} src={logo} alt="" />
        </Container>
        <Group spacing={5}>{items}</Group>
      </Container>
    </Header>
  );
};
