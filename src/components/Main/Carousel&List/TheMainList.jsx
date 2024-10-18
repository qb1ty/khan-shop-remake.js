import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const TheMainList = () => {
    const { t } = useTranslation()

    const categories = [
        { label: 'woman', path: 'categories/clothes' },
        { label: 'men', path: 'categories/clothes' },
        { label: 'electronic', path: 'categories/components' },
        { label: 'sport', path: 'categories/shoes' },
    ];

    return (
        <div className="border border-t-0 border-l-0 border-b-0 border-r-slate-200 w-[20%] dark:border-r-[#3a3a3a] dark:text-[#e0e0e0]
            mini-phone:hidden
            tablet:block
        ">
            <ul className="relative flex flex-col gap-7 font-open-sans text-lg pt-10 w-[90%]
                tablet:text-sm tablet:ml-6 tablet:gap-9
                laptop:text-base laptop:ml-6 laptop:gap-9
                desktop:text-lg desktop:ml-0 desktop:gap-8
            ">
                <Link to="categories/electronics"><li className="cursor-pointer hover:underline">{t('electronic')}</li></Link>
                <Link to="categories/sports"><li className="cursor-pointer hover:underline">{t('sport')}</li></Link>
                <Link to="categories/furniture"><li className="cursor-pointer hover:underline">{t('lifestyle')}</li></Link>
                <Link to="categories/medecine"><li className="cursor-pointer hover:underline">{t('medicine')}</li></Link>
                <Link to="categories/toys"><li className="cursor-pointer hover:underline">{t('baby')}</li></Link>
                <Link to="categories/health"><li className="cursor-pointer hover:underline">{t('health')}</li></Link>
            </ul>
        </div>
    )
}

export default TheMainList