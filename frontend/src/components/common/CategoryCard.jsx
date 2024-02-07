import Link from 'next/link';

const CategoryCard = ({ imageSrc, linkHref, categoryName }) => {
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
      <div className="category-card style-2">
        <div className="category-card-img">
          <Link legacyBehavior href={linkHref}>
            <a>
              <img src={imageSrc} alt="" />
            </a>
          </Link>
        </div>
        <div className="category-card-content">
          <Link legacyBehavior href={linkHref}>
            <a>{categoryName}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
