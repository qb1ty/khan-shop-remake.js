import { url } from "../../redux/store";

import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from "../../redux/redux-slice/productsSlice";

import GenerateStars from "../../components/Aside/GenerateStars"
import CountPersonal from "./CountPersonal"

import { FaRegHeart } from "react-icons/fa6";

const ProductPage = ({ category, id }) => {
    const product = useSelector((store) => store.products.product)
    const lang = JSON.parse(localStorage.getItem("lang")) || "en"

    const average_rating = product?.average_rating
    const report = product?.comments?.length
    const stock = product?.stock
    const price = product?.price
    const descriptions = product?.descriptions
    const descriptions_en = product?.descriptions_en
    const descriptions_kk = product?.descriptions_kk

    const currentDescription = lang === "ru" ? descriptions : lang === "kk" ? descriptions_kk : lang === "en" ? descriptions_en : descriptions_en
    const priceFormatter = new Intl.NumberFormat()
    
    return (
        <>
            <div className="flex justify-center items-start gap-20">
                <div className="flex">
                    <div className="flex gap-10 p-4">
                        <div className="flex flex-col gap-12">
                            <img src={url + product?.images[1]?.image} alt="" className="w-40 h-40 object-contain bg-slate-100 p-4 dark:bg-[#4a4a4a]" />
                            <img src={url + product?.images[2]?.image} alt="" className="w-40 h-40 object-contain bg-slate-100 p-4 dark:bg-[#4a4a4a]" />
                            <img src={url + product?.images[3]?.image} alt="" className="w-40 h-40 object-contain bg-slate-100 p-4 dark:bg-[#4a4a4a]" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <img src={url + product?.images[0]?.image} alt="" className="w-[400px] h-[400px] object-contain bg-slate-100 p-4 dark:bg-[#4a4a4a]" />
                            <img src={url + product?.images[4]?.image} alt="" className="w-40 h-40 object-contain bg-slate-100 p-4 dark:bg-[#4a4a4a]" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end p-4 w-[25%]">
                    <div className="flex flex-col items-start gap-2 dark:text-[#e0e0e0]">
                        <span className="font-open-sans text-xl tracking-wider font-semibold">{product?.name}</span>
                        <div className="flex items-center gap-3 w-full">
                            <span className="flex items-center">
                                <GenerateStars average_rating={average_rating} category={category} id={id} />
                            </span>
                            <span className="font-open-sans tracking-wider text-[#7D8184]">({report})</span>
                            {stock &&
                                <>
                                    <span className="text-lg text-[#7D8184]">|</span>
                                    <span className="font-open-sans wider text-lime-400">In Stock</span>
                                </>
                            }
                        </div>
                        <div className="flex flex-col gap-4 pb-7 border-b border-b-black pt-5 dark:border-b-[#2a2a2a]">
                            <span className="font-open-sans tracking-wider  text-xl">{ stock ? priceFormatter.format(stock.stock_price) : priceFormatter.format(price) } &#8376;</span>
                            <span className="font-open-sans tracking-wider text-sm">{currentDescription}</span>
                        </div>
                        <div className="flex items-center gap-6 pt-5">
                            <CountPersonal />
                            <button type="button" className="font-open-sans tracking-wider w-[120px] h-[40px] bg-[#DB4444] text-white rounded-sm dark:bg-[#DB5555]">Buy Now</button>
                            <span className="text-lg p-2.5 border border-slate-300 rounded-md cursor-pointer dark:border-[#4a4a4a]"><FaRegHeart /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage