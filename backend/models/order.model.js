import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
            quantity: { type: Number, required: true },
        },
    ],
    address: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Address" },
    amount: { type: Number, required: true },
    status: { type: String, default: "Order Placed" },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;