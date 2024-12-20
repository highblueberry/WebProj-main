const Reservation = require('../models/Reservation');
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY;

// 예약 페이지
// GET /reservations/:id
const makeReservation = (req, res) => {
    res.render('reservations', {
        title : 'Reservation',
        reservation : req.params.id
    })
};

// 예약하기
// POST /reservations/:id
const createReservation = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwtSecret);
    const { reservation_person, reservation_date, num_guests } = req.body;
    if(!reservation_person || !reservation_date || !num_guests) {
        return res.status(400).send("필수값을 입력해주세요.");
    }
    const reservation = new Reservation({ restaurant_id: req.params.id, user_id: decoded.id, reservation_person, reservation_date, num_guests });
    await reservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
});

module.exports = {
    makeReservation,
    createReservation
}