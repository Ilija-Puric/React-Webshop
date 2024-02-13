import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grade } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { FavoriteSchema } from '../../types';
import { Creators as FavoritesCreators } from '../../store/Favorites';
import NotFoundWrapper from '../../components/NotFoundWrapper/NotFoundWrapper';

const { likeProduct } = FavoritesCreators;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 100px 40px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  h1 {
    font-size: 36px;
  }

  .favorites-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 40px;

    .favorites-list__item,
    a {
      width: 100%;
      height: 100%;
    }

    .favorites-list__item {
      border-radius: 12px;
      background-color: #282626;
      position: relative;
      transition: background-color 0.3s linear;

      &:hover {
        background-color: #353434;
      }
    }

    .favorites-list__icon {
      position: absolute;
      top: 12px;
      right: 12px;
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

    .favorites__list-text {
      padding: 20px;
      display: flex;
      gap: 8px;
      flex-direction: column;
    }

    a {
      text-decoration: none;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      height: 300px;
      object-fit: cover;
    }
    p {
      color: #fff;
    }
    .favorites-list__title,
    .favorites-list__price {
      font-weight: 800;
    }
    .favorites-list__title {
      font-size: 24px;
    }

    .favorites-list__price {
      font-size: 18px;
    }

    .favorites-list__link {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .favorites-list__brand,
    .favorites-list__rating {
      color: #878584;
    }
    .favorites-list__details,
    .favorites-list__rating {
      display: flex;
      align-items: center;
    }
    .favorites-list__details {
      gap: 10px;
    }
  }

  @media screen and (max-width: 800px) {
    & {
      padding-left: 20px;
      padding-right: 20px;
      .favorites-list {
        grid-template-columns: 1fr;
      }
    }
  }
`;
const Favorites = () => {
  const dispatch = useDispatch();
  const { allFavorites, loading }: FavoriteSchema = useSelector(({ favorites }) => favorites);

  const isFavoritesAvailable: boolean = useMemo(() => {
    return Boolean(!loading && allFavorites && allFavorites.length > 0);
  }, [loading, allFavorites.length]);

  return (
    <Wrapper>
      <h1>Favorites</h1>
      <ul className="favorites-list">
        {loading ? (
          <CircularProgress sx={{ color: '#0b60ff' }} />
        ) : isFavoritesAvailable ? (
          allFavorites.map(({ id, category, brand, description, price, rating, thumbnail, title, ...props }) => {
            return (
              <li className="favorites-list__item">
                <svg
                  className="favorites-list__icon"
                  onClick={() =>
                    dispatch(
                      likeProduct({ id, category, brand, description, price, rating, thumbnail, title, ...props })
                    )
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
                </svg>
                <Link to={`/product/${id}`} className="favorites-list__link">
                  <img src={thumbnail} alt={title} />
                  <div className="favorites__list-text">
                    <p className="favorites-list__title">{title}</p>
                    <p className="favorites-list__price">{price}$</p>
                    <div className="favorites-list__details">
                      <p className="favorites-list__brand">{brand}</p>
                      <p className="favorites-list__rating">
                        <Grade />
                        <span>{rating}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <div className="wrapper__not-found">
            <NotFoundWrapper label="No results" />
          </div>
        )}
      </ul>
    </Wrapper>
  );
};

export default Favorites;
