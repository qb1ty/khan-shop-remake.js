import { url } from '../../../redux/store';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddProductToCart } from '../../../redux/redux-slice/cartSlice';
import { setIsOpenAlert } from '../../../redux/redux-slice/menuSlice';
import { useTranslation } from 'react-i18next';
import { isChrome, isFirefox, isOpera, isEdge, isSafari } from 'react-device-detect';

import { GoEye } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";

import GenerateStars from '../../Aside/GenerateStars';

const FlashSalesProduct = ({innerRef, name, preview, average_rating, length_comment, stock, price, id, category}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const priceFormatter = new Intl.NumberFormat()
    
    let cardStyles = "flex flex-col items-start transition-transform duration-300 ease h-[360px] snap-start"

    if (isSafari) {
        cardStyles += `
            mini-phone:translate-x-[822px]
            phone:translate-x-[822px]
            small-phone:translate-x-[822px]
            phone-sm:translate-x-[822px]
            pho:translate-x-[652px]
            phone-base:translate-x-[652px]
            phone-lg:translate-x-[652px]
            phone-xl:translate-x-[652px]
            phone-2xl:translate-x-[652px]
            pho-tab:translate-x-[652px]
            tablet-sm:translate-x-[452px]
            tablet-lg:translate-x-[492px]
            tablet:translate-x-[492px]
            laptop:translate-x-[492px]
            des-lap:translate-x-[492px]
            desktop:translate-x-[325px]
        `
    } else if (isFirefox) {
        cardStyles += `
            mini-phone:translate-x-[822px]
            phone:translate-x-[822px]
            small-phone:translate-x-[822px]
            phone-sm:translate-x-[822px]
            pho:translate-x-[652px]
            phone-base:translate-x-[652px]
            phone-lg:translate-x-[652px]
            phone-xl:translate-x-[652px]
            phone-2xl:translate-x-[652px]
            pho-tab:translate-x-[652px]
            tablet-sm:translate-x-[452px]
            tablet-lg:translate-x-[492px]
            tablet:translate-x-[492px]
            laptop:translate-x-[492px]
            des-lap:translate-x-[492px]
            desktop:translate-x-[325px]
        `
    }

    return (
        <div ref={innerRef} className={cardStyles}>
            <div className="relative inline-block bg-[#F5F5F5] w-[270px] h-full dark:bg-[#3a3a3a]" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <img src={url + preview} alt={name} className={name === "AK-900 Wired Keyboard" ? "mx-auto translate-y-14 object-cover mt-5 mb-3 h-28" : "mx-auto translate-y-14 object-cover h-40"} draggable={false} />
                <span className="absolute top-3 left-3 bg-[#DB4444] py-2 px-3 text-white rounded-md dark:bg-[#DB5555] dark:text-[#e0e0e0]">- {stock.stocks} %</span>
                <Link to={`/product/${category.slug}/${id}`}>
                    <button className="absolute top-16 right-2 text-2xl bg-white rounded-full p-2 z-40 dark:bg-[#4a4a4a] dark:text-[#e0e0e0]">
                        <GoEye />
                    </button>
                </Link>
                <button className="absolute top-3 right-2 text-2xl bg-white rounded-full p-2 dark:bg-[#4a4a4a] dark:text-[#e0e0e0]">
                    <FaRegHeart />
                </button>
                {isOpen ? <div className="flex items-center justify-center absolute bottom-0 right-0 left-0 bg-black h-[41px] cursor-pointer dark:text-[#e0e0e0]" onClick={() => {
                    dispatch(fetchAddProductToCart({
                        name: name
                    }))
                    localStorage.setItem("register", JSON.stringify("isAdded"))
                    dispatch(setIsOpenAlert())
                }}>
                    <span type="submit" className="font-open-sans text-white dark:text-[#e0e0e0]">{t('add_to_cart')}</span>
                </div> : <></>}
            </div>
            <div className="flex flex-col justify-center items-start gap-3 ml-1 mt-3" >
                <span className="font-open-sans font-bold dark:text-[#e0e0e0]">{name}</span>
                <div className="flex items-center gap-3 font-dm-sans">
                    <span className="text-[#DB4444] font-semibold dark:text-[#DB5555]">{priceFormatter.format(+stock.stock_price)} <span className="font-open-sans">&#8376;</span></span>
                    <span className="text-[#7D8184] font-semibold line-through dark:text-[#b0b0b0]">{priceFormatter.format(+price)} <span className="font-open-sans ml-1">&#8376;</span></span>
                </div>
                <div className="flex items-center gap-1">
                    <GenerateStars average_rating={average_rating} id={id} category={category.slug} />
                    <span className="font-dm-sans text-[#7D8184] ml-2 dark:text-[#e0e0e0]">({length_comment})</span>
                </div>
            </div>
        </div>
    )
}

export default FlashSalesProduct