import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartSchema } from '../../types';
import { Button } from '../../stories/Button/Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 0;

  .receipt__container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 30px;
    background-color: #fff;
    padding: 100px 50px;
    width: 100%;
    height: 100%;
    min-width: 250px;
    max-width: 900px;
    align-items: flex-start;
    justify-content: center;
    border-radius: 12px;
  }
  button {
    width: 200px;
  }

  .receipt__items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 20px 0;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }
  .receipt__item {
    width: 100%;
    height: 150px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    img {
      height: 100%;
      width: 300px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    }
    .receipt__details {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 200px;
    }
  }

  .text--indicator {
    color: #0b60ff;
  }

  @media screen and (max-width: 800px) {
    & {
      padding: 100px 20px;
    }
    .receipt__container {
      padding: 50px 20px;
    }
    .receipt__item {
      height: 100%;

      img {
        height: 150px;
        width: 100%;
      }
    }
  }
`;

const Receipt = () => {
  const navigate = useNavigate();
  const {
    allProducts,
    loading,
    totalProducts,
    totalQuantity,
    total,
    address,
    phoneNumber,
    additionalMessage,
  }: CartSchema = useSelector(({ cart }) => cart);

  const onClickHandler = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <div className="receipt__container">
        {!loading ? (
          <>
            <h1>Receipt</h1>
            <div className="receipt__recipient">
              <h3 className="text--indicator">Recipient</h3>
              <p>Adress: {address}</p>
              <p>Phone number: {phoneNumber}</p>
              {additionalMessage && <p>Note: {additionalMessage}</p>}
            </div>
            <ul className="receipt__items">
              <>
                {allProducts?.map(({ thumbnail, price, title, quantity, total }) => {
                  return (
                    <li className="receipt__item">
                      <img src={thumbnail} alt="" />
                      <div className="receipt__details">
                        <p>{title}</p>
                        <p>Quantity:{quantity}</p>
                        <p>Price: ${price}</p>
                        <p>Sum: ${total}</p>
                      </div>
                    </li>
                  );
                })}
              </>
            </ul>
            <div className="receipt__calculations">
              <h3 className="text--indicator">Details</h3>
              <p>Total products:{totalProducts}</p>
              <p>Total quantity:{totalQuantity}</p>
              <p>Total {total}$</p>
            </div>
            <Button label="Go back" onClick={onClickHandler} primary />
          </>
        ) : (
          <CircularProgress
            sx={{ color: '#0b60ff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Receipt;
