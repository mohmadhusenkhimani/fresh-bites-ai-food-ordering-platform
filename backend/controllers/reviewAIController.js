const Review = require("../models/reviewModel");
const { summarizeReviews } = require("../utils/reviewSummarizer");


const reviewSummary = async (req, res) => {

    try {

        const reviews = await Review.find({
            food: req.params.id
        });


        const comments = reviews.map(
            (review) => review.comment
        );

let summary;

if (comments.length === 0) {
    summary = "No customer reviews available yet.";
} else {
    summary = summarizeReviews(comments);
}


        res.status(200).json({
            success: true,
            totalReviews: comments.length,
            summary
        });


    } catch (error) {

        console.log("AI Review Summary Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    reviewSummary
};