import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFE8DE]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#FFE8DE]">
        <div className="flex items-center gap-2">
          <Image
            src="/carrossel/assets/shopping_cart.png"
            alt="Conpec Logo"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h1 className="font-pixelify-sans text-2xl text-[#FF3D00]">
              CONPECOME
            </h1>
            <p className="text-sm">Já pode aomossar?</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image
                src="/carrossel/assets/search.png"
                alt="Search"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#FF9633] px-4 py-2 rounded-full text-white">
          <Image
            src="/carrossel/assets/shopping_cart.png"
            alt="Shopping Cart"
            width={24}
            height={24}
          />
          <span>R$ 2,37</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 items-center sm:items-start p-8">
        <div className="text-5xl text-black font-pixelify-sans">
          Carrossel 🦣
        </div>
      </main>
    </div>
  );
}
