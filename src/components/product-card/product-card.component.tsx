import "./product-card.styles.scss";
import Button from "../button/button.component";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.reducer";
import { ICartItem } from "../../store/cart/cart.reducer";

const ProductCard = ({ product }: { product: ICartItem }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
