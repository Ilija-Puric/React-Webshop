import { Button } from '../Button/Button';
import shoppingCartSvg from '../assets/shopping-cart.svg';
import heartSvg from '../assets/heart-empty.svg';
import houseSvg from '../assets/house.svg';
import './header.css';

interface HeaderProps {
  user?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  onCartClick?: () => void;
  onFavoriteClick?: () => void;
  onHomepageClick?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCartClick, onFavoriteClick, onHomepageClick }: HeaderProps) => (
  <header className="storybook-header">
    <img src={houseSvg} alt="House image" onClick={onHomepageClick} />
    <div className="storybook-header__navigation">
      <img src={heartSvg} alt="Heart image" onClick={onFavoriteClick} />
      <img src={shoppingCartSvg} alt="Shopping Cart image" onClick={onCartClick} />
      {user ? (
        <>
          <button className="storybook-header__avatar" onClick={onLogout}>
            <img src={user} alt="No user image" />
          </button>
        </>
      ) : (
        <Button size="small" onClick={onLogin} label="Log in" />
      )}
    </div>
  </header>
);
