const asyncHandler = require("express-async-handler");
const Restaurant = require('../models/Restaurant');

// Get homepage
// GET /
const getHompage = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find().sort({ "average_rating": -1 });
    res.render("home", {
        title : "Restaurants",
        restaurants : restaurants
    });
});

const getSearch = asyncHandler(async (req, res) => {
    const { search } = req.query;
    results = await Restaurant.find({ 
      rest_name: {
        "$regex": new RegExp(search)
      } 
    })
    
    res.render("search", {
        title : "Restaurants/search",
        results : results
    })
})


module.exports = { 
    getHompage,
    getSearch
 };