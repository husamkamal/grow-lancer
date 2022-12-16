import { Link } from 'react-router-dom';
import { CategoryProps } from '../../interfaces';

function Category({
  imgUrl, title, desc, alt,
}: CategoryProps) {
  return (
    <div className="category">
      <Link to="/jobs-search" state={{ category: title }}>
        <div className="category-img">
          <img
            src={imgUrl}
            alt={alt}
          />
        </div>
        <div className="category-title">
          {title}
        </div>

      </Link>
      <div className="category-desc">
        {desc}
      </div>
    </div>
  );
}

export default Category;
