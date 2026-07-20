import { useEffect, useState } from "react";
import axios from "axios";

const ReviewSummary = ({ foodId }) => {

    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchSummary = async () => {

            try {

                const { data } = await axios.get(
                    `http://localhost:5000/api/review-ai/summary/${foodId}`
                );


                setSummary(data.summary);

            } catch (error) {

                console.log(
                    "Review Summary Error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        if (foodId) {
            fetchSummary();
        }


    }, [foodId]);



    if (loading) {
        return (
            <div>
                Loading AI Review Summary...
            </div>
        );
    }



    return (

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">

            <h3 className="text-xl font-semibold">
                🤖 AI Review Summary
            </h3>


            <p className="mt-2 text-gray-700">
                {summary}
            </p>

        </div>

    );

};


export default ReviewSummary;