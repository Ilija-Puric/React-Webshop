import styled from 'styled-components';
import { WrapperProps } from '../../types';

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  list-style: none;
  padding-left: 0;
  flex-wrap: wrap;
  @media screen and (max-width: 800px) {
    & {
      grid-template-columns: 1fr;
    }
  }
`;

const ListWrapper = ({ children }: WrapperProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ListWrapper;
