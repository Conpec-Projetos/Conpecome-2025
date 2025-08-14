import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import FoodButton from "@/components/foodbutton";
import IconTodos from "@/assets/images/IconTodos.png";
import IconDoces from "@/assets/images/IconDoces.png";
import IconBebidas from "@/assets/images/IconBebidas.png";
import IconSalgados from "@/assets/images/IconSalgados.png";

interface CategoryCarouselProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const categories = [
  { image: IconTodos, type: "todos", value: "all" },
  { image: IconSalgados, type: "salgados", value: "SALGADO" },
  { image: IconDoces, type: "doces", value: "DOCE" },
  { image: IconBebidas, type: "bebidas", value: "BEBIDA" },
];

export default function CategoryCarousel({ selectedCategory, setSelectedCategory }: CategoryCarouselProps) {
  return (
    <Carousel className="w-full pb-4" opts={{dragFree: true}}>
      <CarouselContent className="flex gap-4">
        {categories.map((cat) => (
          <CarouselItem key={cat.value} className="basis-auto">
            <FoodButton
              image={cat.image}
              type={cat.type}
              onClick={() => setSelectedCategory(cat.value)}
              isSelected={selectedCategory === cat.value}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
