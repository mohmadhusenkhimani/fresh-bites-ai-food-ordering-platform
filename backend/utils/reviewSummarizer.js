const positiveWords = [
    "good",
    "great",
    "amazing",
    "excellent",
    "fast",
    "tasty",
    "delicious",
    "love",
    "fresh",
    "crispy",
    "perfect",
    "awesome"
];


const negativeWords = [
    "bad",
    "slow",
    "cold",
    "late",
    "expensive",
    "poor",
    "overpriced",
    "small",
    "worst"
];


const summarizeReviews = (reviews) => {

    let positive = [];
    let negative = [];


    reviews.forEach((review) => {

        const text = review.toLowerCase();


        positiveWords.forEach((word) => {

            if (text.includes(word)) {
                positive.push(word);
            }

        });


        negativeWords.forEach((word) => {

            if (text.includes(word)) {
                negative.push(word);
            }

        });

    });


    let summary = "";


    if (positive.length > 0) {

        summary += 
        "Customers love the taste and quality. ";

    }


    if (negative.length > 0) {

        summary += 
        "Some customers mention issues with " +
        [...new Set(negative)].join(", ") +
        ".";

    }


    if (!summary) {

        summary =
        "Customers shared mixed feedback about this food.";

    }


    return summary;

};


module.exports = {
    summarizeReviews
};