import "./cart-item.styles.scss";
import { ICartItem } from "../../contexts/cart.context";

const CartItem = ({ cartItem }: { cartItem: ICartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
