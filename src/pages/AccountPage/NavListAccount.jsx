import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setIsOpenAlert } from "../../redux/redux-slice/menuSlice";

import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const NavListAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const refresh = JSON.parse(localStorage.getItem("refresh"))

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
        <div className="
            mini-phone:hidden
            tablet-lg:block
        ">
            <div className="absolute bottom-0 flex items-center gap-5 text-[#DB4444] dark:text-[#DB5555]" onClick={() => handleClick()}>
                <span className="phone-sm:text-4xl mini-phone:text-2xl font-open-sans cursor-pointer transition-all duration-300 hover:scale-125">
                    <MdOutlineLogout />
                </span>
                <span className="text-lg text-black cursor-pointer tracking-wider dark:text-[#e0e0e0]">{t('logout')}</span>
            </div>
            <div className="flex flex-col font-open-sans">
                <ul className="flex flex-col gap-3 mb-10">
                    <li className="dark:text-[#e0e0e0]
                        mini-phone:text-base
                        laptop:text-lg
                        des-lap-lg:text-xl
                    ">{t('manage_account')}</li>
                    <NavLink to="/account/personal" className={(({ isActive }) => isActive ? "flex items-center gap-2 text-[#DB4444] pl-10 tracking-wider cursor-not-allowed dark:text-[#DB5555]" : "flex items-center gap-2 text-[#7D8184] pl-10 tracking-wider cursor-pointer dark:text-[#e0e0e0]")}>
                        <span className="text-3xl"><AiOutlineUser /></span>
                        <span className="tracking-wider
                            mini-phone:text-base
                            laptop:text-base
                            des-lap-lg:text-base
                        ">{t('my_account')}</span>
                    </NavLink>
                    <NavLink to="/account/settings" className={(({ isActive }) => isActive ? "flex items-center gap-2 text-[#DB4444] pl-10 tracking-wider cursor-not-allowed dark:text-[#DB5555]" : "flex items-center gap-2 text-[#7D8184] pl-10 tracking-wider cursor-pointer dark:text-[#e0e0e0]")}>
                        <span className="text-3xl"><IoSettingsOutline /></span>
                        <span className="tracking-wider
                            mini-phone:text-base
                            laptop:text-base
                            des-lap-lg:text-base
                        ">{t('settings')}</span>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default NavListAccount