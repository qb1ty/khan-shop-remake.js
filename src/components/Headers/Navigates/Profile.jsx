import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setIsCloseProfileMenu } from "../../../redux/redux-slice/menuSlice";
import { setIsOpenAlert } from '../../../redux/redux-slice/menuSlice';

import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineLogout, MdClose } from "react-icons/md";


const Profile = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const refresh = JSON.parse(localStorage.getItem("refresh"))

    const pathTo = refresh ? "account/personal" : "registration/signup"

    const handleClick = () => {
        if (!refresh) return;

        if (refresh) {
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')

            localStorage.setItem("register", JSON.stringify("exit"));

            dispatch(setIsOpenAlert())
            navigate("/")
        }
    }

    return (
        <div className="cursor-default text-base absolute top-12 mini-phone:left-0 pho:-left-36 backdrop-blur-lg bg-gradient-to-r from-[#4e46e59f] to-[#94a3b8ae] z-50 dark:bg-gradient-to-r dark:from-[#4e46e563] dark:to-[#94a3b863]">
            <div onClick={() => dispatch(setIsCloseProfileMenu())} className="absolute top-2 right-2 text-2xl p-1 cursor-pointer rounded-full bg-white text-black transition-all duration-200 hover:scale-110 mini-phone:text-lg phone-sm:text-2xl">
                <MdClose />
            </div>
            <div className="flex flex-col justify-center items-start gap-5 py-5 pl-5 mini-phone:w-[300px] phone-sm:w-[350px]">
                <div className="flex items-center gap-4" onClick={() => dispatch(setIsCloseProfileMenu())}>
                    <span className="phone-sm:text-4xl mini-phone:text-2xl text-white font-open-sans transition-all duration-300 hover:scale-125 dark:text-[#e0e0e0]">
                        <NavLink to={pathTo} className={({ isActive }) => isActive && pathTo === "account/personal" ? "text-black cursor-not-allowed" : "cursor-pointer"}>
                            <AiOutlineUser />
                        </NavLink>
                    </span>
                    <span className="phone-sm:text-xl mini-phone:text-base text-white font-open-sans tracking-wider w-[80%] dark:text-[#e0e0e0]">
                        <NavLink to={pathTo} className={({ isActive }) => isActive && pathTo === "account/personal" ? "text-black cursor-not-allowed" : "cursor-pointer"}> 
                            {t('manage_account')}
                        </NavLink>
                    </span>
                </div>
                <div className="flex items-center gap-4" onClick={() => dispatch(setIsCloseProfileMenu())}>
                    <span className="phone-sm:text-4xl mini-phone:text-2xl text-white font-open-sans transition-all duration-300 hover:scale-125 dark:text-[#e0e0e0]">
                        <NavLink to="account/orders" className={({ isActive }) => isActive ? "text-black cursor-not-allowed" : "cursor-pointer"}>
                            <FiShoppingBag />
                        </NavLink>
                    </span>
                    <span className="phone-sm:text-xl mini-phone:text-base text-white font-open-sans tracking-wider dark:text-[#e0e0e0]">
                        <NavLink to="account/orders" className={({ isActive }) => isActive ? "text-black cursor-not-allowed" : "cursor-pointer"}> 
                            {t('order')}
                        </NavLink>
                    </span>
                </div>
                <div className="flex items-center gap-4" onClick={() => dispatch(setIsCloseProfileMenu())}>
                    <span onClick={() => handleClick()} className={!refresh ? "phone-sm:text-4xl mini-phone:text-2xl text-white font-open-sans dark:text-[#e0e0e0]" : "phone-sm:text-4xl mini-phone:text-2xl text-white font-open-sans cursor-pointer transition-all duration-300 hover:scale-125 dark:text-[#e0e0e0]"}>
                        <MdOutlineLogout />
                    </span>
                    {!refresh ?
                        <span className="phone-sm:text-xl mini-phone:text-base text-white font-open-sans tracking-wider dark:text-[#e0e0e0]">
                            <NavLink to="registration/login" className={({ isActive }) => isActive ? "border-0 border-b-2 border-white cursor-not-allowed dark:border-[#e0e0e0]" : "cursor-pointer"}>
                                {t('log_in')}
                            </NavLink>
                            {' '}/{' '}
                            <NavLink to="registration/signup" className={({ isActive }) => isActive ? "border-0 border-b-2 border-white cursor-not-allowed dark:border-[#e0e0e0]" : "cursor-pointer"}>
                                {t('sign_up')}
                            </NavLink>
                        </span> :
                        <span onClick={() => handleClick()} className="phone-sm:text-xl mini-phone:text-base text-white font-open-sans tracking-wider cursor-pointer dark:text-[#e0e0e0]">{t('logout')}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile