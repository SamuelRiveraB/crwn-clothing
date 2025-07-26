import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./category.styles.scss";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";
import { ICartItem } from "../../store/cart/cart.types";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(() => {
    return categoriesMap && category ? categoriesMap[category] : [];
  });

  useEffect(() => {
    if (category) {
      setProducts(categoriesMap[category] || []);
    } else {
      setProducts([]);
    }
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product: ICartItem) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
