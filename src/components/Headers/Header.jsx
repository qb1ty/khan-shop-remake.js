import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCloseSelect, setSelect, setLang } from "../../redux/redux-slice/languageSlice.js";
import { useTranslation } from "react-i18next";

import { MdKeyboardArrowDown } from "react-icons/md";
import Navigate from "./Navigates/Navigate"

const Header = () => {
    const lang = useSelector((store) => store.lang.lang)
    const isOpen = useSelector((store) => store.lang.isSelect)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const languages = {
        ru: "Русский",
        en: "English",
        kk: "Қазақша",
    };

    const changeLanguages = (lng) => {
        i18n.changeLanguage(lng)
        dispatch(setLang({lang: lng}))
        dispatch(setIsCloseSelect())
        localStorage.setItem('lang', JSON.stringify(lng))
    }

    return (
        <header>
            <div className="bg-black flex justify-center dark:bg-slate-800">
                <div className="flex justify-around items-center w-full max-w-[1440px]">
                    <div className="mr-20
                        mini-phone:hidden
                        laptop:mr-20 laptop:block
                    "></div>
                    <div className="flex justify-center items-center gap-4 py-4
                        mini-phone:hidden
                        phone-base:flex
                    ">
                        <span className="font-open-sans text-white ml-1 dark:text-[#e0e0e0]
                            mini-phone:text-xs mini-phone:hidden
                            phone-base:block
                            phone-lg:text-xs
                            tablet-sm:text-base
                            2k:text-lg
                        ">{t('header_title')}</span>
                        <span className="font-open-sans font-bold text-white underline dark:text-[#e0e0e0]
                            mini-phone:hidden
                            phone-xl:block
                            tablet-sm:text-base
                            2k:text-lg
                        ">{t('shop_now')}</span>
                    </div>
                    <div className="relative flex items-center gap-1 py-4">
                        <span className="select-none cursor-pointer font-open-sans text-white dark:text-[#e0e0e0]
                            phone-lg:text-sm
                            pho-tab:text-base
                            2k:text-lg
                        " onClick={() => dispatch(setSelect())}>{ languages[lang] || "English" }</span>
                        <span className="select-none cursor-pointer text-white text-3xl dark:text-[#e0e0e0]
                            mini-phone:text-2xl
                            pho-tab:text-3xl
                            2k:text-4xl
                        " onClick={() => dispatch(setSelect())}>
                            <MdKeyboardArrowDown />
                        </span>

                        { isOpen ?
                            <div className="flex flex-col gap-3 absolute top-14 -left-5 -right-2 pb-2 bg-black dark:bg-slate-800
                                
                            ">
                                <span
                                    className="font-open-sans text-white ml-5 cursor-pointer transition-all duration-100 ease hover:scale-110 dark:text-[#e0e0e0]"
                                    onClick={() => {changeLanguages(lang === "ru" ? "en" : "ru")}}>
                                    {lang === "ru" ? "English" : "Русскии"}
                                </span>
                                <span
                                    className="font-open-sans text-white ml-5 cursor-pointer transition-all duration-100 ease hover:scale-110 dark:text-[#e0e0e0]"
                                    onClick={() => {changeLanguages(lang === "ru" || lang === "en" ? "kk" : "en")}}>
                                    {lang === "kk" ? "English" : "Қазақша"}
                                </span>
                            </div>
                        : <></>}
                    </div>
                </div>
            </div>
            <Navigate />
        </header>
    )
}

export default Header