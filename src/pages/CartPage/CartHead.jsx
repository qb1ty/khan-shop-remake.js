import { useTranslation } from "react-i18next";

const CartHead = () => {
    const { t } = useTranslation()

    return (
        <div className="grid grid-cols-4 items-center gap-6 font-open-sans text-lg p-4 w-full bg-slate-200 dark:bg-slate-600 dark:text-[#e0e0e0]
            mini-phone:hidden phone-sm:grid
        ">
            <div className="tracking-wider text-center mini-phone:text-sm phone-xl:text-base">{t('product')}</div>
            <div className="tracking-wider text-center mini-phone:text-sm phone-xl:text-base">{t('price')}</div>
            <div className="tracking-wider text-center mini-phone:text-sm phone-xl:text-base">{t('quantity')}</div>
            <div className="tracking-wider text-center mini-phone:text-sm phone-xl:text-base">{t('total_price')}</div>
        </div>
    )
}
 
export default CartHead;