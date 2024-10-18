import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { 
    handleChangeNewPassword,
    handleChangeOldPassword,
    blurHandler,
    changeLanguage,
    validIsTrue,
    validIsFalse,
    isClear,
    fetchUpdatePassword
} from "../../redux/redux-slice/profileSlice";
import { appendErrorMessage } from "../../redux/redux-slice/registerSlice";
import { setIsOpenAlert } from "../../redux/redux-slice/menuSlice";

const ChangeForm = () => {
    const oldPassword = useSelector((store) => store.profile.oldPassword)
    const oldPasswordError = useSelector((store) => store.profile.oldPasswordError)
    const oldPasswordDirty = useSelector((store) => store.profile.oldPasswordDirty)
    const newPassword = useSelector((store) => store.profile.newPassword)
    const newPasswordError = useSelector((store) => store.profile.newPasswordError)
    const newPasswordDirty = useSelector((store) => store.profile.newPasswordDirty)
    const validation = useSelector((store) => store.profile.validation)

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const lng = JSON.parse(localStorage.getItem("lang")) || "en";

    useEffect(() => {
        oldPasswordError || newPasswordError ? dispatch(validIsFalse()) : dispatch(validIsTrue())
    }, [oldPasswordError, newPasswordError])

    useEffect(() => {
        dispatch(changeLanguage(lng))
    }, [lng])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(isClear(lng))

        try {
            if (oldPassword.trim().length === 0 && newPassword.trim().length === 0) return;
            const resultAction = await dispatch(fetchUpdatePassword({
                oldPassword: oldPassword.trim().toLowerCase(),
                newPassword: newPassword.trim().toLowerCase()
            }))

            if (fetchUpdatePassword.rejected.match(resultAction)) {
                const error = resultAction.payload;
                if (error.response && error.response.status >= 400) {
                    localStorage.setItem("register", JSON.stringify("error"));
                    dispatch(appendErrorMessage(error.response.data.error))
                    dispatch(setIsOpenAlert())
                }
            } else {
                localStorage.setItem("register", JSON.stringify("update"));
                dispatch(setIsOpenAlert())
            }
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }
    }

    return (
        <div className="mt-2">
            <form onSubmit={(e) => handleSubmit(e)}>
                <span className="text-lg font-open-sans tracking-wider dark:text-[#e0e0e0]
                    mini-phone:text-base
                    phone-sm:text-lg
                ">{t('password_change')}</span>
                <div className="flex flex-col gap-5 mt-5">
                    {(oldPasswordDirty && oldPasswordError) && <div className="font-open-sans text-sm text-red-600 ml-1">{oldPasswordError}</div>}
                    <input value={oldPassword} onChange={(e) => dispatch(handleChangeOldPassword({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type="password" name="oldPassword" placeholder={t('current_password')} className="font-open-sans outline-none bg-slate-100 w-full p-3 placeholder:tracking-wider dark:bg-[#4a4a4a] dark:text-[#e0e0e0] dark:placeholder:text-[#e0e0e0]
                        mini-phone:text-xs
                        phone-sm:text-base
                    " autoComplete="off" />
                    {(newPasswordDirty && newPasswordError) && <div className="font-open-sans text-sm text-red-600 ml-1">{newPasswordError}</div>}
                    <input value={newPassword} onChange={(e) => dispatch(handleChangeNewPassword({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type="password" name="newPassword" placeholder={t('new_password')} className="font-open-sans outline-none bg-slate-100 w-full p-3 placeholder:tracking-wider dark:bg-[#4a4a4a] dark:text-[#e0e0e0] dark:placeholder:text-[#e0e0e0]
                        mini-phone:text-xs
                        phone-sm:text-base
                    " autoComplete="off" />
                </div>
                <div className="flex mt-10">
                    <button disabled={!validation} type="submit" className="bg-[#DB4444] rounded-md text-white font-open-sans tracking-wider  disabled:bg-slate-400 disabled:cursor-not-allowed
                        mini-phone:text-base mini-phone:w-[183px] mini-phone:h-[50px]
                        phone-sm:text-lg phone-sm:w-[213px] phone-sm:h-[60px]
                    ">{t('save_change')}</button>
                </div>
            </form>
        </div>
    )
}

export default ChangeForm