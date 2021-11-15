import { Grid } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Title from '../common/typography/title';

const useStyles = makeStyles(theme => ({
  NavTitle: {
    '&.MuiTypography-root': {
      marginBottom: '10px',
      fontSize: '14px',
      textTransform: 'uppercase',
    },
  },
  NavLink: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '14px',
    '&:hover': {
      color: '#1976d2',
    },
    transition: 'color 0.2s linear',
  },
}));

const NavList = ({ label, routes, direction = 'row', spacing }) => {
  const classes = useStyles();
  return (
    <Grid container direction={direction} spacing={spacing}>
      {label && (
        <Title isBold component='h3' variant='subtitle2' className={classes.NavTitle}>
          {label}
        </Title>
      )}
      {routes.map(route => (
        <Grid item key={route.name} className={classes.NavWrapper}>
          <NavLink to={route.path} className={classes.NavLink}>
            {route.name}
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default NavList;