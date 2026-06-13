export interface Author {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface BookCard {
  id: string;
  title: string;
  price: string;
  release_date: string;
  category_id: string;
  description: string;
  isbn: string;
  stock: number;
  created_at: string;
  authors: Author[];
  category: Category;
  cover_url: string;
}

export interface User {
   name: string;
   email: string;
   role_id: string;
}

export interface WishlistItem {
  id: string;
  created_at: string;
  book: BookCard;
}

export interface WishlistResponse {
  id: string;
  user_id: string;
  created_at: string;
  items: WishlistItem[];
}


export const STATUS_MESSAGES: Record<number, string> = {
  400: "Invalid Input Data",
  404: "Authentication service unavailable (404).",
  409: "An account with this email already exists.",
  500: "Internal server error. Please try again later.",
  401: "Invalid email or password",
  403: "Access Denied"
};

export interface ActionState {
  success?: boolean;
  message: string;
  accessToken?: string;
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}