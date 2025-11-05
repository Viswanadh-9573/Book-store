import User from "../models/user.model.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select('cartItems');
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    return res.status(200).json({ cart: user.cartItems, success: true });
  } catch (error) {
    console.error("Error getting cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { cart } = req.body;

    if (!cart || typeof cart !== 'object') {
      return res.status(400).json({ message: "Invalid cart data", success: false });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems: cart },
      { new: true, select: 'cartItems' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({ message: "Cart updated successfully", cart: updatedUser.cartItems, success: true });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

                                          