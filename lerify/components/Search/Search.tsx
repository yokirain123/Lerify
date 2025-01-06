import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchInput from "../SearchInput";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <SearchInput/>
    );
};

export default Search;
