import NavFormList from "./NavFormList";
import NavList from "./NavList";
import { useTranslation } from "react-i18next";

const Navigate = () => {
    const { t } = useTranslation()

    return (
        <div className="mt-20 border border-t-0 border-l-0 border-r-0 border-b-slate-200 max-w-[1440px] mx-auto dark:text-[#e0e0e0] dark:border-b-[#3a3a3a]">
            <div className="flex justify-evenly items-center pb-8">
                <span className="font-open-sans font-bold text-4xl
                    mini-phone:hidden
                    mini-tablet:hidden
                    phone:hidden
                    pho:block pho:text-xl
                    phone-base:block phone-base:text-2xl
                    pho-tab:block pho-tab:text-2xl
                    tablet:block tablet:text-4xl
                    laptop:block laptop:text-4xl
                    desktop:block desktop:text-4xl
                ">{t('exclusive')}</span>
                <NavList />
                <NavFormList />                
            </div>
        </div>
    )
}

export default Navigate