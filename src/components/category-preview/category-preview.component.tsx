import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";
import { ICartItem } from "../../store/cart/cart.reducer";

const CategoryPreview = ({
  title,
  products,
}: {
  title: string;
  products: ICartItem[];
}) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={`${title.toLowerCase()}`}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
