import { TbPhoneCall } from "react-icons/tb";
import { CiMail } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ContactPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [text, setText] = useState('')
    const { t } = useTranslation()

    return (
        <div className="mt-20">
            <div className="max-w-[1440px] mx-auto">
                <div className="relative flex justify-center items-start gap-10 px-10">
                    <div className="bg-white shadow-lg p-8 mini-phone:hidden laptop:block dark:bg-[#3a3a3a]">
                        <div className="flex flex-col gap-6 border-b pb-7 border-b-black dark:border-b-[#4a4a4a]">
                            <span className="flex items-center gap-7 font-open-sans tracking-wider text-xl font-bold dark:text-[#e0e0e0]">
                                <span className="text-3xl p-3 bg-red-500 text-white rounded-full dark:bg-[#DB5555] dark:text-[#e0e0e0]">
                                    <TbPhoneCall  />
                                </span>
                                {t('call')}
                            </span>
                            <span className="font-open-sans tracking-wider text-sm dark:text-[#e0e0e0]">{t('7w')}</span>
                            <span className="font-open-sans tracking-wider text-sm dark:text-[#e0e0e0]">{t('phone')}: +7 771 216 9309</span>
                        </div>
                        <div className="flex flex-col gap-6 pt-7 mini-phone:h-[70%] laptop:w-full">
                            <span className="flex items-center gap-7 font-open-sans tracking-wider text-xl font-bold dark:text-[#e0e0e0]">
                                <span className="text-3xl p-3 bg-red-500 text-white rounded-full dark:bg-[#DB5555] dark:text-[#e0e0e0]">
                                    <CiMail  />
                                </span>
                                {t('write')}
                            </span>
                            <span className="font-open-sans tracking-wider text-sm dark:text-[#e0e0e0]">{t('24h')}</span>
                            <span className="font-open-sans tracking-wider text-sm dark:text-[#e0e0e0]">{t('email')}: arsenbro0707@mail.ru</span>
                            <span className="font-open-sans tracking-wider text-sm dark:text-[#e0e0e0]">{t('email')}: saparbekarsen07@gmail.com</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 mini-phone:w-full phone-lg:w-[80%]">
                        <div className="flex items-center gap-5 mini-phone:flex-col phone-base:flex-row">
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder={t('username')} className="font-open-sans tracking-wider bg-slate-100 px-2 py-3 outline-none text-xm w-full dark:bg-[#3a3a3a] dark:text-[#e0e0e0] placeholder:dark:text-[#e0e0e0]" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder={t('email')} className="font-open-sans tracking-wider bg-slate-100 px-2 py-3 outline-none text-xm w-full dark:bg-[#3a3a3a] dark:text-[#e0e0e0] placeholder:dark:text-[#e0e0e0]" />
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder={t('phone')} className="font-open-sans tracking-wider bg-slate-100 px-2 py-3 outline-none text-xm w-full dark:bg-[#3a3a3a] dark:text-[#e0e0e0] placeholder:dark:text-[#e0e0e0]" />
                        </div>
                        <div>
                            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="..." className="font-open-sans tracking-wider bg-slate-100 px-2 py-2 w-full outline-none text-sm dark:bg-[#3a3a3a] dark:text-[#e0e0e0] placeholder:dark:text-[#e0e0e0]" rows="10"></textarea>
                        </div>
                        <div className="absolute mini-phone:-bottom-14 laptop:bottom-0"
                            onClick={() => {
                                setTimeout(() => {
                                    setUsername('')
                                    setEmail('')
                                    setPhone('')
                                    setText('')
                                }, 1000)
                            }}
                        >
                            <a href={`mailto:arsenbro0707@mail.ru?body=${username} || ${email} || ${phone} || ${text}&subject=Нужна помощь`} className="flex justify-center items-center cursor-pointer bg-[#DB4444] py-3 w-[200px] text-white font-open-sans tracking-wider rounded-sm dark:bg-[#DB5555] dark:text-[#e0e0e0]">Send message</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage