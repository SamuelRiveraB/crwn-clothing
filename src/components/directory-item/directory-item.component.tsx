import { useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";
import { use } from "react";

interface Directory {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
}

const DirectoryItem = ({ directory }: { directory: Directory }) => {
  const { title, imageUrl, route } = directory;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
