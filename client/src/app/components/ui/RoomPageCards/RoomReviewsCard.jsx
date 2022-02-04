import React from 'react';
import declOfNum from '../../../utils/declOfNum';

const RoomReviewsCard = ({ countReviews }) => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Впечатления от номера</h3>
      Скоро здесь будет статистика по отзывам! Приносим извинения за неудобства.
      {/* <span className='room-info__card-rating'>{`${countReviews} ${declOfNum(countReviews, [
        'Отзыв',
        'Отзыва',
        'Отзывов',
      ])}`}</span> */}
    </div>
  );
};

export default RoomReviewsCard;
