import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeReview, updateReview } from '../../../../store/reviews';
import { getCurrentUserData, getUserById } from '../../../../store/users';
import formatDate from '../../../../utils/formatDate';
import Avatar from '../../../common/Avatar';
import Button from '../../../common/Button';
import { TextAreaField } from '../../../common/Fields';
import Loader from '../../../common/Loader';
import Rating from '../../../common/Rating';
import Tooltip from '../../../common/Tooltip';
import ReviewLikes from '../ReviewLikes';

const Review = ({ review }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const user = useSelector(getUserById(review.userId));
  const currentUser = useSelector(getCurrentUserData());

  const displayReviewData = () => {
    if (review.created_at !== review.updated_at) {
      return `Редактирован: ${formatDate(review.updated_at)}`;
    }
    return formatDate(review.created_at);
  };

  const isAdmin = currentUser?.role === 'admin';
  const isAuthor = review.userId === currentUser?._id;
  const showDeleteBtn = isAdmin || isAuthor;

  const handleChangeReview = () => {
    setEditMode(false);
    const payload = { _id: review._id, content };
    dispatch(updateReview(payload));
  };

  useEffect(() => {
    setContent(review.content);
  }, [review]);

  const handleChange = e => {
    setContent(e.target.value);
  };

  if (user) {
    return (
      <li className='reviews-list__item'>
        <div className='review'>
          <div className='review__avatar'>
            <div className='avatar'>
              <Avatar alt='пользователя' src={user.avatarPhoto} className='avatar__img' />
            </div>
            <ReviewLikes reviewId={review._id} />
          </div>
          <div className='review__content'>
            <div className='review__user-name'>
              {`${user.firstName} ${user.secondName}`}
              {isAuthor && (
                <div className='review__edit-btn'>
                  <Tooltip title='Редактировать'>
                    <IconButton onClick={() => setEditMode(true)}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {showDeleteBtn && (
                <div className='review__delete-btn'>
                  <Tooltip title='Удалить отзыв'>
                    <IconButton onClick={() => dispatch(removeReview(review._id))}>
                      <ClearIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <div className='review__rating'>
                <Rating value={review.rating} readOnly />
              </div>
            </div>
            <p className='review__date'>{displayReviewData()}</p>
            {editMode ? (
              <>
                <TextAreaField value={content} onChange={handleChange} rows={3} />
                <Button variant='outlined' size='small' style={{ marginTop: '5px' }} onClick={handleChangeReview}>
                  Применить
                </Button>
              </>
            ) : (
              <p className='review__message'>{content}</p>
            )}
          </div>
        </div>
      </li>
    );
  }
  return <Loader />;
};

export default Review;
