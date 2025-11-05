import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Book from "../models/books.model.js"; // Assuming 'books.model.js' is the book model

// Function to place an order with Cash On Delivery (COD)
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming auth middleware attaches user ID to req.user
        const { items, address } = req.body;

        if (!address || !items || items.length === 0) {
            return res.status(400)
                .json({ message: "Invalid order details", success: false });
        }

        // Calculate total amount
        let amount = 0;
        for (const item of items) {
            const book = await Book.findById(item.product);
            
            if (!book) {
                return res
                    .status(404)
                    .json({ message: "Book not found", success: false });
            }
            
            // Assuming book.offerPrice is the correct price to use for calculation
            amount += book.offerPrice * item.quantity; 
        }

        // Create the new order
        const order = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "COD",
            isPaid: false,
        });

        res.status(201)
            .json({ message: "Order placed successfully", success: true });

    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to get orders for the authenticated user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming auth middleware attaches user ID to req.user

        const orders = await Order.find({
            userId,
            // The screenshot shows { paymentType: "COD" } in the filter,
            // but this may be a temporary or specific filter.
            // If you want all orders, remove the paymentType filter.
            // Based on SS, keeping the filter:
            // { paymentType: "COD" }
        })
        .populate('items.product') // Populate book details for each item
        .sort({ createdAt: -1 }); // Sort by newest first

        // Recalculate amount for each order based on current book prices
        const ordersWithRecalculatedAmount = orders.map(order => {
            let recalculatedAmount = 0;
            order.items.forEach(item => {
                if (item.product && item.product.offerPrice) {
                    recalculatedAmount += item.product.offerPrice * item.quantity;
                }
            });
            return {
                ...order.toObject(),
                amount: recalculatedAmount
            };
        });

        res.status(200).json({ success: true, orders: ordersWithRecalculatedAmount });

    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to get all orders (likely for Admin use)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
             // The screenshot shows { paymentType: "COD" } in the filter here too.
             // If this is an admin route for ALL orders, remove the filter:
             // { paymentType: "COD" }
        })
        .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({ success: true, orders });

    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};