import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

type BotaoProps = {
    tipo: string;
    image: StaticImageData
    onClick: (tipo: string) => void
}


const FoodButton: FC<BotaoProps> = ({tipo, image, onClick}) => {
    return (
        <button onClick={() => onClick(tipo)} className='rounded-2xl w-[120px] h-[120px] hover:bg-[#ffd8b7] bg-[#fff4ef]'>
            <Image src={image} alt= {'Foto de' + tipo} width={120} height={120} unoptimized={true} />
        </button>
    )
}

export default FoodButton;