import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetching } from '../../../../../hooks';
import bookingService from '../../../../../services/booking.service';
import Chip from '../../../../common/Chip/Chip';
import Tooltip from '../../../../common/Tooltip';
import BookingTable from '../BookingTable/BookingTable';

const RoomsListTableRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [getBookings] = useFetching(async roomId => {
    const { content } = await bookingService.getRoomBookings(roomId);
    setBookings(content);
  });

  useEffect(() => {
    getBookings(row._id);
  }, []);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          <Link to={`/rooms/${row.roomNumber}`}>{row.roomNumber}</Link>
        </TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell align='right'>{row.rate}</TableCell>
        <TableCell align='right'>{row.rentPerDay}&#8381;</TableCell>
        <TableCell align='right'>
          {bookings.length > 0 ? (
            <>
              <Chip
                label='Забронирован'
                color='error'
                onMouseDown={e => {
                  e.stopPropagation();
                }}
                onDelete={() => setOpen(!open)}
                deleteIcon={
                  <Tooltip title='Подробнее' disableInteractive>
                    <IconButton aria-label='expand row' size='small'>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </Tooltip>
                }
              />
            </>
          ) : (
            <Chip label='Свободен' color='success' />
          )}
        </TableCell>
        <TableCell align='right'>
          <Tooltip title='Редактировать номер' disableInteractive={true}>
            <IconButton
              aria-label='expand row'
              size='small'
              color='primary'
              onClick={() => console.log(`/rooms/${row.roomNumber}/edit`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <BookingTable bookings={bookings} roomNumber={row.roomNumber} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RoomsListTableRow;