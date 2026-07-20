import React from "react";
import { useState } from "react";
import hero from "./assets/hero.png";
import { RiCarLine, RiShieldCheckLine } from "react-icons/ri";
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
  const cards = [
    { id: 1, title: "Fastfood", img: Fastfood },
    { id: 2, title: "Pizza", img: Pizza },
    { id: 3, title: "AsianFood", img: AsianFood },
    { id: 4, title: "ColdDrink", img: Colddrink },
  ];


  const testimonials = [
  {
    text:
      "Fresh Bites redefines freshness with every dish. I couldn't believe the difference in taste until I tried their farm-fresh ingredients.",
    name: "Smit Patel",
    image: "p3-1.jpg",
  },
  {
    text:
      "Customer satisfaction is paramount at Fresh Bites. From ordering to delivery, everything is seamless and top-notch.",
    name: "Avneet Kaur",
    image: "p-2.jpg",
  },
  {
    text:
      "Fresh Bites combines convenience with quality. The food arrives hot, fresh, and absolutely delicious every time.",
    name: "Raj Shah",
    image: "p-3.jpg",
  },
];
    const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-gray-600 mb-3">Easy way to make an order</p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            <span className="text-red-500">HUNGRY?</span> Just wait <br />
            food at <span className="text-red-500">your door</span>
          </h1>

          <p className="text-gray-600 mb-6">
            Welcome to Fresh Bites, your ultimate destination for delicious and
            fresh online food ordering!
          </p>

          {/* BUTTONS */}
          <div className="flex items-center gap-4 mb-8">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
              Order now →
            </button>
            <button className="border border-red-500 text-red-500 px-6 py-3 rounded-lg hover:bg-red-50 transition">
              See all foods
            </button>
          </div>
          {/* FEATURES */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-lg">🚚</span>
              <span>No shipping charge</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-lg">🔒</span>
              <span>100% secure checkout</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={hero} // put image in public folder
            alt="Food Delivery"
            className="w-full max-w-md"
          />
        </div>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <p className="flex items-center gap-2">
          <span className="text-red-500 text-xl">
            <RiCarLine />
          </span>
          No shipping charge
        </p>

        <p className="flex items-center gap-2">
          <span className="text-red-500 text-xl">
            <RiShieldCheckLine />
          </span>
          100% secure checkout
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {cards.map(({ id, title, img }) => (
            <div
              key={id}
              className="flex flex-col items-center bg-pink-50 rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={img}
                alt={title}
                className="w-16 h-16 object-contain mb-3"
              />
              <h3 className="text-gray-800 font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* HEADING SECTION */}
<div className="text-center max-w-3xl mx-auto px-4 py-16">
  <h5 className="text-red-500 font-semibold mb-4 tracking-wide uppercase">
    What we serve
  </h5>

  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
    Just sit back at home
  </h2>
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-1">
    we will <span className="text-red-500">take care</span>
  </h2>

  <p className="text-gray-600 mt-6 leading-relaxed">
    At Fresh Bites, we serve a delectable array of dishes crafted with care and
    made with the freshest ingredients.
  </p>

  <p className="text-gray-600 mt-2 leading-relaxed">
    From wholesome salads to savory entrees and delightful desserts,
    there's something to satisfy every craving.
  </p>
</div>

{/* SERVICES GRID */}
<div className="max-w-6xl mx-auto px-4 pb-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

    {/* CARD */}
    <div className="text-center p-6 rounded-xl">
      <img
        src={Quick}
        alt="Quick Delivery"
        className="w-24 mx-auto mb-5"
      />
      <h5 className="font-semibold text-lg mb-3 text-gray-800">
        Quick Delivery
      </h5>
      <p className="text-gray-600 leading-relaxed">
        Experience lightning-fast delivery with Fresh Bites, ensuring your
        meal arrives swiftly to your doorstep.
      </p>
    </div>

    <div className="text-center p-6 rounded-xl">
      <img
        src={Dine}
        alt="Super Dine In"
        className="w-24 mx-auto mb-5"
      />
      <h5 className="font-semibold text-lg mb-3 text-gray-800">
        Super Dine In
      </h5>
      <p className="text-gray-600 leading-relaxed">
        Experience the ultimate dining convenience with Super Dine In,
        where delicious meals are just a click away.
      </p>
    </div>

    <div className="text-center p-6 rounded-xl">
      <img
        src={Easiy}
        alt="Easy Pick Up"
        className="w-24 mx-auto mb-5"
      />
      <h5 className="font-semibold text-lg mb-3 text-gray-800">
        Easy Pick Up
      </h5>
      <p className="text-gray-600 leading-relaxed">
        Enjoy the convenience of easy pick-up options, making your Fresh
        Bites experience even more seamless.
      </p>
    </div>

  </div>
</div>
      <PopularFoods />

<div className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

      {/* LEFT IMAGE */}
      <div className="w-full">
        <img
          src={Footer}
          alt="Food Delivery"
          className="w-full h-auto rounded-2xl object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Why <span className="text-red-500">Fresh Bites?</span>
        </h2>

        <p className="text-gray-600 mb-10 leading-relaxed text-base md:text-lg">
          At Fresh Bites, we're not just a food service — we're a culinary journey.
          Discover the unparalleled freshness and taste that sets us apart.
          From farm-fresh ingredients to expertly crafted dishes, every bite
          is an experience worth savoring.
        </p>

        <ul className="space-y-8">
          <li className="flex gap-4">
            <span className="w-6 h-6 mt-1 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
              ✓
            </span>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Fresh and tasty foods
              </h4>
              <p className="text-gray-600 mt-1">
                Indulge in a world of fresh and tasty foods prepared by our chefs.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="w-6 h-6 mt-1 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
              ✓
            </span>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Quality support
              </h4>
              <p className="text-gray-600 mt-1">
                Outstanding customer support with every order.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="w-6 h-6 mt-1 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
              ✓
            </span>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Order from any location
              </h4>
              <p className="text-gray-600 mt-1">
                Delicious food is always just a tap away.
              </p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</div>


      <HotPizza />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            <span className="text-red-500">Testimonial</span>
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            <span className="text-red-500">What our</span> customers are saying
          </h1>

          <p className="text-gray-600 mb-6">
            Fresh Bites truly lives up to its name! Every bite bursts with
            freshness and flavor. From the crisp salads to the hearty
            sandwiches, each dish is a delightful journey for the taste buds.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={Foot} // put image in public folder
            alt="Food Delivery"
            className="w-full max-w-md"
          />
        </div>
      </div>
       <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="transition-all duration-500 ease-in-out">
          <p className="text-lg text-gray-600 italic mb-6">
            “{testimonials[index].text}”
          </p>

          <div className="flex items-center justify-center gap-4">
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <h6 className="font-semibold text-gray-800">
              {testimonials[index].name}
            </h6>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={prevSlide}
            className="px-5 py-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
          >
            Previous
          </button>

          <button
            onClick={nextSlide}
            className="px-5 py-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
          >
            Next
          </button>
        </div>
       
      </div>
     
    </section>
  <Footers/>
    </div>

  );
}

export default Home;
