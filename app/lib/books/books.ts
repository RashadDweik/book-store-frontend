import { BookCard } from "@/app/lib/definitions";
import { getInternalApiBaseUrl } from "@/app/lib/api";
import { notFound } from "next/navigation";
import { FetchBooksFilters } from "@/app/lib/definitions";

export async function fetchBooks(
  filters?: FetchBooksFilters,
): Promise<BookCard[]> {
  try {
    //setup query params
    const queryParams = new URLSearchParams();

    //check for existing query params (category or author)
    for(const [key, value] of Object.entries(filters || {})){
      if(value){
        queryParams.append(key, value);
      }
    }

    //adjust url based on query params
    const url = queryParams.toString()
      ? `${getInternalApiBaseUrl()}/books?${queryParams.toString()}`
      : `${getInternalApiBaseUrl()}/books`;

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
  const url = `${getInternalApiBaseUrl()}/books/${id}`;

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

