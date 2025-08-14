import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import IconSalgados from "@/assets/images/IconSalgados.png";
import IconDoces from "@/assets/images/IconDoces.png";
import IconBebidas from "@/assets/images/IconBebidas.png";

interface ProductTypeCarouselProps {
  productType: string;
  onTypeChange: (type: string) => void;
}

const types = [
  { type: "SALGADO", image: IconSalgados, label: "Salgados" },
  { type: "DOCE", image: IconDoces, label: "Doces" },
  { type: "BEBIDA", image: IconBebidas, label: "Bebidas" },
];

export default function ProductTypeCarousel({ productType, onTypeChange }: ProductTypeCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent className="flex gap-4">
        {types.map((t) => (
          <CarouselItem key={t.type} className="basis-auto">
            <button
              onClick={() => onTypeChange(t.type)}
              className={`transition hover:scale-95 ${productType === t.type ? "border-4 border-[#f66c0e] rounded-2xl" : ""}`}
            >
              <div className="w-[80px] h-[80px] overflow-hidden flex items-center justify-center">
                <Image src={t.image} alt={t.label} className="scale-[110%]" />
              </div>
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
