import { IconButton } from '@mui/material';
import React from 'react';
import Tooltip from '../Tooltip';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ButtonFavorite = ({ status, onToggle }) => {
  return (
    <Tooltip title={status ? 'Удалить из избранного' : 'Добавить в избранное'}>
      <IconButton className='room-page__favoriteBtn' size='large' onClick={onToggle}>
        {status ? <StarIcon /> : <StarOutlineIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ButtonFavorite;
