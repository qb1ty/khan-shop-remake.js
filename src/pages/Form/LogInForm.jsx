import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import {
    handleUsernameChange,
    handlePasswordChange,
    blurHandler,
    validIsTrue,
    validIsFalse,
    changeLanguage,
    isClear,
    appendErrorMessage,
    fetchLogIn
} from  "../../redux/redux-slice/registerSlice";
import { setIsOpenAlert } from '../../redux/redux-slice/menuSlice';

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const LogInForm = () => {
    const [isEye, setIsEye] = useState(false)
    
    const username = useSelector((store) => store.register.username);
    const usernameError = useSelector((store) => store.register.usernameError);
    const usernameDirty = useSelector((store) => store.register.usernameDirty);


    const password = useSelector((store) => store.register.password);
    const passwordError = useSelector((store) => store.register.passwordError);
    const passwordDirty = useSelector((store) => store.register.passwordDirty);

    const validation = useSelector((store) => store.register.validation);
    const dispatch = useDispatch()

    const { t } = useTranslation()
    const naviagte = useNavigate()

    const lng = JSON.parse(localStorage.getItem("lang")) || "en";

    useEffect(() => {
        usernameError || passwordError ? dispatch(validIsFalse()) : dispatch(validIsTrue())
    }, [usernameError, passwordError])

    useEffect(() => {
        dispatch(changeLanguage(lng))
    }, [lng])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(isClear(lng))

        try {
            if (username.trim().length === 0 && password.trim().length === 0) return;
            const resultAction = await dispatch(fetchLogIn({
                username: username.toLowerCase().trim(),
                password: password.toLowerCase().trim()
            }));

            if (fetchLogIn.rejected.match(resultAction)) {
                const error = resultAction.payload;
                if (error.response && error.response.status >= 400) {
                    localStorage.setItem("register", JSON.stringify("error"));
                    dispatch(appendErrorMessage(error.response.data.detail))
                    dispatch(setIsOpenAlert())
                }
            } else {
                localStorage.setItem("register", JSON.stringify("log_in"));
                naviagte("/account/personal")
                dispatch(setIsOpenAlert())
            }
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
            <div className="flex flex-col gap-4">
                <span className="font-open-sans mini-phone:text-4xl phone-sm:text-5xl dark:text-[#e0e0e0]">{t('log_in')}</span>
                <span className="font-open-sans font-medium tracking-wider mini-phone:text-xs phone-sm:text-base dark:text-[#e0e0e0]">{t('enter_detail')}</span>
            </div>
            <div className="flex flex-col gap-8 mt-10">
                {(usernameDirty && usernameError) && <div className="font-open-sans text-sm text-red-600 -mb-5 ml-1">{usernameError}</div>}
                <input value={username} onChange={(e) => dispatch(handleUsernameChange({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type="text" name="username" placeholder={t('username')} className="font-open-sans outline-none border-0 border-b-2 py-1 pl-1 w-full placeholder:tracking-wider dark:bg-[#4a4a4a] dark:border-b-0 dark:py-3 dark:text-[#e0e0e0] dark:placeholder:text-[#e0e0e0]" autoComplete="off"/>
                {(passwordDirty && passwordError) && <div className="font-open-sans text-sm text-red-600 -mb-5 ml-1">{passwordError}</div>}
                <div className="relative w-full">
                    <input value={password} onChange={(e) => dispatch(handlePasswordChange({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type={isEye ? "text" : "password"} name="password" placeholder={t('password')} className="font-open-sans outline-none border-0 border-b-2 py-1 pl-1 w-full placeholder:tracking-wider dark:bg-[#4a4a4a] dark:border-b-0 dark:py-3 dark:text-[#e0e0e0] dark:placeholder:text-[#e0e0e0]" autoComplete="off"/>
                    { !isEye ? 
                        <span className="absolute top-1.5 dark:top-3.5 right-2 z-40 cursor-pointer font-open-sans text-xl dark:text-[#e0e0e0]" onClick={() => setIsEye(prev => !prev)}><FaRegEye /></span> :
                        <span className="absolute top-1.5 dark:top-3.5 right-2 z-40 cursor-pointer font-open-sans text-xl dark:text-[#e0e0e0]" onClick={() => setIsEye(prev => !prev)}><FaRegEyeSlash /></span>
                    }
                </div>
            </div>
            <div className="flex justify-between
                mini-phone:flex-col mini-phone:items-start mini-phone:gap-4 mini-phone:mt-8
                small-phone:flex-row-reverse small-phone:items-center small-phone:mt-12
            ">
                <button type="button" className="font-open-sans text-[#DB4444] dark:text-[#BD5555] text-lg tracking-wider">{t('forget_password')}</button>
                <button disabled={!validation} type="submit" className="bg-[#DB4444] dark:bg-[#BD5555] rounded-md text-white font-open-sans text-lg tracking-wider w-[143px] h-[56px] disabled:bg-slate-400 disabled:dark:bg-slate-500 disabled:cursor-not-allowed">{t('log_in')}</button>
            </div>
        </form>
    )
}

export default LogInForm