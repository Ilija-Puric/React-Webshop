import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutListItem from '../../components/CheckoutListItem/CheckoutListItem';
import CheckoutListWrapper from '../../components/CheckoutListWrapper/CheckoutListWrapper';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { CartSchema } from '../../types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 100px 40px;
  color: #fff;

  h1 {
    font-size: 36px;
  }

  .checkout__total {
    font-weight: 800;
    width: 100%;
    border-bottom: 2px solid #fff;
    padding-bottom: 12px;
  }
  .checkout__link {
    color: #2872fc;
    text-decoration: none;
    position: relative;
    margin-left: 4px;

    &::after {
      content: '';
      bottom: -5px;
      left: 0;
      position: absolute;
      width: 0;
      height: 2px;
      background-color: #2872fc;

      transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }
    &:hover::after {
      width: 100%;
    }
  }
  @media screen and (max-width: 800px) {
    padding: 100px 20px;
  }
`;

const Checkout = () => {
  const { localProducts }: CartSchema = useSelector(({ cart }) => cart);
  const { currentLoggedUser } = useSelector(({ auth }) => auth);

  const sumWithInitial = localProducts.reduce(function (acc, { price, quantity }) {
    return price * quantity + acc;
  }, 0);

  return (
    <Wrapper className="checkout">
      <h1>Checkout</h1>
      <h2>Items</h2>
      {localProducts?.length > 0 ? (
        <>
          <CheckoutListWrapper>
            {localProducts?.map(({ id, description, price, thumbnail, quantity, title, favorite }) => (
              <CheckoutListItem
                key={id}
                id={id}
                description={description}
                price={price}
                thumbnail={thumbnail}
                quantity={quantity}
                title={title}
                favorite={favorite}
              />
            ))}
          </CheckoutListWrapper>
          <p className="checkout__total">Total: {sumWithInitial}$</p>
        </>
      ) : (
        <p>No items added to cart</p>
      )}
      {currentLoggedUser && localProducts?.length > 0 && (
        <>
          <h2>Shipping</h2>
          <CheckoutForm />
        </>
      )}
      {!currentLoggedUser && (
        <div>
          <p>
            You need to be logged in to make a shipment,
            <Link to="/login" className="checkout__link">
              log in
            </Link>
          </p>
        </div>
      )}
    </Wrapper>
  );
};

export default Checkout;
