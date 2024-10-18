import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaRegCopyright } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { isClear } from "../../redux/redux-slice/registerSlice";

const Footer = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const lng = JSON.parse(localStorage.getItem("lang")) || "en";

    const refresh = JSON.parse(localStorage.getItem("refresh"))

    return (
        <footer>
            <div className="w-full mt-48 bg-black text-white">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex justify-evenly gap-20 py-20 px-2
                        mini-phone:flex-col mini-phone:items-center
                        pho-tab:flex-row pho-tab:items-start
                    ">
                        <div className="flex flex-col dark:text-[#e0e0e0]
                            mini-phone:w-full mini-phone:items-center
                            pho-tab:w-[15%] pho-tab:items-start
                        ">
                            <span className="text-2xl font-open-sans font-medium mb-2">{t('support')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">{t('adress')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">saparbekarsen07@gmail.com</span>
                            <span className="font-open-sans mt-4 tracking-wider">+7 771 216 93 09</span>
                        </div>
                        <div className="flex flex-col dark:text-[#e0e0e0]
                            mini-phone:items-center
                            pho-tab:items-start
                        ">
                            <span className="text-2xl font-open-sans font-medium mb-2">{t('account')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">
                                <Link to="account/personal">
                                    {t('my_account')}
                                </Link>
                            </span>
                            {!refresh && <span className="font-open-sans mt-4 tracking-wider">
                                <Link to="registration/login">
                                    {t('log_in')}
                                </Link>
                                {' '}/{' '}
                                <Link to="registration/signup">
                                    {t('sign_up')}
                                </Link>
                            </span>}
                            <span className="font-open-sans mt-4 tracking-wider">{t('cart')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">
                                <Link to="/">
                                    {t('shop')}
                                </Link>
                            </span>
                        </div>
                        <div className="flex flex-col dark:text-[#e0e0e0]
                            mini-phone:items-center
                            pho-tab:items-start
                        ">
                            <span className="text-2xl font-open-sans font-medium mb-2">{t('quick_link')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">{t('policy')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">{t('terms')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">{t('faq')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">
                                <Link to="/contact">
                                    {t('contact')}
                                </Link>
                            </span>
                        </div>
                        <div className="flex flex-col dark:text-[#e0e0e0]">
                            <span className="text-2xl font-open-sans font-medium mb-2">{t('exclusive')}</span>
                            <span className="font-open-sans mt-4 tracking-wider">{t('messengers')}</span>
                            <div className="flex gap-5 mt-10 text-4xl cursor-pointer" onClick={() => dispatch(isClear(lng))}>
                                <FaFacebook className="transition-all duration-200 hover:text-blue-600 hover:scale-125" />
                                <FaTwitter className="transition-all duration-200 hover:text-blue-400 hover:scale-125" />
                                <FaInstagram className="transition-all duration-200 hover:text-pink-600 hover:scale-125" />
                                <FaYoutube className="transition-all duration-200 hover:text-red-600 hover:scale-125" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 border-0 border-t-2 border-[#ffffff2a] text-[#ffffff2d] pt-4 pb-4 text-center">
                        <span className="font-open-sans mini-phone:hidden phone:block">
                            <FaRegCopyright />
                        </span>
                        <span className="font-open-sans">
                            {t('copyright')}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer