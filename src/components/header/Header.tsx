import { FC, useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  rem,
  Image,
  em,
} from '@mantine/core';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import logo from '~/assets/logo.svg';

const useStyles = createStyles(
  ({ colorScheme, colors, radius, fontSizes, fn, primaryColor }) => ({
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
      maxWidth: em('1115px'),
    },

    link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: radius.sm,
      textDecoration: 'none',
      color: colorScheme === 'dark' ? colors.dark[0] : colors.gray[7],
      fontSize: fontSizes.sm,
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
        color: fn.variant({ variant: 'light', color: primaryColor }).color,
      },
    },
  })
);

type Link = { link: string; label: string };
type Props = { links: Array<Link> };

export const AppHeader: FC<Props> = ({ links }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();

  const items = links.map(({ link, label }) => {
    const className = cx(classes.link, {
      [classes.linkActive]: location.pathname === link,
    });
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      navigate(link);
    };

    return (
      <a key={label} href={link} className={className} onClick={handleClick}>
        {label}
      </a>
    );
  });

  return (
    <Header height={60} mih={60} className={classes.wrapper}>
      <Container className={classes.header}>
        <Container className={classes.logo}>
          <Image width={140} height={30} src={logo} alt="" />
        </Container>
        <Group spacing={5}>{items}</Group>
      </Container>
    </Header>
  );
};
