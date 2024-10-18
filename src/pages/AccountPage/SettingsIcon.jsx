import { NavLink, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

const SettingsIcon = () => {
    const location = useLocation()
    const path = location.pathname

    return (
        <>
            {path === "/account/personal" ? <NavLink to="/account/settings" className={(({ isActive }) => isActive ? "text-[#DB4444]" : "text-black")}>
                    <div className="absolute top-3 right-5 text-2xl cursor-pointer dark:text-[#e0e0e0]
                        mini-phone:block
                        tablet-lg:hidden
                    ">
                        <IoSettingsOutline />
                    </div>
                </NavLink> :
                <NavLink to="/account/personal" className={(({ isActive }) => isActive ? "text-[#DB4444]" : "text-black")}>
                    <div className="absolute top-3 right-5 text-2xl cursor-pointer dark:text-[#e0e0e0]
                        mini-phone:block
                        tablet-lg:hidden
                    ">
                        <AiOutlineUser />
                    </div>
                </NavLink>
            }
        </>
    )
}

export default SettingsIcon