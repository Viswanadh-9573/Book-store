import Address from "../models/address.model.js";

// @route /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user.userId; 
        const savedAddress = await Address.create({
            ...address,
            userId: userId,
        });

        res.status(201)
            .json({ success: true, message: "Address added successfully", address: savedAddress });

    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// @route /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming auth middleware attaches user ID to req.user

        // Find all addresses belonging to the authenticated user
        const addresses = await Address.find({ userId });

        res.status(200).json({ success: true, addresses });

    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
