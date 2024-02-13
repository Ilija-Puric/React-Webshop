import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '../../stories/Button/Button';
import { Action, CartSchema, ControlsProps } from '../../types';
import { Creators as CartCreators } from '../../store/Cart';
import styled from 'styled-components';

const { setCartState } = CartCreators;

const Wrapper = styled.div`
  .product__controls {
    display: flex;
    gap: 10px;
    padding-bottom: 20px;
    padding-top: 20px;
  }

  .product__actions {
    width: 300px;
    height: fit-content;
    padding: 20px;
    background-color: #2f2d2b;
    border-radius: 8px;
  }
  .product__actions button {
    width: 100%;
  }

  .product__cart-header {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 2px solid #fff;
    font-size: 20px;
  }

  @media screen and (max-width: 1024px) {
    .product__actions {
      width: 100%;
    }
    .product__controls button {
      width: fit-content;
    }
    .product__cart-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }
  }
  @media screen and (max-width: 400px) {
    .product__controls,
    .product__controls button {
      width: 100%;
    }
    .product__cart-buttons {
      flex-direction: column;
      gap: 0;
    }
  }
`;

const Controls = ({ id, product }: ControlsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const { localProducts }: CartSchema = useSelector(({ cart }) => cart);

  const handleQuantityChange = (quantity: number = 1, action: Action) => {
    if (product !== null) {
      const { id, thumbnail, price, title } = product;
      dispatch(setCartState({ data: { id, thumbnail, price, title, quantity }, action }));
      navigate('/checkout');
    }
  };

  useEffect(() => {
    if (localProducts && localProducts?.length > 0) {
      try {
        const arr = localProducts?.filter(({ id: elementId }) => elementId === Number(id));
        const quantity = arr.length;
        if (quantity) setCounter(arr[0].quantity);
      } catch (e) {
        setCounter(0);
      }
    }
  }, []);

  return (
    <Wrapper>
      <div className="product__actions">
        <p className="product__cart-header">Cart options</p>
        <div className="product__cart-buttons">
          <div className="product__controls">
            <Button
              onClick={() => setCounter((prevState) => prevState + 1)}
              label="+1"
              primary={false}
              outlined={true}
            />
            <Button
              onClick={() => setCounter((prevState) => prevState - 1)}
              disabled={counter <= 0}
              label="-1"
              primary={false}
              outlined={true}
            />
          </div>
          <Button
            label={`Add to cart (${counter})`}
            primary
            disabled={counter <= 0}
            onClick={() => handleQuantityChange(counter, 'replace')}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Controls;
