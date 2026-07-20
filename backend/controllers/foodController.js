const Food = require('../models/Food');


// // @desc    Get all foods (with optional search & sort)
// // @route   GET /api/foods
// // @access  Public
// const getFoods = async (req, res) => {
//     try{
//         const { search, sort, category } = req.query;
//         let query = { isAvailable: true };

//         // Search by name (case-insensitive)
//         if(search){
//             query.name = { $regex: search, $options: 'i' };
//         }

//         // Filter by category
//         if(category && category !== 'All'){
//             query.category = category;
//         }

//         let foodsQuery = Food.find(query);

//         // Sort options
//         if (sort === "az") foodsQuery = foodsQuery.sort({ name: 1 });
//         else if (sort === "za") foodsQuery = foodsQuery.sort({ name: -1 });
//         else if (sort === "low") foodsQuery = foodsQuery.sort({ price: 1 });
//         else if (sort === "high") foodsQuery = foodsQuery.sort({ price: -1 });
//         else foodsQuery = foodsQuery.sort({ createdAt: -1 });

//         const foods = await foodsQuery.exec();
//         res.json({ success: true, count: foods.length, foods });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const addFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single food by ID
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }
    res.json({ success: true, food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Seed foods (initialize DB with default menu)
// @route   POST /api/foods/seed
// @access  Public (use only during setup)
const seedFoods = async (req, res) => {
  try {
    // const existing = await Food.countDocuments();
    // if (existing > 0) {
    //   return res.json({ success: true, message: "Foods already seeded" });
    // }
    
    await Food.deleteMany();


    const defaultFoods = [
      { name: "Cheese Burger", price: 149, category: "Burger", image: "/assets/b-1.jpg", description: "Juicy beef patty with melted cheese" },
      { name: "Veg Burger", price: 129, category: "Burger", image: "/assets/b-2.jpg", description: "Crispy veggie patty with fresh veggies" },
      { name: "Margherita Pizza", price: 299, category: "Pizza", image: "/assets/b-3.jpg", description: "Classic tomato and mozzarella pizza" },
      { name: "French Fries", price: 99, category: "Snacks", image: "/assets/b-4.jpg", description: "Golden crispy french fries" },
      { name: "Cold Drink", price: 59, category: "Drinks", image: "/assets/b-5.png", description: "Chilled refreshing cold drink" },
      { name: "Chicken Burger", price: 100, category: "Burger", image: "/assets/b-1.jpg", description: "Grilled chicken burger" },
      { name: "Vegetarian Pizza", price: 120, category: "Pizza", image: "/assets/p-1.jpg", description: "Fresh veggie loaded pizza" },
      { name: "Seafood Pizza", price: 160, category: "Pizza", image: "/assets/p-2.jpg", description: "Loaded with fresh seafood" },
      { name: "Mexican Green Wave", price: 180, category: "Pizza", image: "/assets/p-3.jpg", description: "Spicy Mexican style pizza" },
      { name: "Pizza With Mushroom", price: 200, category: "Pizza", image: "/assets/p-4.jpg", description: "Loaded mushroom pizza" },
      { name: "Double Cheese Margherita", price: 110, category: "Pizza", image: "/assets/p-2.jpg", description: "Double cheese heaven" },
      { name: "Mexican Green Wave (Hot)", price: 110, category: "Pizza", image: "/assets/p-3.jpg", description: "Extra spicy Mexican pizza" },
      { name: "Seafood Delight", price: 115, category: "Pizza", image: "/assets/p-4.jpg", description: "Fresh sea flavors on pizza" },
    ];

    await Food.insertMany(defaultFoods);
    res.json({ success: true, message: `Seeded ${defaultFoods.length} food items` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateFood = async (req, res) => {
  try {
    console.log("Food ID:", req.params.id);
    console.log("Request Body:", req.body);

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getFoods, getFoodById, seedFoods, addFood, deleteFood, updateFood };
