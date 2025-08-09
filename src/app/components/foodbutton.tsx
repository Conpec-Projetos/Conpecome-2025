import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

type BotaoProps = {
    type: string;
    image: StaticImageData
    onClick: (type: string) => void
}


const FoodButton: FC<BotaoProps> = ({type, image, onClick}) => {
    return (
        <button onClick={() => onClick(type)} className='rounded-2xl w-[120px] h-[120px] hover:bg-[#ffd8b7] bg-[#fff4ef]'>
            <Image src={image} alt={type} width={120} height={120} unoptimized={true} />
        </button>
    )
}

export default FoodButton;