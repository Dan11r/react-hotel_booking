import { Paper } from '@mui/material';
import React from 'react';
import useMockData from '../../hooks/useMockData';
import Container from '../common/Container/Container';
import SearchRoomsForm from '../ui/forms/searchRoomsForm';

const HomePage = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log('clicked');
    initialize();
  };

  return (
    <main className='main-home__page'>
      <Container>
        <div className='main-home__wrapper'>
          <h1 className='visually-hidden'>Поиск номеров в отеле toxin result school</h1>
          <Paper elevation={3} className='form-card searchRooms-form'>
            <h2>Найдём номера под ваши пожелания</h2>
            <SearchRoomsForm />
          </Paper>
          <p className='main__text-wishes'>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
        </div>
        <h3>Инициализация данных в FireBase</h3>
        <ul>
          <li>Status: {status}</li>
          <li>Progress: {progress}%</li>
          {error && <li>error: {error}</li>}
        </ul>
        <button className='btn btn-primary' onClick={handleClick}>
          Инициализировать
        </button>
      </Container>
    </main>
  );
};

export default HomePage;
