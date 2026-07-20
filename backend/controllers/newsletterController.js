const Newsletter = require('../models/Newsletter');

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email is required." });
        const exists = await Newsletter.findOne({ email });
        if (exists) return res.status(400).json({ success: false, message: "Email already subscribed." });  
        await Newsletter.create({ email });
        res.json({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
}; 

module.exports = { subscribe };