import ShoppingIcon from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleCartOpen}>
      <img src={ShoppingIcon} className="shopping-icon" alt="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
