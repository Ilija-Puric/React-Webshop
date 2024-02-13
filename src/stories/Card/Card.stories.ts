import type { Meta, StoryObj } from '@storybook/react';
import productImage from '../assets/product.jpg';
import { Card } from './Card';

const meta = {
  title: 'Card',
  component: Card,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageAlt: 'Product',
    price: 2.56,
    text: 'Ibanez Tim Hensen',
    image: productImage,
    button: { label: 'Add to cart' },
  },
};
