import styled from 'styled-components';
import { Button } from '../../stories/Button/Button';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 10px;

  .not-found__title {
    font-size: 48px;
  }
  .not-found__status {
    font-size: 28px;
    color: #696665f6;
  }
`;
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1 className="not-found__title">No resource found</h1>
      <p className="not-found__status">404</p>
      <Button
        label="Go back"
        primary
        onClick={() => {
          navigate('/');
        }}
      />
    </Wrapper>
  );
};

export default NotFound;
