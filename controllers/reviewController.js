const Restaurant = require('../models/Restaurant');
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");


// 리뷰 조회
// GET /review/:id
const getReviews = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant) return res.status(404).json({ message: 'Restaurant not found'});
    res.render('review', {
        title : 'Add Reivew',
        restaurant : restaurant.rest_name,
        restaurantId : req.params.id
    })
})

// 리뷰 작성
// POST /review/:id
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


// 리뷰 삭제
// DELETE //review/:id
const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = mongoose.Types.ObjectId(req.query.id);

    const restaurant = await Restaurant.findOne({ 'reviews._id': reviewId });

    console.log(reviewId);

    if(restaurant) {
        restaurant.reviews.pull({ _id: reviewId });
        await restaurant.save();
    }


    res.redirect("back");
});


module.exports = {
    getReviews,
    addReview,
    deleteReview
}