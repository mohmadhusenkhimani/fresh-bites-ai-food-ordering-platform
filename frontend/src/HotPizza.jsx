import VegPizza from "./assets/p-1.jpg";
import CheesePizza from "./assets/p-2.jpg";
import MexicanPizza from "./assets/p-3.jpg";
import SeafoodPizza from "./assets/p-4.jpg";
import ABC from "./assets/p-5.jpg"
import { useCart } from "./CartContext";
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
    name: "Maxican Green Wave",
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
  }
];

export default function HotPizza() {
  const { cartItems, addToCart } = useCart();
  const dispatch = useDispatch();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-12">
          Hot <span className="text-red-500">Pizza</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-white border border-gray-100
                 shadow hover:shadow-lg transition
                 p-6 flex flex-col"
            >
              {/* Image */}
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-32 h-32 mx-auto object-contain
                   transition-transform duration-300 hover:scale-110"
              />

              {/* Title */}
              <h3 className="mt-4 font-semibold text-lg text-center">
                {pizza.name}
              </h3>

              {/* Bottom Section */}
              <div className="mt-auto flex items-center justify-between pt-6">
                {/* Price - Left */}
                <span className="text-red-500 font-bold text-lg">
                  ₹{pizza.price}
                </span>

                {/* Button - Right */}
                <button
                  className="bg-red-500 text-white px-5 py-2
                     rounded-lg hover:bg-red-600 transition"
                  onClick={() => dispatch(addToCartAction(food))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
