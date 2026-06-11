import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-row w-full bg-white h-20 border border-black p-2 align-middle items-center justify-between fixed z-20">
      <h1 className="text-2xl flex ms-10">Logo</h1>
      <div className="flex gap-4">
        <Link href={"/"}>Books</Link>
        <Link href={"/authors"}>Authors</Link>
        <Link href={"/categories"}>Categories</Link>
      </div>
      <div className="flex gap-4 me-3">
        <Link href={'/auth/login'}>Login</Link>
        <Link href={'/auth/signup'}>Signup</Link>
      </div>
    </nav>
  );
}
