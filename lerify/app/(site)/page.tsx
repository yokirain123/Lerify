import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-[var(--bg-color)] rounded-xl h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 text-4xl text-white font-black">
          Home
        </div>
      </Header>
    </div>
  );
}
