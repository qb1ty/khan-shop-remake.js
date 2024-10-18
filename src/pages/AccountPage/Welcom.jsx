import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Welcome = () => {
    const account = useSelector((store) => store.profile.account)

    const { t } = useTranslation()

    return (
        <div className="flex justify-end mini-phone:mr-10 small-phone:mx-24">
            <div className="flex gap-2 font-open-sans">
                <span className="dark:text-[#e0e0e0]">{t('welcome')}</span>
                <span className="text-[#DB4444] dark:text-[#DB5555]">{account?.username?.toUpperCase()}</span>
            </div>
        </div>
    )
}

export default Welcome