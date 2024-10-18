import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { fetchProfile } from "../../redux/redux-slice/profileSlice";

import Welcome from "./Welcom";
import NavListAccount from "./NavListAccount";
import Account from "./Account";
import Settings from "./Settings";
import LoadingPersonal from "../../components/Loaders/LoadingPersonal";
import SettingsIcon from "./SettingsIcon";

const Personal = () => {
    const status = useSelector((store) => store.profile.status)
    const dispatch = useDispatch()
    const location = useLocation()

    const routes = {
        "/account/personal": <Account />,
        "/account/settings": <Settings />,
    };
    
    useEffect(() => {
        dispatch(fetchProfile())
    }, [])

    if (status === "Loading") {
        return <LoadingPersonal />
    } 
    
    return (
        <div className="mt-20">
            <div className="max-w-[1440px] mx-auto">
                <Welcome />
                <div className="mt-32 max-w-full max-h-full">
                    <div className="relative flex justify-between items-start
                        mini-phone:ml-10
                        des-lap-lg:ml-10
                    ">
                        <NavListAccount />
                        <div className="relative bg-white shadow-lg dark:bg-[#3a3a3a]
                            mini-phone:w-full mini-phone:px-8 mini-phone:py-10 mini-phone:mx-auto mini-phone:-translate-x-5
                            phone-xl:px-28 phone-xl:py-16
                            tablet-lg:w-[90%] tablet-lg:mx-10 tablet-lg:translate-x-0
                            laptop:w-[70%] laptop:mx-10 laptop:translate-x-0
                            des-lap-lg:w-[65%] des-lap-lg:mx-auto des-lap-lg:translate-x-0
                        ">
                            <SettingsIcon />
                            <div className="flex flex-col gap-5">
                                {routes[location.pathname] || <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personal