import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

type BotaoProps = {
    type: string;
    image: StaticImageData;
    onClick: (type: string) => void;
    isSelected?: boolean;
}


const FoodButton: FC<BotaoProps> = ({ type, image, onClick, isSelected }) => {
    return (
        <button
            onClick={() => onClick(type)}
            className={`rounded-3xl w-[120px] h-[120px] bg-[#fff4ef] hover:bg-[#ffd8b7] cursor-pointer ${isSelected ? 'border-4 border-[#FF9633]' : ''}`}
        >
            <Image src={image} alt={type} width={120} height={120} unoptimized={true} />
        </button>
    );
}

export default FoodButton;