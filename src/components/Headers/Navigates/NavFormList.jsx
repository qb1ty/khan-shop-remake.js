import { Drawer } from 'antd';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenMenu, setIsCloseMenu, setIsOpenProfileMenu, setIsCloseProfileMenu, setIsOpenAlert } from "../../../redux/redux-slice/menuSlice";

import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { GrCart, GrClose } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import NavSearch from "./NavSearch";
import Profile from "./Profile"

const NavFormList = () => {
    const { t } = useTranslation()
    const isOpen = useSelector((store) => store.menu.isMenu)
    const isOpenProfileMenu = useSelector((store) => store.menu.isProfileMenu)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const refresh = JSON.parse(localStorage.getItem("refresh"))
    const toCartPath = refresh ? "/cart" : "/"

    const handleClick = () => {
        if (refresh) return;
        
        localStorage.setItem("register", JSON.stringify("error_rating_unauthorized"))
        dispatch(setIsOpenAlert())
    }

    const onClose = () => {
        dispatch(setIsCloseMenu())
    }

    return (
        <>
            <div className="flex items-center">
                <div className="flex items-center">
                    <div className="flex items-center gap-5 mr-5 ml-1
                        mini-phone:gap-3 mini-phone:mr-3
                        phone:gap-5 phone:mr-5
                    ">
                        <span className="relative cursor-pointer z-50
                            mini-phone:text-2xl
                            mini-tablet:text-2xl
                            phone:text-3xl
                        ">
                            <div onMouseEnter={() => dispatch(setIsOpenProfileMenu())} className={isOpenProfileMenu ? "text-red-500 dark:text-[#ff6b6b]": ""}>
                                <CgProfile />
                            </div>
                            {isOpenProfileMenu ? <Profile /> : <></>}
                        </span>
                        <span className="cursor-pointer 
                            mini-phone:text-2xl
                            mini-tablet:text-2xl
                            phone:text-3xl
                        "><FaRegHeart /></span>
                        <NavLink to={toCartPath} className={(({ isActive }) => isActive && toCartPath === "/cart" ? "text-[#DB4444] dark:text-[#DB5555]" : "")}>
                            <span onClick={() => handleClick()} className="cursor-pointer 
                                mini-phone:text-2xl
                                mini-tablet:text-2xl
                                phone:text-3xl
                            "><GrCart /></span>
                        </NavLink>
                        <span className="cursor-pointer select-none
                            mini-phone:text-2xl mini-phone:block
                            mini-tablet:text-2xl mini-tablet:block
                            phone:text-3xl
                            tablet:hidden
                        ">
                            { isOpen ? <GrClose onClick={() => dispatch(setIsCloseMenu())} /> : <RxHamburgerMenu onClick={() => dispatch(setIsOpenMenu())} /> }
                        </span>
                    </div>

                    <NavSearch />
                </div>
            </div>
            <Drawer
                placement="left"
                width={"65%"}
                onClose={onClose}
                open={isOpen}
                className="dark:bg-slate-800 dark:text-[#e0e0e0]"
            >
                <div className="
                    mini-phone:-ml-1
                    phone-base:ml-0
                ">
                    <ul className="flex flex-wrap items-center gap-4 pb-5 border-b-2">
                        <NavLink to="/" className={({ isActive }) => isActive ? "cursor-not-allowed border-0 border-b-2 border-b-black hover:text-black dark:hover:text-[#e0e0e0] dark:border-b-[#e0e0e0]" : "cursor-pointer hover:text-black dark:hover:text-[#e0e0e0]"}>
                            <li>{t('home')}</li>
                        </NavLink>
                        <NavLink to="contact" className={({ isActive }) => isActive ? "cursor-not-allowed border-0 border-b-2 border-b-black hover:text-black dark:hover:text-[#e0e0e0] dark:border-b-[#e0e0e0]" : "cursor-pointer hover:text-black dark:hover:text-[#e0e0e0]"}>
                            <li>{t('contact')}</li>
                        </NavLink>
                        <NavLink to="about" className={({ isActive }) => isActive ? "cursor-not-allowed border-0 border-b-2 border-b-black hover:text-black dark:hover:text-[#e0e0e0] dark:border-b-[#e0e0e0]" : "cursor-pointer hover:text-black dark:hover:text-[#e0e0e0]"}>
                            <li>{t('about')}</li>
                        </NavLink>
                    </ul>
                    <ul className="flex flex-col gap-7 font-open-sans text-lg pt-4
                        mini-phone:text-sm
                        phone-base:text-lg
                    ">
                        <Link to="categories/electronics"><li className="cursor-pointer hover:underline">{t('electronic')}</li></Link>
                        <Link to="categories/sports"><li className="cursor-pointer hover:underline">{t('sport')}</li></Link>
                        <Link to="categories/furniture"><li className="cursor-pointer hover:underline">{t('lifestyle')}</li></Link>
                        <Link to="categories/medecine"><li className="cursor-pointer hover:underline">{t('medicine')}</li></Link>
                        <Link to="categories/toys"><li className="cursor-pointer hover:underline">{t('baby')}</li></Link>
                        <Link to="categories/health"><li className="cursor-pointer hover:underline">{t('health')}</li></Link>
                    </ul>
                </div>
            </Drawer>
        </>
    )
}

export default NavFormList