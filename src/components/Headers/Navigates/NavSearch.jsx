import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";

const NavSearch = () => {
    const { t } = useTranslation()

    return (
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className="font-open-sans outline-none rounded-sm bg-slate-100 w-[105%] h-10 pr-20 pl-5 dark:bg-slate-800
                    mini-phone:block mini-phone:w-[95%] mini-phone:text-xs mini-phone:pl-2 mini-phone:pr-14
                    mini-tablet:block mini-tablet:w-[98%] mini-tablet:text-base mini-tablet:pl-2 mini-tablet:pr-16
                    phone:block phone:pl-5
                    pho:hidden
                    pho-tab:hidden
                    tablet:block tablet:w-[105%] tablet:text-lg tablet:pr-20
                "
                placeholder={t('search')}
            />

            <div className="absolute top-1 -right-2
                mini-phone:block mini-phone:right-5
                mini-tablet:block mini-tablet:right-5
                phone:block phone:right-2
                pho:hidden
                pho-tab:hidden
                tablet:block tablet:-right-2
            ">
                <button type="submit" className="text-3xl"><CiSearch /></button>
            </div>
        </form>
    )
}

export default NavSearch