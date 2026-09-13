// import { useEffect, useState } from "react";
// import axios from "axios";

// const ReviewSummary = ({ foodId }) => {

//     const [summary, setSummary] = useState("");
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {

//         const fetchSummary = async () => {

//             try {

//                 const { data } = await axios.get(
//                     `http://localhost:5000/api/review-ai/summary/${foodId}`
//                 );


//                 setSummary(data.summary);

//             } catch (error) {

//                 console.log(
//                     "Review Summary Error:",
//                     error
//                 );

//             } finally {

//                 setLoading(false);

//             }

//         };


//         if (foodId) {
//             fetchSummary();
//         }


//     }, [foodId]);



//     if (loading) {
//         return (
//             <div>
//                 Loading AI Review Summary...
//             </div>
//         );
//     }



//     return (

//         <div className="mt-6 p-4 bg-gray-100 rounded-lg">

//             <h3 className="text-xl font-semibold">
//                 🤖 AI Review Summary
//             </h3>


//             <p className="mt-2 text-gray-700">
//                 {summary}
//             </p>

//         </div>

//     );

// };


// export default ReviewSummary;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaStar,
  FaSpinner,
  FaLightbulb,
} from "react-icons/fa";

const ReviewSummary = ({ foodId }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/review-ai/summary/${foodId}`
        );

        setSummary(data.summary || "No AI summary available yet.");
      } catch (error) {
        console.log("Review Summary Error:", error);

        setSummary(
          "AI review summary is currently unavailable."
        );
      } finally {
        setLoading(false);
      }
    };

    if (foodId) {
      fetchSummary();
    } else {
      setLoading(false);
    }
  }, [foodId]);

  // =====================================================
  // LOADING STATE
  // =====================================================
  if (loading) {
    return (
      <div
        className="
          mt-6
          w-full
          bg-[#101722]
          border
          border-white/10
          rounded-2xl
          p-5
          sm:p-6
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-11
              h-11
              flex-shrink-0
              rounded-xl
              bg-red-500/10
              border
              border-red-500/20
              flex
              items-center
              justify-center
            "
          >
            <FaRobot className="text-red-500 text-lg" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-white">
              AI Review Summary
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <FaSpinner className="text-red-500 animate-spin text-xs" />

              <p className="text-xs sm:text-sm text-gray-500">
                Analyzing customer reviews...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN COMPONENT
  // =====================================================
  return (
    <div
      className="
        mt-6
        w-full
        bg-[#101722]
        border
        border-white/10
        rounded-2xl
        overflow-hidden
      "
    >
      {/* =================================================
          HEADER
      ================================================== */}
      <div
        className="
          flex
          items-center
          gap-4
          px-5
          sm:px-6
          py-4
          border-b
          border-white/10
          bg-[#0d1421]
        "
      >
        {/* AI ICON */}
        <div
          className="
            w-11
            h-11
            sm:w-12
            sm:h-12
            flex-shrink-0
            rounded-xl
            bg-red-500/10
            border
            border-red-500/20
            flex
            items-center
            justify-center
          "
        >
          <FaRobot className="text-red-500 text-lg sm:text-xl" />
        </div>

        {/* TITLE */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="
                text-base
                sm:text-lg
                font-bold
                text-white
              "
            >
              AI Review Summary
            </h3>

            <span
              className="
                hidden
                sm:inline-flex
                items-center
                gap-1
                px-2
                py-0.5
                rounded-full
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                text-[10px]
                font-semibold
              "
            >
              <FaRobot className="text-[9px]" />
              AI
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            A quick summary of what customers think
          </p>
        </div>
      </div>

      {/* =================================================
          SUMMARY CONTENT
      ================================================== */}
      <div className="p-5 sm:p-6">
        {summary ? (
          <div className="flex gap-3">
            {/* LEFT ACCENT */}
            <div
              className="
                w-1
                flex-shrink-0
                rounded-full
                bg-red-500
              "
            />

            {/* SUMMARY */}
            <p
              className="
                text-sm
                sm:text-base
                text-gray-300
                leading-7
              "
            >
              {summary}
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <FaRobot className="mx-auto text-gray-600 text-2xl mb-3" />

            <p className="text-sm text-gray-500">
              No AI review summary available yet.
            </p>
          </div>
        )}
      </div>

      {/* =================================================
          AI FOOTER
      ================================================== */}
      <div
        className="
          px-5
          sm:px-6
          py-3
          border-t
          border-white/5
          bg-black/10
        "
      >
        <div className="flex items-center gap-2">
          <FaLightbulb className="text-yellow-500 text-xs flex-shrink-0" />

          <p className="text-[11px] sm:text-xs text-gray-500">
            AI-generated summary based on customer reviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;