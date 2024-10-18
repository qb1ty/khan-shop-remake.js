import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { url } from "../../redux/store";


import {
    handleAvatarChange,
    handleUsernameChange,
    handleEmailChange,
    blurHandler,
    validIsTrue,
    validIsFalse,
    changeLanguage,
    isClear, 
    fetchUpdate,
} from "../../redux/redux-slice/registerSlice";
import { setIsOpenAlert } from "../../redux/redux-slice/menuSlice";

const Account = () => {
    const inputFileRef = useRef(null)
    const account = useSelector((store) => store.profile.account)

    const avatar = useSelector((store) => store.register.avatar);

    const username = useSelector((store) => store.register.username);
    const usernameError = useSelector((store) => store.register.usernameError);
    const usernameDirty = useSelector((store) => store.register.usernameDirty);

    const email = useSelector((store) => store.register.email);
    const emailError = useSelector((store) => store.register.emailError);
    const emailDirty = useSelector((store) => store.register.emailDirty);

    const validation = useSelector((store) => store.register.validation);
    
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const lang = JSON.parse(localStorage.getItem("lang")) || "en"
    localStorage.setItem("account", JSON.stringify(account?.username))

    useEffect(() => {
        usernameError ? dispatch(validIsFalse()) : dispatch(validIsTrue())
    }, [usernameError])

    useEffect(() => {
        emailError ? dispatch(validIsFalse()) : dispatch(validIsTrue())
    }, [emailError])

    useEffect(() => {
        !avatar ? dispatch(validIsFalse()) : dispatch(validIsTrue())
    }, [avatar])

    useEffect(() => {
        dispatch(changeLanguage(lang))
    }, [lang])

    const formatDate = (formatDate, lang) => {
        const date = new Date(formatDate)
        

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
    
        if (lang === "ru") return date.toLocaleDateString('ru-RU', options) + ' ' + date.toLocaleTimeString('ru-RU')
        if (lang === "en") return date.toLocaleDateString('en-US', options) + ' ' + date.toLocaleTimeString('en-US')
        if (lang === "kk") return date.toLocaleDateString('kk-KZ', options) + ' ' + date.toLocaleTimeString('kk-KZ')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(isClear(lang))

        try {
            const resultAction = await dispatch(fetchUpdate({
                username: username.toLowerCase().trim(),
                email: email.toLowerCase().trim(),
                avatar: avatar
            }));

            if (fetchUpdate.rejected.match(resultAction)) {
                const error = resultAction.payload;
                if (error.response && error.response.status >= 400) {
                    localStorage.setItem("register", JSON.stringify("error"))
                    dispatch(setIsOpenAlert())
                }
            } else {
                localStorage.setItem("register", JSON.stringify("update"));
                dispatch(setIsOpenAlert())
            }
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }

        if (inputFileRef.current) {
            inputFileRef.current.value = null;
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="font-open-sans">
                <span className="mini-phone:text-xl phone-sm:text-2xl dark:text-[#e0e0e0]">{t('my_account')}</span>
            </div>
            <div className="flex flex-col gap-4 font-open-sans">
                <span className="text-[#DB4444] dark:text-[#DB5555]
                    mini-phone:text-lg
                    phone-sm:text-2xl
                ">{t('ava')}</span>
                <img src={url + account?.profile_image} alt={account?.username} className="h-16 w-24 aspect-[5/5] object-contain flex-shrink-0"/>
                <input ref={inputFileRef} onChange={(e) => dispatch(handleAvatarChange({event: e}))} type="file" className="font-open-sans outline-none border-0 border-b-2 pb-1 w-full placeholder:tracking-wider file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-200 file:dark:bg-[#e3e3e3] dark:text-[#e4e4e4]" accept="image/*" autoComplete="off"/>
            </div>
            <div className="
                mini-phone:flex-col mini-phone:gap-10
                phone-xl:flex-col phone-xl:gap-10
            ">
                <div className="relative flex flex-col items-start gap-3 font-open-sans w-full mt-5">
                    {(usernameDirty && usernameError) && <div className="absolute top-1 right-0 font-open-sans text-sm text-red-600 -mb-5 ml-1">{usernameError}</div>}
                    <span className="text-[#DB4444] dark:text-[#DB5555]
                        mini-phone:text-base
                        phone-sm:text-xl
                    ">{t('username')}</span>
                    <input value={username} onChange={(e) => dispatch(handleUsernameChange({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type="text" name="username" placeholder={account?.username?.toUpperCase()} className="font-open-sans outline-none bg-slate-100 w-full p-3 placeholder:tracking-wider placeholder:overflow-ellipsis dark:bg-[#4a4a4a] dark:text-[#e9e9e9]
                        mini-phone:placeholder:text-xs
                        phone-sm:placeholder:text-base
                    " autoComplete="off" />
                </div>
                <div className="relative flex flex-col items-start gap-2 font-open-sans w-full mt-5">
                    {(emailDirty && emailError) && <div className="absolute top-1 right-0 font-open-sans text-sm text-red-600 -mb-5 ml-1">{emailError}</div>}
                    <span className="text-[#DB4444] dark:text-[#DB5555]
                        mini-phone:text-base
                        phone-sm:text-xl
                    ">{t('email')}</span>
                    <input value={email} onChange={(e) => dispatch(handleEmailChange({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type="email" name="email" placeholder={account?.email?.toUpperCase()} className="font-open-sans outline-none bg-slate-100 w-full p-3 placeholder:tracking-wider placeholder:overflow-ellipsis dark:bg-[#4a4a4a] dark:text-[#e9e9e9]
                        mini-phone:placeholder:text-xs
                        phone-sm:placeholder:text-base
                    " autoComplete="off" />
                </div>
                <div className="flex flex-col items-start font-open-sans w-full mt-5">
                    <span className="text-[#DB4444] dark:text-[#DB5555]
                        mini-phone:text-base
                        phone-sm:text-xl
                    ">{t('birthday')}</span>
                    <span className="font-open-sans outline-none text-2xl w-full p-3 tracking-wider dark:text-[#e0e0e0]
                        mini-phone:text-base
                        phone-sm:text-lg
                    ">
                        {account?.profile_date_of_birth?.toUpperCase()}
                    </span>
                </div>
                <div className="flex flex-col items-start font-open-sans w-full mt-5">
                    <span className="text-[#DB4444] dark:text-[#DB5555]
                        mini-phone:text-base
                        phone-sm:text-xl
                    ">{t('account_create')}</span>
                    <span className="font-open-sans outline-none text-2xl w-full p-3 tracking-wider dark:text-[#e0e0e0]
                        mini-phone:text-base
                        phone-sm:text-lg
                    ">
                        {formatDate(account?.date_joined, lang)}
                    </span>
                </div>
                <div className="flex mt-10">
                    <button disabled={!validation} type="submit" className="bg-[#DB4444] rounded-md text-white font-open-sans tracking-wider  disabled:bg-slate-400 disabled:cursor-not-allowed
                        mini-phone:text-base mini-phone:w-[183px] mini-phone:h-[50px]
                        phone-sm:text-lg phone-sm:w-[213px] phone-sm:h-[60px]
                    ">{t('save_change')}</button>
                </div>
            </div>
        </form>
    )
}

export default Account