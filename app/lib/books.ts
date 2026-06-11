import { BookCard } from "@/app/lib/definitions";
import { INTERNAL_API_BASE_URL } from "./api";
import { notFound } from "next/navigation";

export interface FetchBooksFilters {
  categoryId?: string;
  authorId?: string;
  q?: string;
}

export async function fetchBooks(
  filters?: FetchBooksFilters,
): Promise<BookCard[]> {
  try {
    //setup query params
    const queryParams = new URLSearchParams();

    //check for existing query params (category or author)
    if (filters?.categoryId) {
      queryParams.append("category_id", filters.categoryId);
    }
    if (filters?.authorId) {
      queryParams.append("author_id", filters?.authorId);
    }

    if (filters?.q) {
      queryParams.append("q", filters.q);
    }

    //adjust url based on query params
    const url = queryParams.toString()
      ? `${INTERNAL_API_BASE_URL}/books?${queryParams.toString()}`
      : `${INTERNAL_API_BASE_URL}/books`;

    //fetch books
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //revalidate data every 60 secs
      next: { revalidate: 60 },
    });

    if(res.status == 404){
        notFound();
    }

    if (!res.ok)
      throw new Error(`Backend refused with error code ${res.status}`);

    //parse data to JSON and return it
    const data = await res.json();
    return data;
  } catch (error) {
    // Log the error on your server console for debugging
    console.error("Error in fetchBooks execution:", error);

    //throw error
    throw error;
  }
}


export async function getBookDetails(id: string): Promise<BookCard> {
  const url = `${INTERNAL_API_BASE_URL}/books/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    // If the backend returns a 404, trigger the Next.js not-found handler
    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(`Backend responded with status: ${res.status}`);
    }

    const data = await res.json();

    return {...data}

  } catch (error) {
    console.error(`Failed to fetch book with ID ${id}:`, error);
    
    // Throwing the error lets Next.js automatically catch it 
    throw error; 
  }
}

