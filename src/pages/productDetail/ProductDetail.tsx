import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { ProductSchema } from '../../types';
import { Creators as ProductCreators } from '../../store/Product';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import Controls from '../../components/Controls/Controls';

const { getProductByID } = ProductCreators;

const Product = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 40px;
  color: #fff;

  .product__container {
    width: 100%;
    padding-top: 100px;
    border-radius: 12px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
  }

  @media screen and (max-width: 1024px) {
    .product__container {
      width: 100%;
      padding: 100px 0;
      padding-left: 0;
      padding-right: 0;
      display: flex;
      flex-direction: column;
    }
  }
  @media screen and (max-width: 800px) {
    & {
      padding: 0 20px;
    }
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { loading, product }: ProductSchema = useSelector(({ products }) => products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductByID({ id }));
  }, []);

  return (
    <Product>
      <div className="product__container">
        {!loading && product ? (
          <>
            <ImageGallery product={product} />
            <Controls id={id} product={product} />
          </>
        ) : (
          <CircularProgress
            sx={{ color: '#0b60ff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
          />
        )}
      </div>
    </Product>
  );
};

export default ProductDetail;
