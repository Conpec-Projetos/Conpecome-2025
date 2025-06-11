import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

type BotaoProps = {
    id: string;
    image: StaticImageData
    onClick: (id: string) => void
}


const FoodButton: FC<BotaoProps> = ({id, image, onClick}) => {
    return (
        <button onClick={() => onClick(id)} className='bg-[#fff4ef] border-orange-600 border-2 rounded-2xl w-[120px] h-[120px] hover:bg-[#ffd8b7]'>
            <div className="rounded-2xl flex flex-col justify-center items-center text-[#F54B00] text-sm font-medium font-poppins">
                <div className='bg-[#fee1d5] rounded-full'><Image src={image} alt= {'Foto de' + id} width={62} height={62} unoptimized={true} /></div>
                {id}
            </div>
        </button>
    )
}

export default FoodButton;