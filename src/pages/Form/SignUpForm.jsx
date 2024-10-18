import { Calendar } from 'antd';

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    handleAvatarChange,
    handleUsernameChange,
    handleEmailChange,
    handleBirthdayChange,
    handlePasswordChange,
    blurHandler,
    validIsTrue,
    validIsFalse,
    changeLanguage,
    appendErrorMessage,
    isClear,
    fetchSignUp } from "../../redux/redux-slice/registerSlice";
import { setIsOpenAlert } from '../../redux/redux-slice/menuSlice';

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
    const [isEye, setIsEye] = useState(false)
    const inputFileRef = useRef(null)
    const navigate = useNavigate()

    const avatar = useSelector((store) => store.register.avatar);

    const username = useSelector((store) => store.register.username);
    const usernameError = useSelector((store) => store.register.usernameError);
    const usernameDirty = useSelector((store) => store.register.usernameDirty);

    const email = useSelector((store) => store.register.email);
    const emailError = useSelector((store) => store.register.emailError);
    const emailDirty = useSelector((store) => store.register.emailDirty);

    const birthday = useSelector((store) => store.register.birthday);
    const birthdayError = useSelector((store) => store.register.birthdayError);
    const birthdayDirty = useSelector((store) => store.register.birthdayDirty);

    const password = useSelector((store) => store.register.password);
    const passwordError = useSelector((store) => store.register.passwordError);
    const passwordDirty = useSelector((store) => store.register.passwordDirty);

    const validation = useSelector((store) => store.register.validation);

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const lng = JSON.parse(localStorage.getItem("lang")) || "en";

    useEffect(() => {
        emailError || usernameError || birthdayError || passwordError ? dispatch(validIsFalse()) : dispatch(validIsTrue())
    }, [emailError, usernameError, birthdayError, passwordError])

    useEffect(() => {
        dispatch(changeLanguage(lng))
    }, [lng])

    const onPanelChange = (value) => {
        dispatch(handleBirthdayChange({date: value.format('YYYY-MM-DD')}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(isClear(lng))

        try {
            if (username.trim().length === 0 && email.trim().length === 0 && password.trim().length === 0) return;
            const resultAction = await dispatch(fetchSignUp({
                username: username.toLowerCase().trim(),
                email: email.toLowerCase().trim(),
                birthday: birthday,
                password: password.toLowerCase().trim(),
                avatar: avatar
            }));

            if (fetchSignUp.rejected.match(resultAction)) {
                const error = resultAction.payload;
                if (error.response && error.response.status >= 400) {
                    localStorage.setItem("register", JSON.stringify("error"));
                    dispatch(appendErrorMessage(error.response.data.username.join(' ')))
                    dispatch(setIsOpenAlert())
                }
            } else {
                localStorage.setItem("register", JSON.stringify("sign_up"));
                navigate("/registration/login");
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
        <form onSubmit={(e) => handleSubmit(e)} className="">
            <div className="flex flex-col gap-4">
                <span className="font-open-sans mini-phone:text-3xl phone-sm:text-5xl dark:text-[#e0e0e0]">{t('sign_up')}</span>
                <span className="font-open-sans font-medium tracking-wider mini-phone:text-xs phone-sm:text-base dark:text-[#e0e0e0]">{t('enter_detail')}</span>
            </div>
            <div className="flex flex-col gap-8 mt-10">
                <input ref={inputFileRef} onChange={(e) => dispatch(handleAvatarChange({event: e}))} type="file" className="font-open-sans outline-none border-0 border-b-2 pb-1 w-full dark:border-b-2 dark:border-[#e5e5e5] placeholder:tracking-wider file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-200 file:dark:bg-[#e3e3e3] dark:text-[#e4e4e4]" accept="image/*" autoComplete="off" required/>
                {(usernameDirty && usernameError) && <div className="font-open-sans text-sm text-red-600 -mb-5 ml-1">{usernameError}</div>}
                <input value={username} onChange={(e) => dispatch(handleUsernameChange({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type="text" name="username" placeholder={t('username')} className="font-open-sans outline-none border-0 border-b-2 py-1 pl-1 w-full placeholder:tracking-wider dark:bg-[#4a4a4a] dark:text-[#e9e9e9] dark:placeholder:text-[#e0e0e0] dark:py-3 dark:border-0" autoComplete="off"/>
                {(emailDirty && emailError) && <div className="font-open-sans text-sm text-red-600 -mb-5 ml-1">{emailError}</div>}
                <input value={email} onChange={(e) => dispatch(handleEmailChange({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type="email" name="email" placeholder={t('email')} className="font-open-sans outline-none border-0 border-b-2 py-1 pl-1 w-full placeholder:tracking-wider dark:bg-[#4a4a4a] dark:text-[#e9e9e9] dark:placeholder:text-[#e0e0e0] dark:py-3 dark:border-0" autoComplete="off"/>
                {(passwordDirty && passwordError) && <div className="font-open-sans text-sm text-red-600 -mb-5 ml-1">{passwordError}</div>}
                <div className="flex flex-col gap-4">
                    <span className="font-open-sans text-lg text-slate-400 tracking-wider dark:text-[#e9e9e9]">
                        Ваш год, месяц, день рождения
                    </span>
                    <div className="w-[300px] border rounded-md dark:border-0">
                        {(birthdayDirty && birthdayError) && <div className="font-open-sans text-sm text-red-600 -mb-5 ml-1">{birthdayError}</div>}
                        <Calendar 
                            fullscreen={false}
                            onChange={onPanelChange}
                        />
                    </div>
                </div>
                <div className="relative w-full">
                    <input value={password} onChange={(e) => dispatch(handlePasswordChange({event: e}))} onBlur={(e) => dispatch(blurHandler({event: e}))} type={isEye ? "text" : "password"} name="password" placeholder={t('password')} className="font-open-sans outline-none border-0 border-b-2 py-1 pl-1 w-full placeholder:tracking-wider dark:bg-[#4a4a4a] dark:text-[#e9e9e9] dark:placeholder:text-[#e0e0e0] dark:py-3 dark:border-0" autoComplete="off" />
                    { !isEye ? 
                        <span className="absolute top-1 dark:top-4 dark:text-[#e0e0e0] right-2 z-40 cursor-pointer font-open-sans text-xl" onClick={() => setIsEye(prev => !prev)}><FaRegEye /></span> :
                        <span className="absolute top-1 dark:top-4 dark:text-[#e0e0e0] right-2 z-40 cursor-pointer font-open-sans text-xl" onClick={() => setIsEye(prev => !prev)}><FaRegEyeSlash /></span>
                    }
                </div>
            </div>
            <div className="flex justify-between
                mini-phone:flex-col mini-phone:items-start mini-phone:gap-4 mini-phone:mt-8
                small-phone:flex-row small-phone:items-center small-phone:mt-12
            ">
                <button disabled={!validation} type="submit" className="bg-[#DB4444] dark:bg-[#BD5555] rounded-md text-white font-open-sans text-lg tracking-wider w-[213px] h-[56px] disabled:bg-slate-400 disabled:dark:bg-slate-500 disabled:cursor-not-allowed">{t('sign_up')}</button>
            </div>
        </form>
    )
}

export default SignUpForm