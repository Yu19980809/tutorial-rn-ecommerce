import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  products: [{
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    houseNo: { type: String, required: true },
    street: { type: String, required: true },
    landmark: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model( 'Order', orderSchema );
