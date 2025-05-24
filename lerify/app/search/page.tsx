import { Metadata } from "next";
import getSongsByQuery from "@/actions/getSongsByQuery";
import Header from "@/components/UI/Header";
import SearchContent from "@/components/Search/SearchContent";

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined> | undefined>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams; 
  const query = typeof resolvedSearchParams?.query === "string" ? resolvedSearchParams.query : "";
  const songs = await getSongsByQuery(query);

  return {
    title: query ? `${query} - Search Results` : "Search",
    openGraph: {
      title: query ? `${query} - Search Results` : "Search",
      description: query ? `Search results for ${query}` : "Browse music by searching keywords.",
      images: query ? ["/search-query-image.jpg"] : ["/default-search-image.jpg"],
    },
  };
}

const Search = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams; 
  const query = typeof resolvedSearchParams?.query === "string" ? resolvedSearchParams.query : "";
  const songs = await getSongsByQuery(query);

  return (
    <div className="bg-dark-bg rounded-xl h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 text-5xl text-theme font-black py-4">
          <h1 className="text-5xl text-theme font-black pt-4">Search</h1>
        </div>
      </Header>

      <div className="p-6 flex flex-col gap-6 pb-[120px]">
        {query ? (
          <SearchContent songs={songs} />
        ) : (
          <p className="text-theme text-xl font-bold">What’s on your mind now?</p>
        )}
      </div>
    </div>
  );
};

export default Search;
