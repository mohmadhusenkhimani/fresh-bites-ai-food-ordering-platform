// import React from "react";
// import { useState } from "react";
// import hero from "./assets/hero.png";
// import { RiCarLine, RiShieldCheckLine } from "react-icons/ri";
// import Fastfood from "./assets/fastfood.png";
// import Pizza from "./assets/pizza.png";
// import AsianFood from "./assets/asian.png";
// import Colddrink from "./assets/cold.png";
// import Dine from "./assets/dine.png";
// import Easiy from "./assets/easiy.png";
// import Quick from "./assets/quick.png";
// import PopularFoods from "./PopularFoods";
// import Footer from "./assets/footer.png";
// import HotPizza from "./HotPizza";
// import Foot from "./assets/footer-1.png";
// import Footers from "./footer";
// function Home() {
//   const cards = [
//     { id: 1, title: "Fastfood", img: Fastfood },
//     { id: 2, title: "Pizza", img: Pizza },
//     { id: 3, title: "AsianFood", img: AsianFood },
//     { id: 4, title: "ColdDrink", img: Colddrink },
//   ];


//   const testimonials = [
//   {
//     text:
//       "Fresh Bites redefines freshness with every dish. I couldn't believe the difference in taste until I tried their farm-fresh ingredients.",
//     name: "Smit Patel",
//     image: "p3-1.jpg",
//   },
//   {
//     text:
//       "Customer satisfaction is paramount at Fresh Bites. From ordering to delivery, everything is seamless and top-notch.",
//     name: "Avneet Kaur",
//     image: "p-2.jpg",
//   },
//   {
//     text:
//       "Fresh Bites combines convenience with quality. The food arrives hot, fresh, and absolutely delicious every time.",
//     name: "Raj Shah",
//     image: "p-3.jpg",
//   },
// ];
//     const [index, setIndex] = useState(0);

//   const prevSlide = () => {
//     setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
//   };

//   const nextSlide = () => {
//     setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div>
//     <section className="max-w-7xl mx-auto px-6 py-16">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* LEFT CONTENT */}
//         <div>
//           <p className="text-gray-600 mb-3">Easy way to make an order</p>

//           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
//             <span className="text-red-500">HUNGRY?</span> Just wait <br />
//             food at <span className="text-red-500">your door</span>
//           </h1>

//           <p className="text-gray-600 mb-6">
//             Welcome to Fresh Bites, your ultimate destination for delicious and
//             fresh online food ordering!
//           </p>

//           {/* BUTTONS */}
//           <div className="flex items-center gap-4 mb-8">
//             <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
//               Order now →
//             </button>
//             <button className="border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition">
//               See all foods
//             </button>
//           </div>
//           {/* FEATURES */}
//           <div className="flex items-center gap-6 text-sm text-gray-600">
//             <div className="flex items-center gap-2">
//               <span className="text-red-500 text-lg">🚚</span>
//               <span>No shipping charge</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-red-500 text-lg">🔒</span>
//               <span>100% secure checkout</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="flex justify-center">
//           <img
//             src={hero} // put image in public folder
//             alt="Food Delivery"
//             className="w-full max-w-md"
//           />
//         </div>
//       </div>
//       <div className="flex items-center gap-5 mt-5">
//         <p className="flex items-center gap-2">
//           <span className="text-red-500 text-xl">
//             <RiCarLine />
//           </span>
//           No shipping charge
//         </p>

