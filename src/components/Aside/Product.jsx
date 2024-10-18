import { useState } from "react";
import { useTranslation } from "react-i18next";

import { GoEye } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";

import GenerateStars from "./GenerateStars";

const Product = ({ name, price, average_rating, id, image, length_comment, category, stock, steps }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()


    return (
        <div className="flex flex-col items-start transition-transform duration-300 ease h-[360px] snap-start">
            <div className="relative inline-block bg-[#F5F5F5] w-[270px] h-full" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <img src={image} alt={name} className={name === "AK-900 Wired Keyboard" ? "mx-auto translate-y-14 object-cover mt-5 mb-3 h-28" : name === "PlayStation 5" ? "mx-auto translate-y-5 object-cover h-56" : name === "GTX 1080" ? "mx-auto translate-y-14 object-cover mt-5 mb-3 h-28" : "mx-auto translate-y-14 object-cover h-40"} draggable={false} />
                {stock ? <span className="absolute top-3 left-3 bg-[#DB4444] py-2 px-3 text-white rounded-md">- {stock.stocks} %</span> : <></>}
                <button className="absolute top-16 right-2 text-2xl bg-white rounded-full p-2 z-40">
                    <GoEye />
                </button>
                <button className="absolute top-3 right-2 text-2xl bg-white rounded-full p-2">
                    <FaRegHeart />
                </button>
                {isOpen ? <div className="flex items-center justify-center absolute bottom-0 right-0 left-0 bg-black h-[41px] rounded-b-md cursor-pointer" onClick={() => {
                    console.log(id)
                }}>
                    <span type="submit" className="font-open-sans text-white">{t('add_to_cart')}</span>
                </div> : <></>}
            </div>
            <div className="flex flex-col justify-center items-start gap-3 ml-1 mt-3" >
                <span className="font-open-sans font-bold">{name}</span>
                <div className="flex items-center gap-3 font-dm-sans">
                    <span className="text-[#DB4444] font-semibold">{stock === null ? price : stock.stock_price}<span className="font-open-sans"> &#8376;</span></span>
                    {stock ? <span className="text-[#7D8184] font-semibold line-through">{price} <span className="font-open-sans ml-1">&#8376;</span></span> : <></>}
                </div>
                <div className="flex items-center gap-1">
                    <GenerateStars average_rating={average_rating} id={id} category={category.slug} steps={steps} />
                    <span className="font-dm-sans text-[#7D8184] ml-2">({length_comment})</span>
                </div>
            </div>
        </div>
    )
}

export default Product