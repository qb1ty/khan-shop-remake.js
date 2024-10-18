import { useTranslation } from "react-i18next"

const BestSalesHead = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center gap-5">
                <span className="rounded-md w-8 h-16 bg-[#DB4444] dark:bg-[#DB5555]"></span>
                <span className="font-open-sans font-semibold text-lg text-[#DB4444] dark:text-[#DB5555]">{t('all_time')}</span>
            </div>
            <div>
                <span className="font-open-sans font-bold text-5xl dark:text-[#e0e0e0]">{t('most_popular_products')}</span>
            </div>
        </div>
    )
}

export default BestSalesHead