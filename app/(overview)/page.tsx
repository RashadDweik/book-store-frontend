//server component
import BookGrid from "../ui/books/book-grid"
import SearchBar from "../ui/search";
import { fetchBooks } from "../lib/books"

type SearchParams = Promise<{
  q? : string
  categoryId?: string
  authorId?: string
}>

export default async function Page(
   props: {
       searchParams? : SearchParams
   }
){
  const params = await props.searchParams

  const filters = {...params}

  const books = await fetchBooks(filters);
  
  return (
    <div className="flex flex-col w-full h-full mt-15">
           <SearchBar/>
           <BookGrid books={books}/>
    </div>
  )
}