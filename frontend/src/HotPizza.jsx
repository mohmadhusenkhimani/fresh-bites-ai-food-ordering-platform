// import VegPizza from "./assets/p-1.jpg";
// import CheesePizza from "./assets/p-2.jpg";
// import MexicanPizza from "./assets/p-3.jpg";
// import SeafoodPizza from "./assets/p-4.jpg";
// import ABC from "./assets/p-5.jpg"
// import { useCart } from "./CartContext";
// import { useDispatch } from "react-redux";
// import { addToCart as addToCartAction } from "./cartSlice";

// const pizzas = [
//   {
//     id: 1,
//     name: "Vegetarian Pizza",
//     price: 115,
//     image: VegPizza,
//   },
//   {
//     id: 2,
//     name: "Double Cheese Margherita",
//     price: 110,
//     image: CheesePizza,
//   },
//   {
//     id: 3,
//     name: "Maxican Green Wave",
//     price: 110,
//     image: MexicanPizza,
//   },
//   {
//     id: 4,
//     name: "Seafood Pizza",
//     price: 115,
//     image: SeafoodPizza,
//   },
//   {
//     id: 5,
//     name: "ABC",
//     price: 160,
//     image: ABC,
//   }
// ];

// export default function HotPizza() {
//   const { cartItems, addToCart } = useCart();
//   const dispatch = useDispatch();
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* Heading */}
//         <h2 className="text-4xl font-bold text-center mb-12">
//           Hot <span className="text-red-500">Pizza</span>
//         </h2>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {pizzas.map((pizza) => (
//             <div
//               key={pizza.id}
//               className="bg-white border border-gray-100
//                  shadow hover:shadow-lg transition
//                  p-6 flex flex-col"
//             >
//               {/* Image */}
//               <img
//                 src={pizza.image}
//                 alt={pizza.name}
//                 className="w-32 h-32 mx-auto object-contain
//                    transition-transform duration-300 hover:scale-110"
//               />

//               {/* Title */}
//               <h3 className="mt-4 font-semibold text-lg text-center">
//                 {pizza.name}
//               </h3>

//               {/* Bottom Section */}
//               <div className="mt-auto flex items-center justify-between pt-6">
//                 {/* Price - Left */}
//                 <span className="text-red-500 font-bold text-lg">
//                   ₹{pizza.price}
//                 </span>

//                 {/* Button - Right */}
//                 <button
//                   className="bg-red-500 text-white px-5 py-2
//                      rounded-lg hover:bg-red-600 transition"
//                   onClick={() => dispatch(addToCartAction(food))}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>


//       </div>
//     </section>
//   );
// }

import VegPizza from "./assets/p-1.jpg";
import CheesePizza from "./assets/p-2.jpg";
import MexicanPizza from "./assets/p-3.jpg";
import SeafoodPizza from "./assets/p-4.jpg";
import ABC from "./assets/p-5.jpg";

import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "./cartSlice";

const pizzas = [
  {
    id: 1,
    name: "Vegetarian Pizza",
    price: 115,
    image: VegPizza,
  },
  {
    id: 2,
    name: "Double Cheese Margherita",
    price: 110,
    image: CheesePizza,
  },
  {
    id: 3,
    name: "Mexican Green Wave",
    price: 110,
    image: MexicanPizza,
  },
  {
    id: 4,
    name: "Seafood Pizza",
    price: 115,
    image: SeafoodPizza,
  },
  {
    id: 5,
    name: "ABC",
    price: 160,
    image: ABC,
  },
];

export default function HotPizza() {
  const dispatch = useDispatch();

  const handleAddToCart = (pizza) => {
    dispatch(
      addToCartAction({
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        image: pizza.image,
      })
    );
  };

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-[#080d16] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 right-[-100px] sm:right-[-150px] w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute bottom-[-150px] left-[-100px] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            FRESH & HOT
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hot{" "}
            <span className="text-red-500">
              Pizza
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
            Enjoy delicious, freshly prepared pizzas loaded
            with your favorite toppings.
          </p>
        </div>

        {/* Pizza Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="
                group
                relative
                bg-[#101722]
                border border-white/10
                rounded-2xl
                p-4 sm:p-5
                flex flex-col
                overflow-hidden
                transition-all duration-300
                hover:-translate-y-1
                hover:border-red-500/30
                hover:shadow-xl
                hover:shadow-red-500/5
              "
            >
              {/* Card Glow */}
              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-32
                  h-32
                  bg-red-500/10
                  rounded-full
                  blur-3xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-500
                  pointer-events-none
                "
              />

              {/* Pizza Image */}
              <div className="relative flex items-center justify-center mb-5">
                <div
                  className="
                    absolute
                    w-28 h-28
                    sm:w-32 sm:h-32
                    rounded-full
                    bg-red-500/5
                    group-hover:bg-red-500/10
                    transition-all duration-300
                  "
                />

                <img
                  src={pizza.image}
                  alt={pizza.name}
                  loading="lazy"
                  className="
                    relative
                    w-32 h-32
                    sm:w-36 sm:h-36
                    object-contain
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Pizza Name */}
              <h3
                className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-white
                  text-center
                  line-clamp-2
                  min-h-[48px]
                  flex
                  items-center
                  justify-center
                "
              >
                {pizza.name}
              </h3>

              {/* Bottom Section */}
              <div className="mt-auto pt-5 flex items-center justify-between gap-3">

                {/* Price */}
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">
                    Price
                  </p>

                  <span className="text-lg sm:text-xl font-extrabold text-red-500">
                    ₹{pizza.price}
                  </span>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={() => handleAddToCart(pizza)}
                  className="
                    px-3 sm:px-4
                    py-2
                    rounded-xl
                    bg-red-500
                    hover:bg-red-600
                    active:scale-95
                    text-white
                    text-xs sm:text-sm
                    font-semibold
                    transition-all duration-200
                    whitespace-nowrap
                  "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-8">
          <p className="text-xs sm:text-sm text-gray-500">
            Freshly prepared • Hot & Delicious • Fast Delivery
          </p>
        </div>
      </div>
    </section>
  );
}