"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="text"
      className="w-[80%] h-1 mx-auto rounded-2xl flex p-3 mt-10 border-black bg-gray-200"
      placeholder="Search for books"
      onChange={(e) => {handleSearch(e.target.value)}}
    />
  );
}
