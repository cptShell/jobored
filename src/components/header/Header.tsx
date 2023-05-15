import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  createStyles,
  Header,
  Container,
  Group,
  rem,
  Image,
  em,
  Text,
} from '@mantine/core';
import logo from '~/assets/logo.svg';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles(
  ({ colorScheme, colors, radius, fontSizes, fn, primaryColor }) => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      position: 'sticky',
      top: 0,
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
      gap: '0.75em',
      left: 0,
    },

    logo_title: {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '36px',
      letterSpacing: '-0.02em',
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
  const matchesTablet = useMediaQuery('(max-width: 800px)');
  const matchesMobile = useMediaQuery('(max-width: 450px)');
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

  const headerHeight = matchesMobile ? 40 : 60;

  return (
    <Header
      height={headerHeight}
      mih={headerHeight}
      className={classes.wrapper}
    >
      <Container className={classes.header}>
        <Container className={classes.logo}>
          <Image src={logo} alt="" />
          <Text
            display={matchesMobile ? 'none' : 'block'}
            className={classes.logo_title}
          >
            Jobored
          </Text>
        </Container>
        <Group ml={matchesTablet ? 'auto' : 0} spacing={5}>
          {items}
        </Group>
      </Container>
    </Header>
  );
};