//         <p className="flex items-center gap-2">
//           <span className="text-red-500 text-xl">
//             <RiShieldCheckLine />
//           </span>
//           100% secure checkout
//         </p>
//       </div>
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {cards.map(({ id, title, img }) => (
//             <div
//               key={id}
//               className="flex flex-col items-center bg-pink-50 rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
//             >
//               <img
//                 src={img}
//                 alt={title}
//                 className="w-16 h-16 object-contain mb-3"
//               />
//               <h3 className="text-gray-800 font-semibold">{title}</h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* HEADING SECTION */}
// <div className="text-center max-w-3xl mx-auto px-4 py-16">
//   <h5 className="text-red-500 font-semibold mb-4 tracking-wide uppercase">
//     What we serve
//   </h5>

//   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
//     Just sit back at home
//   </h2>
//   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-1">
//     we will <span className="text-red-500">take care</span>
//   </h2>

//   <p className="text-gray-600 mt-6 leading-relaxed">
//     At Fresh Bites, we serve a delectable array of dishes crafted with care and
//     made with the freshest ingredients.
//   </p>

//   <p className="text-gray-600 mt-2 leading-relaxed">
//     From wholesome salads to savory entrees and delightful desserts,
//     there's something to satisfy every craving.
//   </p>
// </div>

// {/* SERVICES GRID */}
// <div className="max-w-6xl mx-auto px-4 pb-16">
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

//     {/* CARD */}
//     <div className="text-center p-6 rounded-xl">
//       <img
//         src={Quick}
//         alt="Quick Delivery"
//         className="w-24 mx-auto mb-5"
//       />
//       <h5 className="font-semibold text-lg mb-3 text-gray-800">
//         Quick Delivery
//       </h5>
//       <p className="text-gray-600 leading-relaxed">
//         Experience lightning-fast delivery with Fresh Bites, ensuring your
//         meal arrives swiftly to your doorstep.
//       </p>
//     </div>

//     <div className="text-center p-6 rounded-xl">
//       <img
//         src={Dine}
//         alt="Super Dine In"
//         className="w-24 mx-auto mb-5"
//       />
//       <h5 className="font-semibold text-lg mb-3 text-gray-800">
//         Super Dine In
//       </h5>
//       <p className="text-gray-600 leading-relaxed">
//         Experience the ultimate dining convenience with Super Dine In,
//         where delicious meals are just a click away.
//       </p>
//     </div>

//     <div className="text-center p-6 rounded-xl">
//       <img
//         src={Easiy}
//         alt="Easy Pick Up"
//         className="w-24 mx-auto mb-5"
//       />
//       <h5 className="font-semibold text-lg mb-3 text-gray-800">
//         Easy Pick Up
//       </h5>
//       <p className="text-gray-600 leading-relaxed">
//         Enjoy the convenience of easy pick-up options, making your Fresh
//         Bites experience even more seamless.
//       </p>
//     </div>

//   </div>
// </div>
//       <PopularFoods />

// <div className="bg-white py-16">
//   <div className="max-w-7xl mx-auto px-4">

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

//       {/* LEFT IMAGE */}
//       <div className="w-full">
//         <img
//           src={Footer}
//           alt="Food Delivery"
//           className="w-full h-auto rounded-2xl object-cover"
//         />
//       </div>

//       {/* RIGHT CONTENT */}
//       <div>
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//           Why <span className="text-red-500">Fresh Bites?</span>
//         </h2>

//         <p className="text-gray-600 mb-10 leading-relaxed text-base md:text-lg">
//           At Fresh Bites, we're not just a food service — we're a culinary journey.
//           Discover the unparalleled freshness and taste that sets us apart.
//           From farm-fresh ingredients to expertly crafted dishes, every bite
//           is an experience worth savoring.
//         </p>

//         <ul className="space-y-8">
//           <li className="flex gap-4">
//             <span className="w-6 h-6 mt-1 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
//               ✓
//             </span>
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800">
//                 Fresh and tasty foods
//               </h4>
//               <p className="text-gray-600 mt-1">
//                 Indulge in a world of fresh and tasty foods prepared by our chefs.
//               </p>
//             </div>
//           </li>

//           <li className="flex gap-4">
//             <span className="w-6 h-6 mt-1 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
//               ✓
//             </span>
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800">
//                 Quality support
//               </h4>
//               <p className="text-gray-600 mt-1">
//                 Outstanding customer support with every order.
//               </p>
//             </div>
//           </li>

//           <li className="flex gap-4">
//             <span className="w-6 h-6 mt-1 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
//               ✓
//             </span>
//             <div>
//               <h4 className="text-lg font-semibold text-gray-800">
//                 Order from any location
//               </h4>
//               <p className="text-gray-600 mt-1">
//                 Delicious food is always just a tap away.
//               </p>
//             </div>
//           </li>
//         </ul>
//       </div>

//     </div>
//   </div>
// </div>


//       <HotPizza />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* LEFT CONTENT */}
//         <div>
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
//             <span className="text-red-500">Testimonial</span>
//           </h1>
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
//             <span className="text-red-500">What our</span> customers are saying
//           </h1>

//           <p className="text-gray-600 mb-6">
//             Fresh Bites truly lives up to its name! Every bite bursts with
//             freshness and flavor. From the crisp salads to the hearty
//             sandwiches, each dish is a delightful journey for the taste buds.
//           </p>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="flex justify-center">
//           <img
//             src={Foot} // put image in public folder
//             alt="Food Delivery"
//             className="w-full max-w-md"
//           />
//         </div>
//       </div>
//        <div className="max-w-3xl mx-auto px-4 text-center">
//         <div className="transition-all duration-500 ease-in-out">
//           <p className="text-lg text-gray-600 italic mb-6">
//             “{testimonials[index].text}”
//           </p>

//           <div className="flex items-center justify-center gap-4">
//             <img
//               src={testimonials[index].image}
//               alt={testimonials[index].name}
//               className="w-14 h-14 rounded-full object-cover"
//             />
//             <h6 className="font-semibold text-gray-800">
//               {testimonials[index].name}
//             </h6>
//           </div>
//         </div>

//         <div className="flex justify-center gap-6 mt-8">
//           <button
//             onClick={prevSlide}
//             className="px-5 py-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
//           >
//             Previous
//           </button>

//           <button
//             onClick={nextSlide}
//             className="px-5 py-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
//           >
//             Next
//           </button>
//         </div>
       
//       </div>
     
//     </section>
//   <Footers/>
//     </div>

//   );
// }

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import hero from "./assets/hero.png";

import {
  RiCarLine,
  RiShieldCheckLine,
  RiArrowRightLine,
  RiStarFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiShoppingBagLine,
  RiRestaurantLine,
  RiTakeawayLine,
} from "react-icons/ri";

import Fastfood from "./assets/fastfood.png";
import Pizza from "./assets/pizza.png";
import AsianFood from "./assets/asian.png";
import Colddrink from "./assets/cold.png";

import Dine from "./assets/dine.png";
import Easiy from "./assets/easiy.png";
import Quick from "./assets/quick.png";

import PopularFoods from "./PopularFoods";
import Footer from "./assets/footer.png";
import HotPizza from "./HotPizza";
import Foot from "./assets/footer-1.png";
import Footers from "./footer";

function Home() {
  const navigate = useNavigate();

  /* =========================================================
     FOOD CATEGORIES
  ========================================================= */

  const cards = [
    {
      id: 1,
      title: "Fast Food",
      img: Fastfood,
    },
    {
      id: 2,
      title: "Pizza",
      img: Pizza,
    },
    {
      id: 3,
      title: "Asian Food",
      img: AsianFood,
    },
    {
      id: 4,
      title: "Cold Drink",
      img: Colddrink,
    },
  ];

  /* =========================================================
     TESTIMONIALS
  ========================================================= */

  const testimonials = [
    {
      text:
        "Fresh Bites redefines freshness with every dish. I couldn't believe the difference in taste until I tried their farm-fresh ingredients.",
      name: "Smit Patel",
      image: "/p-1.jpg",
    },
    {
      text:
        "Customer satisfaction is paramount at Fresh Bites. From ordering to delivery, everything is seamless and top-notch.",
      name: "Avneet Kaur",
      image: "/p-2.jpg",
    },
    {
      text:
        "Fresh Bites combines convenience with quality. The food arrives hot, fresh, and absolutely delicious every time.",
      name: "Raj Shah",
      image: "/p-3.jpg",
    },
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#080d16] text-white overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* Background Glow */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            md:left-1/4
            md:translate-x-0
            w-64
            h-64
            md:w-96
            md:h-96
            bg-red-500/10
            blur-[100px]
            md:blur-[120px]
            rounded-full
            pointer-events-none
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-6
            lg:px-10
            py-12
            sm:py-16
            md:py-20
            lg:py-24
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-12
              lg:gap-16
              items-center
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="relative z-10 text-center lg:text-left">

              {/* Badge */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  mb-5
                  sm:mb-6
                  rounded-full
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  text-xs
                  sm:text-sm
                "
              >
                <span className="text-base sm:text-lg">
                  ⚡
                </span>

                <span>
                  Easy way to make an order
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-6xl
                  xl:text-7xl
                  font-extrabold
                  leading-[1.08]
                  tracking-tight
                  mb-5
                  sm:mb-6
                "
              >
                <span className="text-red-500">
                  HUNGRY?
                </span>{" "}
                Just wait
                <br />
                food at{" "}
                <span className="text-red-500">
                  your door
                </span>
              </h1>

              {/* Description */}
              <p
                className="
                  max-w-xl
                  mx-auto
                  lg:mx-0
                  text-gray-400
                  text-sm
                  sm:text-base
                  md:text-lg
                  leading-relaxed
                  mb-7
                  sm:mb-8
                "
              >
                Welcome to Fresh Bites, your ultimate
                destination for delicious and fresh
                online food ordering!
              </p>

              {/* Buttons */}
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  lg:justify-start
                  gap-3
                  sm:gap-4
                  mb-8
                  sm:mb-9
                "
              >

                <button
                  onClick={() => navigate("/food")}
                  className="
                    group
                    w-full
                    sm:w-auto
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-7
                    py-3.5
                    rounded-xl
                    font-semibold
                    shadow-[0_0_25px_rgba(239,68,68,0.25)]
                    hover:shadow-[0_0_35px_rgba(239,68,68,0.4)]
                    transition-all
                    duration-300
                  "
                >
                  Order now

                  <RiArrowRightLine
                    className="
                      text-xl
                      group-hover:translate-x-1
                      transition-transform
                    "
                  />
                </button>

                <button
                  onClick={() => navigate("/food")}
                  className="
                    w-full
                    sm:w-auto
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-7
                    py-3.5
                    rounded-xl
                    border
                    border-white/15
                    bg-white/5
                    text-gray-200
                    font-semibold
                    hover:bg-white/10
                    hover:border-red-500/50
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  See all foods
                </button>

              </div>

              {/* Features */}
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  lg:justify-start
                  gap-5
                  sm:gap-6
                "
              >

                {/* Feature 1 */}
                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-red-500/10
                      border
                      border-red-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <RiCarLine className="text-red-400 text-xl" />
                  </div>

                  <span className="text-xs sm:text-sm text-gray-400">
                    No shipping charge
                  </span>

                </div>

                {/* Divider */}
                <div
                  className="
                    hidden
                    sm:block
                    h-8
                    w-px
                    bg-white/10
                  "
                />

                {/* Feature 2 */}
                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-red-500/10
                      border
                      border-red-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <RiShieldCheckLine className="text-red-400 text-xl" />
                  </div>

                  <span className="text-xs sm:text-sm text-gray-400">
                    100% secure checkout
                  </span>

                </div>

              </div>
            </div>

            {/* =================================================
                HERO IMAGE
            ================================================= */}

            <div
              className="
                relative
                flex
                justify-center
                items-center
                min-h-[300px]
                sm:min-h-[380px]
                lg:min-h-[500px]
              "
            >

              {/* Glow */}
              <div
                className="
                  absolute
                  w-60
                  h-60
                  sm:w-80
                  sm:h-80
                  md:w-96
                  md:h-96
                  bg-red-500/15
                  blur-[70px]
                  sm:blur-[90px]
                  rounded-full
                "
              />

              {/* Decorative Circle */}
              <div
                className="
                  absolute
                  w-[240px]
                  h-[240px]
                  sm:w-[320px]
                  sm:h-[320px]
                  md:w-[420px]
                  md:h-[420px]
                  rounded-full
                  border
                  border-red-500/10
                "
              />

              <div
                className="
                  absolute
                  w-[200px]
                  h-[200px]
                  sm:w-[280px]
                  sm:h-[280px]
                  md:w-[360px]
                  md:h-[360px]
                  rounded-full
                  border
                  border-white/5
                "
              />

              <img
                src={hero}
                alt="Fresh Bites Food Delivery"
                className="
                  relative
                  z-10
                  w-[75%]
                  sm:w-[70%]
                  md:w-[65%]
                  lg:w-full
                  max-w-md
                  object-contain
                  drop-shadow-[0_20px_50px_rgba(239,68,68,0.18)]
                "
              />

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          SERVICE FEATURE STRIP
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-10
          pb-10
          sm:pb-12
        "
      >

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            rounded-2xl
            border
            border-white/10
            bg-[#0d1421]
            overflow-hidden
            shadow-[0_15px_50px_rgba(0,0,0,0.25)]
          "
        >

          {/* Fast Delivery */}
          <div
            className="
              p-5
              sm:p-6
              flex
              items-center
              gap-4
              border-b
              sm:border-b-0
              lg:border-r
              border-white/10
              hover:bg-white/[0.03]
              transition
            "
          >

            <div
              className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                shrink-0
                rounded-full
                bg-red-500/15
                border
                border-red-500/20
                flex
                items-center
                justify-center
              "
            >
              <RiCarLine className="text-red-400 text-xl sm:text-2xl" />
            </div>

            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Fast Delivery
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Hot and fresh food
              </p>
            </div>

          </div>


          {/* Safe Payment */}
          <div
            className="
              p-5
              sm:p-6
              flex
              items-center
              gap-4
              border-b
              lg:border-b-0
              lg:border-r
              border-white/10
              hover:bg-white/[0.03]
              transition
            "
          >

            <div
              className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                shrink-0
                rounded-full
                bg-green-500/15
                border
                border-green-500/20
                flex
                items-center
                justify-center
              "
            >
              <RiShieldCheckLine className="text-green-400 text-xl sm:text-2xl" />
            </div>

            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Safe Payment
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                100% secure checkout
              </p>
            </div>

          </div>


          {/* Best Quality */}
          <div
            className="
              p-5
              sm:p-6
              flex
              items-center
              gap-4
              border-b
              sm:border-b-0
              lg:border-r
              border-white/10
              hover:bg-white/[0.03]
              transition
            "
          >

            <div
              className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                shrink-0
                rounded-full
                bg-purple-500/15
                border
                border-purple-500/20
                flex
                items-center
                justify-center
              "
            >
              <RiStarFill className="text-purple-400 text-xl sm:text-2xl" />
            </div>

            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Best Quality
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Fresh ingredients
              </p>
            </div>

          </div>


          {/* Support */}
          <div
            className="
              p-5
              sm:p-6
              flex
              items-center
              gap-4
              hover:bg-white/[0.03]
              transition
            "
          >

            <div
              className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                shrink-0
                rounded-full
                bg-orange-500/15
                border
                border-orange-500/20
                flex
                items-center
                justify-center
              "
            >
              <span className="text-orange-400 text-xl sm:text-2xl">
                ★
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                24/7 Support
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                We are here to help
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FOOD CATEGORIES
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-10
          py-10
          sm:py-14
          md:py-16
        "
      >

        <div className="text-center mb-8 sm:mb-10">

          <p
            className="
              text-red-500
              font-semibold
              uppercase
              tracking-[0.2em]
              text-xs
              sm:text-sm
              mb-3
            "
          >
            Explore Menu
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
            "
          >
            What are you{" "}
            <span className="text-red-500">
              craving?
            </span>
          </h2>

          <p
            className="
              text-gray-500
              mt-3
              max-w-xl
              mx-auto
              text-sm
              sm:text-base
            "
          >
            Choose from our delicious categories
            and discover your next favorite meal.
          </p>

        </div>


        {/* Category Cards */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            sm:gap-5
          "
        >

          {cards.map(({ id, title, img }) => (

            <button
              key={id}
              onClick={() => navigate("/food")}
              className="
                group
                relative
                flex
                flex-col
                items-center
                justify-center
                min-h-[160px]
                sm:min-h-[180px]
                p-5
                sm:p-6
                rounded-2xl
                bg-[#0d1421]
                border
                border-white/10
                hover:border-red-500/40
                hover:bg-[#111a29]
                shadow-lg
                hover:shadow-[0_15px_40px_rgba(239,68,68,0.12)]
                cursor-pointer
                transition-all
                duration-300
              "
            >

              {/* Hover Background */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-gradient-to-b
                  from-red-500/[0.06]
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              />

              <img
                src={img}
                alt={title}
                className="
                  relative
                  w-16
                  h-16
                  sm:w-20
                  sm:h-20
                  object-contain
                  mb-3
                  sm:mb-4
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              />

              <h3
                className="
                  relative
                  text-gray-200
                  font-semibold
                  text-sm
                  sm:text-base
                "
              >
                {title}
              </h3>

              <div
                className="
                  mt-3
                  w-7
                  sm:w-8
                  h-1
                  rounded-full
                  bg-red-500/60
                  group-hover:w-12
                  transition-all
                "
              />

            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          WHAT WE SERVE
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-10
          py-16
          sm:py-20
          md:py-24
        "
      >

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <p
            className="
              text-red-500
              font-semibold
              mb-4
              tracking-[0.2em]
              uppercase
              text-xs
              sm:text-sm
            "
          >
            What we serve
          </p>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              leading-tight
            "
          >
            Just sit back at home
          </h2>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              leading-tight
              mt-2
            "
          >
            we will{" "}
            <span className="text-red-500">
              take care
            </span>
          </h2>

          <p
            className="
              text-gray-500
              mt-5
              sm:mt-6
              leading-relaxed
              text-sm
              sm:text-base
            "
          >
            At Fresh Bites, we serve a delectable
            array of dishes crafted with care and
            made with the freshest ingredients.
          </p>

          <p
            className="
              text-gray-500
              mt-2
              leading-relaxed
              text-sm
              sm:text-base
            "
          >
            From wholesome salads to savory entrees
            and delightful desserts, there's something
            to satisfy every craving.
          </p>

        </div>


        {/* Services */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            sm:gap-6
            mt-10
            sm:mt-14
          "
        >

          {/* Quick Delivery */}
          <div
            className="
              group
              p-6
              sm:p-8
              text-center
              rounded-2xl
              bg-[#0d1421]
              border
              border-white/10
              hover:border-red-500/30
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-24
                h-24
                sm:w-28
                sm:h-28
                mx-auto
                mb-5
                sm:mb-6
                rounded-full
                bg-red-500/5
                border
                border-red-500/10
                flex
                items-center
                justify-center
              "
            >
              <img
                src={Quick}
                alt="Quick Delivery"
                className="w-16 sm:w-20"
              />
            </div>

            <h5
              className="
                font-semibold
                text-lg
                sm:text-xl
                mb-3
                text-white
              "
            >
              Quick Delivery
            </h5>

            <p
              className="
                text-gray-500
                leading-relaxed
                text-sm
                sm:text-base
              "
            >
              Experience lightning-fast delivery
              with Fresh Bites, ensuring your meal
              arrives swiftly to your doorstep.
            </p>

          </div>


          {/* Super Dine In */}
          <div
            className="
              group
              p-6
              sm:p-8
              text-center
              rounded-2xl
              bg-[#0d1421]
              border
              border-white/10
              hover:border-purple-500/30
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-24
                h-24
                sm:w-28
                sm:h-28
                mx-auto
                mb-5
                sm:mb-6
                rounded-full
                bg-purple-500/5
                border
                border-purple-500/10
                flex
                items-center
                justify-center
              "
            >
              <img
                src={Dine}
                alt="Super Dine In"
                className="w-16 sm:w-20"
              />
            </div>

            <h5
              className="
                font-semibold
                text-lg
                sm:text-xl
                mb-3
                text-white
              "
            >
              Super Dine In
            </h5>

            <p
              className="
                text-gray-500
                leading-relaxed
                text-sm
                sm:text-base
              "
            >
              Experience the ultimate dining
              convenience with Super Dine In,
              where delicious meals are just
              a click away.
            </p>

          </div>


          {/* Easy Pick Up */}
          <div
            className="
              group
              p-6
              sm:p-8
              text-center
              rounded-2xl
              bg-[#0d1421]
              border
              border-white/10
              hover:border-orange-500/30
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-24
                h-24
                sm:w-28
                sm:h-28
                mx-auto
                mb-5
                sm:mb-6
                rounded-full
                bg-orange-500/5
                border
                border-orange-500/10
                flex
                items-center
                justify-center
              "
            >
              <img
                src={Easiy}
                alt="Easy Pick Up"
                className="w-16 sm:w-20"
              />
            </div>

            <h5
              className="
                font-semibold
                text-lg
                sm:text-xl
                mb-3
                text-white
              "
            >
              Easy Pick Up
            </h5>

            <p
              className="
                text-gray-500
                leading-relaxed
                text-sm
                sm:text-base
              "
            >
              Enjoy the convenience of easy pick-up
              options, making your Fresh Bites
              experience even more seamless.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR FOODS
      ===================================================== */}

      <section
        className="
          bg-[#080d16]
          py-8
          sm:py-10
        "
      >
        <PopularFoods />
      </section>


      {/* =====================================================
          WHY FRESH BITES
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-10
          py-16
          sm:py-20
          md:py-24
        "
      >

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            lg:gap-16
            items-center
          "
        >

          {/* IMAGE */}
          <div className="relative order-2 lg:order-1">

            <div
              className="
                absolute
                inset-5
                bg-red-500/10
                blur-[60px]
                sm:blur-[70px]
                rounded-full
              "
            />

            <div
              className="
                relative
                rounded-3xl
                overflow-hidden
                border
                border-white/10
                bg-[#0d1421]
                p-2
                sm:p-3
              "
            >

              <img
                src={Footer}
                alt="Fresh Bites Food"
                className="
                  w-full
                  h-auto
                  rounded-2xl
                  object-cover
                "
              />

            </div>

          </div>


          {/* CONTENT */}
          <div className="order-1 lg:order-2">

            <p
              className="
                text-red-500
                font-semibold
                uppercase
                tracking-[0.2em]
                text-xs
                sm:text-sm
                mb-4
              "
            >
              Why choose us
            </p>

            <h2
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold
                mb-5
                sm:mb-6
              "
            >
              Why{" "}
              <span className="text-red-500">
                Fresh Bites?
              </span>
            </h2>

            <p
              className="
                text-gray-500
                mb-8
                sm:mb-10
                leading-relaxed
                text-sm
                sm:text-base
                md:text-lg
              "
            >
              At Fresh Bites, we're not just a food
              service — we're a culinary journey.
              Discover the unparalleled freshness
              and taste that sets us apart.
              From farm-fresh ingredients to
              expertly crafted dishes, every bite
              is an experience worth savoring.
            </p>


            {/* Benefits */}
            <ul className="space-y-6 sm:space-y-7">

              {/* Item 1 */}
              <li className="flex gap-4">

                <span
                  className="
                    shrink-0
                    w-9
                    h-9
                    rounded-full
                    bg-red-500
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_18px_rgba(239,68,68,0.3)]
                  "
                >
                  ✓
                </span>

                <div>

                  <h4
                    className="
                      text-base
                      sm:text-lg
                      font-semibold
                      text-white
                    "
                  >
                    Fresh and tasty foods
                  </h4>

                  <p
                    className="
                      text-gray-500
                      mt-1
                      leading-relaxed
                      text-sm
                      sm:text-base
                    "
                  >
                    Indulge in a world of fresh and
                    tasty foods prepared by our chefs.
                  </p>

                </div>

              </li>


              {/* Item 2 */}
              <li className="flex gap-4">

                <span
                  className="
                    shrink-0
                    w-9
                    h-9
                    rounded-full
                    bg-red-500
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_18px_rgba(239,68,68,0.3)]
                  "
                >
                  ✓
                </span>

                <div>

                  <h4
                    className="
                      text-base
                      sm:text-lg
                      font-semibold
                      text-white
                    "
                  >
                    Quality support
                  </h4>

                  <p
                    className="
                      text-gray-500
                      mt-1
                      leading-relaxed
                      text-sm
                      sm:text-base
                    "
                  >
                    Outstanding customer support with
                    every order.
                  </p>

                </div>

              </li>


              {/* Item 3 */}
              <li className="flex gap-4">

                <span
                  className="
                    shrink-0
                    w-9
                    h-9
                    rounded-full
                    bg-red-500
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_18px_rgba(239,68,68,0.3)]
                  "
                >
                  ✓
                </span>

                <div>

                  <h4
                    className="
                      text-base
                      sm:text-lg
                      font-semibold
                      text-white
                    "
                  >
                    Order from any location
                  </h4>

                  <p
                    className="
                      text-gray-500
                      mt-1
                      leading-relaxed
                      text-sm
                      sm:text-base
                    "
                  >
                    Delicious food is always just
                    a tap away.
                  </p>

                </div>

              </li>

            </ul>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOT PIZZA
      ===================================================== */}

      <section
        className="
          bg-[#0a101b]
          py-8
          sm:py-10
        "
      >
        <HotPizza />
      </section>


      {/* =====================================================
          TESTIMONIAL
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-10
          py-16
          sm:py-20
          md:py-24
        "
      >

        {/* Intro */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-16
            items-center
          "
        >

          {/* LEFT */}
          <div className="text-center lg:text-left">

            <p
              className="
                text-red-500
                font-semibold
                uppercase
                tracking-[0.2em]
                text-xs
                sm:text-sm
                mb-4
              "
            >
              Testimonial
            </p>

            <h2
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold
                leading-tight
                mb-5
                sm:mb-6
              "
            >
              What our{" "}
              <span className="text-red-500">
                customers
              </span>{" "}
              are saying
            </h2>

            <p
              className="
                text-gray-500
                text-sm
                sm:text-base
                md:text-lg
                leading-relaxed
                max-w-xl
                mx-auto
                lg:mx-0
              "
            >
              Fresh Bites truly lives up to its name!
              Every bite bursts with freshness and
              flavor. From the crisp salads to the
              hearty sandwiches, each dish is a
              delightful journey for the taste buds.
            </p>

          </div>


          {/* RIGHT IMAGE */}
          <div className="flex justify-center">

            <div
              className="
                relative
                max-w-md
                w-full
              "
            >

              <div
                className="
                  absolute
                  inset-10
                  bg-red-500/10
                  blur-[60px]
                  sm:blur-[70px]
                  rounded-full
                "
              />

              <img
                src={Foot}
                alt="Fresh Bites"
                className="
                  relative
                  z-10
                  w-full
                  rounded-3xl
                  drop-shadow-[0_20px_50px_rgba(239,68,68,0.12)]
                "
              />

            </div>

          </div>

        </div>


        {/* =================================================
            TESTIMONIAL CARD
        ================================================= */}

        <div
          className="
            max-w-3xl
            mx-auto
            mt-12
            sm:mt-16
          "
        >

          <div
            className="
              relative
              p-6
              sm:p-8
              md:p-10
              rounded-3xl
              bg-[#0d1421]
              border
              border-white/10
              text-center
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
          >

            {/* Quote */}
            <div
              className="
                text-red-500
                text-5xl
                sm:text-6xl
                font-serif
                mb-2
              "
            >
              "
            </div>

            {/* Testimonial Text */}
            <p
              className="
                text-base
                sm:text-lg
                md:text-xl
                text-gray-400
                italic
                leading-relaxed
                mb-7
                sm:mb-8
              "
            >
              “{testimonials[index].text}”
            </p>


            {/* User */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                sm:gap-4
              "
            >

              <div className="relative shrink-0">

                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  className="
                    w-12
                    h-12
                    sm:w-14
                    sm:h-14
                    rounded-full
                    object-cover
                    border-2
                    border-red-500/40
                  "
                />

                <span
                  className="
                    absolute
                    -bottom-1
                    -right-1
                    w-5
                    h-5
                    rounded-full
                    bg-red-500
                    text-white
                    text-xs
                    flex
                    items-center
                    justify-center
                  "
                >
                  ✓
                </span>

              </div>

              <div className="text-left">

                <h6
                  className="
                    font-semibold
                    text-white
                    text-sm
                    sm:text-base
                  "
                >
                  {testimonials[index].name}
                </h6>

                <p
                  className="
                    text-xs
                    text-gray-500
                    mt-1
                  "
                >
                  Verified Customer
                </p>

              </div>

            </div>


            {/* Navigation */}
            <div
              className="
                flex
                justify-center
                gap-3
                mt-8
                sm:mt-9
              "
            >

              <button
                onClick={prevSlide}
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  text-gray-400
                  hover:bg-red-500
                  hover:text-white
                  hover:border-red-500
                  transition-all
                  flex
                  items-center
                  justify-center
                "
                aria-label="Previous testimonial"
              >
                <RiArrowLeftSLine className="text-xl" />
              </button>

              <button
                onClick={nextSlide}
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-full
                  bg-red-500
                  text-white
                  hover:bg-red-600
                  transition-all
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_18px_rgba(239,68,68,0.25)]
                "
                aria-label="Next testimonial"
              >
                <RiArrowRightSLine className="text-xl" />
              </button>

            </div>


            {/* Dots */}
            <div
              className="
                flex
                justify-center
                gap-2
                mt-5
                sm:mt-6
              "
            >

              {testimonials.map((_, i) => (

                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      index === i
                        ? "w-8 bg-red-500"
                        : "w-2 bg-white/20"
                    }
                  `}
                  aria-label={`Go to testimonial ${i + 1}`}
                />

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footers />

    </div>
  );
}

export default Home;