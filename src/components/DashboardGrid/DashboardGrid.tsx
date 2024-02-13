import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';

import { Card } from '../../stories/Card/Card';
import { Creators as ProductCreators } from '../../store/Product';
import { Creators as CartCreators } from '../../store/Cart';
import { Creators as FavoriteCreators } from '../../store/Favorites';

import NotFoundWrapper from '../NotFoundWrapper/NotFoundWrapper';
import { FavoriteSchema, ProductSchema } from '../../types';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 80px;
  padding: 50px 40px;
  position: relative;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 50px 20px;
  }
`;

const { getAllProducts } = ProductCreators;
const { setCartState } = CartCreators;
const { likeProduct } = FavoriteCreators;

const DashboardGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts, loading }: ProductSchema = useSelector(({ products }) => products);
  const { allFavorites }: FavoriteSchema = useSelector(({ favorites }) => favorites);

  const isProductsAvailable: boolean = useMemo(() => {
    return Boolean(!loading && allProducts.length > 0);
  }, [loading, allProducts.length]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <Wrapper style={{ minHeight: !isProductsAvailable ? '80vh' : 'auto' }}>
      {loading ? (
        <CircularProgress sx={{ color: '#0b60ff' }} />
      ) : isProductsAvailable ? (
        allProducts.map(({ id, thumbnail, price, title, ...props }) => (
          <Card
            key={id}
            image={thumbnail}
            imageAlt={title}
            price={price}
            text={title}
            onCardClick={() => {
              navigate(`/product/${id}`);
            }}
            isFavorite={Boolean(allFavorites.find((element) => id === element?.id))}
            button={{
              label: 'Add to cart',
              onClickFavorite: () => {
                try {
                  dispatch(likeProduct({ id, thumbnail, price, title, ...props }));
                } catch (e: any) {
                  toast.error(e);
                }
              },
              onClick: () => {
                try {
                  dispatch(setCartState({ data: { id, thumbnail, price, title, quantity: 1 }, action: 'add' }));
                  toast.success(`Added ${title} to cart!`);
                } catch (e: any) {
                  toast.error(`Couldn't add item ${title} to cart!`);
                }
              },
            }}
          />
        ))
      ) : (
        <NotFoundWrapper label="No results" />
      )}

      <ToastContainer />
    </Wrapper>
  );
};

export default DashboardGrid;
