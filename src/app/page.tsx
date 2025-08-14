"use client";
import { useRouter } from "next/navigation";
import bg from "@/assets/images/background.png";
import { Button } from "@/components/ui/button";

const formatToBRL = (cents: number) => {
  return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
};

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen h-screen w-full bg-[#FFF5EF] bg-top bg-repeat"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <main className="flex flex-col gap-4 items-center justify-center h-full">
        <Button variant={"conpec"} size={"conpec"} onClick={() => router.push("login")}>
          Equipe de G&G
        </Button>
        <Button variant={"conpec"} size={"conpec"} onClick={() => router.push("customer/home")}>
          Conpecome
        </Button>
        <Button variant={"conpec"} size={"conpec"} onClick={() => router.push("customer/conpeloja")}>
          Conpeloja
        </Button>
      </main>
    </div>
  );
}
