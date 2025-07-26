import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./category.styles.scss";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { Product } from "../../store/categories/category.types";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const categoriesMap = useSelector(selectCategoriesMap);
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
      <div className="category-container">
        {products &&
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
