const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    user_id: {
        type: String,
        
    },
    postedOn : {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        min : 1,
        max : 5
    },
    review : {
        type: String
    }
});

const Review = mongoose.model('reviews', ReviewSchema);
module.exports = User;