import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchUpdateCart } from "../../redux/redux-slice/cartSlice";

const CartFooter = ({ totalPrice, names }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const priceFormatter = new Intl.NumberFormat()

    return (
        <div className="flex flex-col gap-20 px-20">
            <div className="flex justify-between w-full
                mini-phone:flex-col mini-phone:items-center mini-phone:gap-5
                phone-sm:flex-row phone-sm:gap-0
            ">
                <Link to="/">
                    <button className="border border-black rounded-md h-[55px] w-[200px] dark:border-[#4a4a4a] dark:bg-[#2a2a2a] dark:text-[#e0e0e0]" type="button">{t('return_to_shop')}</button>
                </Link>
                {/* <button onClick={() => handleUpdateCart(names, 1)} className="border border-black rounded-md h-[55px] w-[200px] dark:border-[#4a4a4a] dark:bg-[#2a2a2a] dark:text-[#e0e0e0]" type="button">{t('save')}</button> */}
            </div>
            <div className="mini-phone:flex mini-phone:justify-center mini-phone:-mt-20 phone-sm:hidden phone-sm:m-0">
                <div className="flex justify-center items-center mt-5">
                    <button type="button" className="text-white rounded-sm w-[200px] h-[50px] bg-[#DB4444] dark:bg-[#DB5555]">{t('payment')}</button>
                </div>
            </div>
            <div className="
                mini-phone:hidden
                phone-sm:w-full phone-sm:flex
            ">
                <div className="flex flex-col gap-5 w-full border border-black rounded-md p-5 dark:bg-[#2a2a2a] dark:text-[#e0e0e0] dark:border-[#4a4a4a]">
                    <span className="mini-phone:text-base phone-base:text-lg pho-tab:text-xl font-open-sans tracking-wider font-bold">{t('cart_total')}</span>
                    <div className="flex justify-between mt-2">
                        <div className="font-open-sans tracking-wider mini-phone:text-sm pho-tab:text-base">{t('price_not_delivery')}</div>
                        <div className="font-open-sans tracking-wider mini-phone:text-sm pho-tab:text-base">{priceFormatter.format(+totalPrice)}</div>
                    </div>
                    <span className="w-full border-b-2 border-dashed border-black dark:border-[#e0e0e0]"></span>
                    <div className="flex justify-between">
                        <div className="font-open-sans tracking-wider mini-phone:text-sm pho-tab:text-base">{t('delivery')}</div>
                        <div className="font-open-sans tracking-wider mini-phone:text-sm pho-tab:text-base">{+totalPrice > 20000 ? t('free') : "5000" }</div>
                    </div>
                    <span className="w-full border-b-2 border-dashed border-black dark:border-[#e0e0e0]"></span>              
                    <div className="flex justify-between">
                        <div className="font-open-sans tracking-wider mini-phone:text-sm pho-tab:text-base">{t('price_delivery')}</div>
                        <div className="font-open-sans tracking-wider mini-phone:text-sm pho-tab:text-base">{+totalPrice > 20000 ? priceFormatter.format(+totalPrice) : priceFormatter.format(+totalPrice + 5000) }</div>
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <button type="button" className="text-white rounded-sm w-[200px] h-[50px] bg-[#DB4444] dark:bg-[#DB5555]">{t('payment')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default CartFooter;