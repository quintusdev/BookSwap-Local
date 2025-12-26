import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  city: string;
  ownerId: string;
  ownerName: string;
  status: 'available' | 'in-swap' | 'swapped';
  coverImage: ImagePlaceholder;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'shop';
  city: string;
  avatar: ImagePlaceholder;
  subscription: 'Free' | 'Pro' | 'Unlimited';
};

type Swap = {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterBookId: string;
  requesterBookTitle: string;
  ownerId: string;
  ownerName: string;
  ownerBookId: string;
  ownerBookTitle: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  checkinCode: string;
  swapDate: Date;
  shopId: string;
  shopName: string;
};

type PricingTier = {
  name: string;
  price: string;
  pricePeriod: string;
  features: string[];
  isFeatured: boolean;
};

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alice',
    email: 'alice@example.com',
    role: 'user',
    city: 'New York',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-1')!,
    subscription: 'Pro',
  },
  {
    id: 'user-2',
    name: 'Bob',
    email: 'bob@example.com',
    role: 'user',
    city: 'Los Angeles',
    avatar: PlaceHolderImages.find((img) => img.id === 'avatar-2')!,
    subscription: 'Free',
  },
  {
    id: 'shop-1',
    name: "The Reader's Corner",
    email: 'contact@readerscorner.com',
    role: 'shop',
    city: 'New York',
    avatar: PlaceHolderImages.find((img) => img.id === 'shop-logo-1')!,
    subscription: 'Unlimited',
  },
];

export const mockBooks: Book[] = [
  {
    id: 'book-1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    city: 'New York',
    ownerId: 'user-1',
    ownerName: 'Alice',
    status: 'available',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-1')!,
  },
  {
    id: 'book-2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    city: 'New York',
    ownerId: 'user-1',
    ownerName: 'Alice',
    status: 'in-swap',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-2')!,
  },
  {
    id: 'book-3',
    title: '1984',
    author: 'George Orwell',
    city: 'Los Angeles',
    ownerId: 'user-2',
    ownerName: 'Bob',
    status: 'available',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-3')!,
  },
  {
    id: 'book-4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    city: 'San Francisco',
    ownerId: 'user-3',
    ownerName: 'Charlie',
    status: 'available',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-4')!,
  },
  {
    id: 'book-5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    city: 'New York',
    ownerId: 'user-4',
    ownerName: 'Diana',
    status: 'swapped',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-5')!,
  },
    {
    id: 'book-6',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    city: 'Los Angeles',
    ownerId: 'user-2',
    ownerName: 'Bob',
    status: 'available',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-6')!,
  },
];

export const mockWishlist: Omit<Book, 'ownerId' | 'ownerName' | 'status' | 'city'>[] = [
  {
    id: 'wish-1',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-2')!,
  },
  {
    id: 'wish-2',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverImage: PlaceHolderImages.find((img) => img.id === 'book-cover-1')!,
  },
];

export const mockSwaps: Swap[] = [
  {
    id: 'swap-1',
    requesterId: 'user-2',
    requesterName: 'Bob',
    requesterBookId: 'book-3',
    requesterBookTitle: '1984',
    ownerId: 'user-1',
    ownerName: 'Alice',
    ownerBookId: 'book-2',
    ownerBookTitle: 'To Kill a Mockingbird',
    status: 'accepted',
    checkinCode: 'BSWAP-8A4B2',
    swapDate: new Date('2024-08-15T14:00:00Z'),
    shopId: 'shop-1',
    shopName: "The Reader's Corner",
  },
  {
    id: 'swap-2',
    requesterId: 'user-1',
    requesterName: 'Alice',
    requesterBookId: 'book-1',
    requesterBookTitle: 'The Great Gatsby',
    ownerId: 'user-2',
    ownerName: 'Bob',
    ownerBookId: 'book-6',
    ownerBookTitle: 'Brave New World',
    status: 'pending',
    checkinCode: 'BSWAP-9C1D5',
    swapDate: new Date(),
    shopId: 'shop-1',
    shopName: "The Reader's Corner",
  },
  {
    id: 'swap-3',
    requesterId: 'user-4',
    requesterName: 'Diana',
    requesterBookId: 'book-5',
    requesterBookTitle: 'The Hobbit',
    ownerId: 'user-1',
    ownerName: 'Alice',
    ownerBookId: 'book-x',
    ownerBookTitle: 'Some Other Book',
    status: 'completed',
    checkinCode: 'BSWAP-E6F7G',
    swapDate: new Date('2024-07-20T11:30:00Z'),
    shopId: 'shop-1',
    shopName: "The Reader's Corner",
  },
];

export const pricingTiers: PricingTier[] = [
    {
        name: 'Reader',
        price: 'Free',
        pricePeriod: '',
        features: ['1 swap per month', 'Browse all books', 'Create a wishlist'],
        isFeatured: false,
    },
    {
        name: 'Avid Reader',
        price: '$5',
        pricePeriod: '/ month',
        features: ['Up to 3 swaps per month', 'Priority support', 'Early access to new features'],
        isFeatured: true,
    },
    {
        name: 'Collector',
        price: '$10',
        pricePeriod: '/ month',
        features: ['Unlimited swaps', 'All Avid Reader benefits', 'Support independent bookstores'],
        isFeatured: false,
    },
];

export const allCities = [...new Set(mockBooks.map(book => book.city))];
