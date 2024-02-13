import styled from 'styled-components';
import { Button } from '../../stories/Button/Button';
import { LocalProduct } from '../../types';
import { useDispatch } from 'react-redux';
import { Creators as CartCreators } from '../../store/Cart';
import { Link } from 'react-router-dom';

const Item = styled.li`
  border: 2px solid #ffffff24;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;

  .list-item__delete {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ff3a44;
    outline: none;
    border: none;
    border-radius: 6px;
    width: 50px;
    height: 50px;
    transition: background-color 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
    svg {
      width: 100%;
      width: 100%;
      transition: transform 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    }
    &:hover {
      cursor: pointer;
      background-color: #e60606;
      svg {
        transform: scale(1.15);
      }
    }
  }
  > div {
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;

    button {
      width: 100%;
    }
  }
  .list-item__info {
    flex-direction: column;
    align-items: flex-start;
    a {
      width: 100%;
      height: 100%;
    }
  }
  .list-item__quantity,
  .list-item__sum {
    color: #ffffff7a;
  }

  img {
    height: 150px;
    width: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const { setCartState } = CartCreators;

const CheckoutListItem = ({ id, price, quantity, thumbnail, title }: LocalProduct) => {
  const dispatch = useDispatch();
  return (
    <Item>
      <button
        className="list-item__delete"
        onClick={() => {
          dispatch(setCartState({ data: { id }, action: 'empty' }));
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
        </svg>
      </button>
      <div className="list-item__info">
        <Link to={`/product/${id}`}>
          <img src={thumbnail} alt={title} />
        </Link>
        <p className="list-item__title">{title}</p>
        <p className="list-item__quantity">Quantity: {quantity}</p>
        <p className="list-item__sum">Sum: {price * quantity}$</p>
      </div>
      <div>
        <Button
          onClick={() => {
            dispatch(setCartState({ data: { id }, action: 'add' }));
          }}
          label="+1"
          primary={false}
          outlined={true}
        />
        <Button
          onClick={() => {
            dispatch(setCartState({ data: { id }, action: 'subtract' }));
          }}
          label="-1"
          primary={false}
          outlined={true}
        />
      </div>
    </Item>
  );
};

export default CheckoutListItem;
