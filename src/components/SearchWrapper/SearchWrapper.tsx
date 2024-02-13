import Search from '../Search/Search';
import CategorySearch from '../CategorySearch/CategorySearch';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 100px 40px 0 40px;

  @media screen and (max-width: 800px) {
    & {
      flex-direction: column;
      padding: 100px 20px 0 20px;
    }
  }
`;

const SearchWrapper = () => {
  return (
    <Wrapper>
      <Search />
      <CategorySearch />
    </Wrapper>
  );
};

export default SearchWrapper;
