import { url } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCart,
    fetchRemoveProduct
} from "../../redux/redux-slice/cartSlice";
import { useTranslation } from "react-i18next";

import Count from "./Count"

import { MdClose } from "react-icons/md";

const Product = ({ carts, product, quantity, price_quantity }) => {
    const { name, preview, stock, id, price } = product
    const { cart } = carts
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const priceFormatter = new Intl.NumberFormat()

    const handleClick = async () => {
        await dispatch(fetchRemoveProduct({name: name}))
        await dispatch(fetchCart())
    }

    return (
        <>
            <div className="relative flex flex-col gap-14 w-full mini-phone:hidden phone-sm:flex">
                <div className="grid grid-cols-4 gap-6 items-center p-4 border-b dark:border-b-[#4a4a4a]">
                    <div className="flex justify-center">
                        <div className="relative">
                            <img src={url + preview} alt={name} className="object-contain w-32 h-24" />
                            <span className="absolute -top-2 -left-3 text-sm p-1 rounded-full dark:bg-[#e0e0e0] z-40 cursor-pointer" onClick={() => handleClick(id)}><MdClose /></span>
                        </div>
                    </div>
                    <span className="font-open-sans tracking-wider text-center dark:text-[#e0e0e0]
                        mini-phone:text-sm phone-xl:text-base
                    ">
                        {stock ? priceFormatter.format(+stock?.stock_price) : priceFormatter.format(price)}
                    </span>
                    <div className="flex justify-center items-center">
                        <Count
                            name={name}
                            quantity={quantity}
                        />
                    </div>
                    <span className="font-open-sans text-center dark:text-[#e0e0e0]
                        mini-phone:text-sm phone-xl:text-base
                    ">{priceFormatter.format(+price_quantity)}</span>
                </div>
            </div>
            <div className="phone-sm:hidden mini-phone:flex flex-col gap-14 mini-phone:mx-2 mini-tablet-lg:m-0 dark:border-b dark:border-b-[#4a4a4a]">
                <div className="flex justify-around gap-2 pb-3">
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 p-1 rounded-full dark:bg-[#e0e0e0] z-40 cursor-pointer">
                            <span className="text-sm"><MdClose /></span>
                        </div>
                        <img src={url + preview} alt={name} className="w-36 h-28 object-contain" />
                    </div>
                    <div className="flex flex-col justify-between items-start gap-4">
                        <span className="font-open-sans tracking-wider text-center dark:text-[#e0e0e0]
                            mini-phone:text-sm phone-xl:text-base
                        ">
                            {t('price')}:
                            {stock ? priceFormatter.format(+stock?.stock_price) : priceFormatter.format(price)}
                        </span>
                        <span className="font-open-sans text-center dark:text-[#e0e0e0]
                            mini-phone:text-sm phone-xl:text-base
                        ">{t('total_price')}: {priceFormatter.format(+price_quantity)}</span>
                        <div className="flex justify-center items-center">
                            <Count 
                                quantity={quantity}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product