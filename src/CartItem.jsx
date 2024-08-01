import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import { useEffect, useState } from 'react';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCart, setShowCart] = useState(false);


  useEffect(() => {
    calculateTotalAmount(cart);
  }, [cart]);

  useEffect(() => {
    setTotalQuantity(calculateTotalItems(cart));
    calculateTotalAmount(cart);
  }, [cart]);

  const calculateTotalItems = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cartItems) => {
    if (!Array.isArray(cartItems)) {
      console.log('cartItems is not an array:', cartItems);
      return;
    }
    let total = 0;
    cartItems.forEach(item => {
      console.log('Processing item:', item);
      const price = parseFloat(item.cost.replace('$', ''));
      const itemTotal = price * item.quantity;
      if (!isNaN(itemTotal)) {
        total += itemTotal;
      } else {
        console.log('Invalid itemTotal for item:', item);
      }
    });
    console.log('Total amount calculated:', total);
    setTotalAmount(total);
  };


  const handleContinueShopping = (e) => {
   console.log('Continue Shopping');
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.replace('$', ''));
    return item.quantity * itemCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;