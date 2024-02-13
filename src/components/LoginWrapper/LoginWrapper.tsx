import styled from 'styled-components';
import { WrapperProps } from '../../types';

const LoginWrapper = ({ children }: WrapperProps): JSX.Element => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    max-width: 600px;
    min-width: 300px;
    margin: 0 auto;
  `;
  return <Wrapper>{children}</Wrapper>;
};

export default LoginWrapper;
