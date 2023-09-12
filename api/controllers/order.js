import Order from '../models/order.js';
import User from '../models/user.js';

const generateOrder = async ( req, res ) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    const user = await User.findById( userId );
    if ( !user ) return res.status( 404 ).json({ message: 'User not found' });

    // create an array of product objects from the cartItems
    const products = cartItems.map( item => ({
      name: item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.image
    }) );

    // create a new order
    await Order.create({ user: userId, products, totalPrice, shippingAddress, paymentMethod });
    res.status( 200 ).json({ message: 'Order created successfully' });
  } catch (error) {
    console.log( 'error creating orders', error );
    res.status( 500 ).json({ message: 'Error creating orders' });
  }
}

const fetchUserOrders = async ( req, res ) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate( 'user' );
    if ( !orders || orders.length === 0 ) return res.status( 404 ).json({ message: 'No orders found for this user' });
    res.status( 200 ).json({ orders });
  } catch (error) {
    console.log( 'error fetching user order', error );
    res.status( 500 ).json({ message: 'Error retrieving user orders' });
  }
}

export {
  generateOrder,
  fetchUserOrders,
};
