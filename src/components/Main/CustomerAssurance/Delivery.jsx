import { useTranslation } from "react-i18next";
import { TbTruckDelivery } from "react-icons/tb";

const Delivery = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="bg-slate-300 p-3 rounded-full w-[92px] h-[92px]">
                <div className="bg-black rounded-full p-4">
                    <span className="text-white font-extralight text-4xl">
                        <TbTruckDelivery />
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center text-center font-open-sans">
                <span className="font-bold text-xl">{t('delivery_head')}</span>
                <span className="text-sm">{t('delivery_body')}</span>
            </div>
        </div>
    )
}

export default Delivery