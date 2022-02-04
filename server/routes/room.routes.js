const express = require('express');
const router = express.Router({ mergeParams: true });
const Room = require('../models/Room');
const auth = require('../middleware/auth.middleware');

router.get('/', async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    let rooms = await Room.find({ ...query });
    if (query.price) {
      rooms = await Room.find({ price: { $gte: query.price[0], $lte: query.price[1] } });
      // return res.status(200).send(rooms);
    }
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.get('/:roomId', auth, async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    res.send(room);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.post('/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    const isBooked = room.bookings.some(booking => booking.toString() === req.body.bookings);

    if (isBooked) {
      const updatedRoom = await Room.findByIdAndUpdate(roomId, { $pull: req.body }, { new: true });
      res.send(updatedRoom);
    } else {
      const updatedRoom = await Room.findByIdAndUpdate(roomId, { $push: req.body }, { new: true });
      res.send(updatedRoom);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.patch('/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    res.send(updatedRoom);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
