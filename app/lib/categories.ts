import { Category } from "@/app/lib/definitions";
import { INTERNAL_API_BASE_URL } from "./api";
import { notFound } from "next/navigation";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const url = `${INTERNAL_API_BASE_URL}/categories`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (res.status == 404) notFound();

    if (!res.ok)
      throw new Error(`Failed to fetch categories , status code ${res.status}`);

    const data: Category[] = await res.json();

    return data;
  } catch (error) {
    console.error(`Failed to fetch categories:`, error);

    // Throwing the error lets Next.js automatically catch it
    throw error;
  }
}
