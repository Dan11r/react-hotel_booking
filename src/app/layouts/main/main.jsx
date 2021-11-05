import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Header from '../../components/common/header';
import ImageSlider from '../../components/common/slider';
import SearchRoomsForm from '../../components/ui/searchRoomsForm';
import useStyles from './styles';

const Main = () => {
  const classes = useStyles();
  return (
    <>
      <ImageSlider />
      <Container>
        <Header />
        <Box className={classes.contentWrapper}>
          <SearchRoomsForm />
          <Typography align='right' className={classes.textWishes}>
            Лучшие номера для вашей работы, отдыха и просто вдохновения
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Main;
