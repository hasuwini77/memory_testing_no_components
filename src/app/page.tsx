import Header from "@/components/Header";
export default function Home() {
  return (
    <main>
      <Header />
      <div className="grid grid-cols-4 gap-4 p-5 max-w-xl mx-auto">
        {Array.from({ length: 12 }).map((_, index) => (
          <button
            key={index}
            className="bg-gray-100 border-2 border-gray-300 rounded-lg h-28 flex items-center justify-center text-4xl font-bold cursor-pointer transform transition-transform duration-300 hover:bg-gray-200 hover:-translate-y-1"
          >
            ?
          </button>
        ))}
      </div>
    </main>
  );
}
