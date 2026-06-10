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