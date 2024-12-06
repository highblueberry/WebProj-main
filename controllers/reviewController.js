const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY;

// 리뷰 작성
const addReview = asyncHandler(async (req, res) => {
    const { rating, content } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    if(!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    restaurant.reviews.push({ user_id: req.user.id, rating, content });
    restaurant.total_reviews++;
    restaurant.average_rating = restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.total_reviews;

    await restaurant.save();
    res.status(201).json({ message: 'Review added successfully' });
});

const addReviewForm = asyncHandler((req, res) => {
    res.render("addReview", {
        title : 'writing review'
    });
});


// const createReview = asyncHandler(async (req, res) => {
//     const token = req.cookies.token;
//     const decoded = jwt.verify(token, jwtSecret);

//     const { rating, content, } = req.body;

//     const review = new Reivew({ restaurant_id: req.params.id, user_id: decoded.id, rating: rating, content: contnet });
//     await review.save();
//     res.status(201).json({ message: 'Reservation created successfully' });
// });


module.exports = {
    addReview,
    addReviewForm,
    // createReview
};