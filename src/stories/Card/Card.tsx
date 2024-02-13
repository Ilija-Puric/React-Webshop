import { useRef, useState } from 'react';
import { Button } from '../Button/Button';
import shoppingCartSvg from '../assets/shopping-cart-dark.svg';
import './card.css';

type Sizes = 'small' | 'large' | 'medium';

interface CardProps {
  image: string;
  imageAlt: string;
  text: string;
  price: number;
  isFavorite?: boolean;
  onCardClick?: () => void;
  button: {
    label: string;
    onClick?: () => void;
    primary?: boolean;
    size?: Sizes;
    backgroundColor?: string;
    onClickFavorite?: () => void;
  };
}

export const Card = ({
  image,
  imageAlt,
  text,
  price,
  isFavorite = false,
  onCardClick = () => {},
  button: { label, onClick, primary = true, size = 'medium', backgroundColor, onClickFavorite },
}: CardProps) => {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const nameRef = useRef();
  const imageRef = useRef();

  const handleLikedClick = () => {
    if (onClickFavorite) onClickFavorite();
    setIsLiked((prevState) => !prevState);
  };
  return (
    <div
      className="storybook-card"
      onClick={({ target }) => {
        const refs = [nameRef.current, imageRef.current];
        try {
          refs.forEach((ref) => {
            if (target === ref) throw new Error();
          });
        } catch (e) {
          onCardClick();
        }
      }}
      role="button"
    >
      <svg
        className={`storybook-card__favorite ${isLiked && 'storybook-card__favorite--liked'}`}
        onClick={handleLikedClick}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        {isLiked ? (
          <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
        ) : (
          <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
        )}
      </svg>

      <img className="storybook-card__image" src={image} alt={imageAlt} ref={imageRef} />
      <div className="storybook-card__details">
        <p className="storybook-card__title" ref={nameRef}>
          {text}
        </p>
        <span className="storybook-card__price">{price} $</span>
        <Button
          iconImage={shoppingCartSvg}
          label={label}
          onClick={onClick}
          primary={primary}
          size={size}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
};
