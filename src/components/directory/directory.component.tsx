import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

function Directory({
  categories,
}: {
  categories: { id: number; title: string; imageUrl: string }[];
}) {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Directory;
