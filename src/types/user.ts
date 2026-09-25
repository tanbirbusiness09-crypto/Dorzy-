export type UserRole = 'customer' | 'shop_owner' | 'tailor' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  fullNameAr?: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string;
  city: string;
  country: 'SA';
  isVerified: boolean;
  createdAt: string;
}

export interface CustomerProfile extends User {
  role: 'customer';
  savedAddresses: Array<{
    id: string;
    label: string;
    city: string;
    district: string;
    street: string;
    isDefault: boolean;
  }>;
  favoriteShopIds: string[];
  favoriteTailorIds: string[];
  totalOrdersCount: number;
}
