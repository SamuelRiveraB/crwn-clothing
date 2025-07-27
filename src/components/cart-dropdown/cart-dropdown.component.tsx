import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { ICartItem } from "../../store/cart/cart.reducer";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const gotToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item: ICartItem) => (
            <CartItem key={item.id} cartItem={item} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={gotToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
