import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

describe('Header component', () => {
  const mockProps = {
    user: 'https://images.unsplash.com/photo-1704311572256-93e885ad095b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
    onLogin: jest.fn(),
    onLogout: jest.fn(),
    onCartClick: jest.fn(),
    onFavoriteClick: jest.fn(),
    onHomepageClick: jest.fn(),
  };

  it('renders the Header component with user avatar', () => {
    const { getByAltText, getByText } = render(<Header {...mockProps} />);

    expect(getByAltText('House image')).toBeInTheDocument();
    expect(getByAltText('Heart image')).toBeInTheDocument();
    expect(getByAltText('Shopping Cart image')).toBeInTheDocument();
    expect(getByAltText('No user image')).toBeInTheDocument();
    expect(getByText('Log in')).not.toBeInTheDocument();
  });

  it('renders the Header component without user avatar', () => {
    const { getByAltText, getByText } = render(<Header {...mockProps} user={undefined} />);

    expect(getByAltText('House image')).toBeInTheDocument();
    expect(getByAltText('Heart image')).toBeInTheDocument();
    expect(getByAltText('Shopping Cart image')).toBeInTheDocument();
    expect(getByText('Log in')).toBeInTheDocument();
  });

  it('calls the correct callback functions on button clicks', () => {
    const { getByAltText, getByText } = render(<Header {...mockProps} />);

    fireEvent.click(getByAltText('House image'));
    fireEvent.click(getByAltText('Heart image'));
    fireEvent.click(getByAltText('Shopping Cart image'));
    fireEvent.click(getByText('Log in'));

    expect(mockProps.onHomepageClick).toHaveBeenCalled();
    expect(mockProps.onFavoriteClick).toHaveBeenCalled();
    expect(mockProps.onCartClick).toHaveBeenCalled();
    expect(mockProps.onLogin).toHaveBeenCalled();
  });

  it('calls onLogout when user avatar button is clicked', () => {
    const { getByAltText } = render(<Header {...mockProps} />);

    fireEvent.click(getByAltText('No user image'));

    expect(mockProps.onLogout).toHaveBeenCalled();
  });
});
