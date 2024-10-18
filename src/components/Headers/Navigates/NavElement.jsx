import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next";

const NavElement = () => {
    const { t } = useTranslation()

    return (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? "cursor-not-allowed border-0 border-b-2 border-b-black dark:border-b-[#e0e0e0]" : "cursor-pointer"}>
                <li>{t('home')}</li>
            </NavLink>
            <NavLink to="contact" className={({ isActive }) => isActive ? "cursor-not-allowed border-0 border-b-2 border-b-black dark:border-b-[#e0e0e0]" : "cursor-pointer"}>
                <li>{t('contact')}</li>
            </NavLink>
            <NavLink to="about" className={({ isActive }) => isActive ? "cursor-not-allowed border-0 border-b-2 border-b-black dark:border-b-[#e0e0e0]" : "cursor-pointer"}>
                <li>{t('about')}</li>
            </NavLink>
        </>
    )
}

export default NavElement