import { useState } from 'react';
import { Discount, Inventory, Grade } from '@mui/icons-material';
import { FavoriteSchema, Product, ProductWrapper } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as FavoriteCreators } from '../../store/Favorites';
import styled from 'styled-components';

const { likeProduct } = FavoriteCreators;

const Gallery = styled.div`
  .product__main-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .product__main-title {
    font-size: 36px;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
  .product__main-text {
    color: #b7b4b2d2;
    font-size: 18px;
  }
  .product__main-pill {
    background-color: #2f2d2b;
    width: fit-content;
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 12px;
  }

  .product__thumbnail-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    padding-top: 20px;
    img {
      width: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }
  .product__thumbnail-selected-image {
    height: 500px;
  }
  .product__thumbnail__images {
    display: flex;
    gap: 20px;
    padding-top: 20px;
    img {
      height: 220px;
      box-shadow:
        rgba(144, 171, 218, 0.25) 0px 4px 8px -2px,
        rgba(195, 209, 233, 0.08) 0px 0px 0px 1px;

      transition: 0.2s transform cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    img:hover {
      transform: scale(1.05);
      cursor: pointer;
    }
  }

  .product__detail {
    display: flex;
    gap: 20px;
    padding-top: 5px;
  }
  .product__detail-text {
    font-size: 20px;
    display: flex;
    gap: 8px;
    font-weight: 300;
    align-items: center;
    justify-content: center;
  }
  .product__detail-price {
    font-weight: 800;
    font-size: 24px;
  }
  .product__main-wrapper {
    max-width: 1200px;
    height: 100%;
  }
  .product__favorite {
    position: absolute;
    top: 30px;
    right: 10px;
    z-index: 5;
    fill: #ff5e66;
    transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

    &:hover {
      transform: scale(1.15);
      cursor: pointer;
    }

    &:active {
      transform: scale(1.35);
    }
  }

  @media screen and (max-width: 1024px) {
    .product__thumbnail-selected-image {
      height: 300px;
    }
    .product__thumbnail__images {
      img {
        height: 100px;
      }
    }
    .product__main-title {
      font-size: 28px;
      gap: 8px;
    }
  }
`;
const ImageGallery = ({ product }: ProductWrapper) => {
  const { title, category, price, description, brand, rating, discountPercentage, stock, thumbnail, images, id } =
    product;
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(thumbnail);
  const { allFavorites }: FavoriteSchema = useSelector(({ favorites }) => favorites);

  const isFavorite = Boolean(allFavorites.find((element) => element?.id === id));
  const changeImage = (image: string) => setSelectedImage(image);

  return (
    <Gallery>
      <div className="product__main-wrapper">
        <div className="product__main-info">
          <h1 className="product__main-title">
            <span>{title}</span> <p className="product__main-pill">{category}</p>
          </h1>
          <p className="product__detail-price">
            <span>${price}</span>
          </p>
          <p className="product__main-text">{description}</p>
          <p className="product__main-text">{brand}</p>
          <div className="product__detail">
            <p className="product__detail-text">
              <Grade />
              <span>{rating}</span>
            </p>
            <p className="product__detail-text">
              <Discount />
              <span>{discountPercentage}%</span>
            </p>
            <p className="product__detail-text">
              <Inventory />
              <span>{stock}</span>
            </p>
          </div>
        </div>
        <div className="product__thumbnail-wrapper">
          <svg
            className={`product__favorite ${isFavorite && 'product__favorite--liked'}`}
            onClick={() =>
              dispatch(
                likeProduct({
                  title,
                  category,
                  price,
                  description,
                  brand,
                  rating,
                  discountPercentage,
                  stock,
                  thumbnail,
                  images,
                  id,
                })
              )
            }
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#ffffff"
            viewBox="0 0 256 256"
          >
            {isFavorite ? (
              <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
            ) : (
              <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
            )}
          </svg>
          <img className="product__thumbnail-selected-image" src={selectedImage} alt={title} />
          <div className="product__thumbnail__images">
            {images.map((image) => (
              <img src={image} onClick={() => changeImage(image)} />
            ))}
          </div>
        </div>
      </div>
    </Gallery>
  );
};

export default ImageGallery;
