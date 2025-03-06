import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchContent from "@/components/Search/SearchContent";
import SearchInput from "@/components/Search/SearchInput";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div>
      <Header />

      <div className="p-6 flex flex-col gap-6">
        <SearchContent songs={songs} />
      </div>
    </div>
  );
};

export default Search;
