import { useSelector, useDispatch } from "react-redux"
import { updateCount } from "../../../redux/redux-slice/timerSlice";
import { fetchSlice } from "../../../redux/redux-slice/salesSlice";
import { useEffect } from "react";

const TimerSales = () => {
    const isEnd = useSelector((store) => store.timer.isEnd)
    const days = useSelector((store) => store.timer.days)
    const hours = useSelector((store) => store.timer.hours)
    const minutes = useSelector((store) => store.timer.minutes)
    const seconds = useSelector((store) => store.timer.seconds)
    const salesTimeEnd = useSelector((store) => store.sales.salesTimeEnd)
    const lang = useSelector((store) => store.lang.lang)
    const dispatch = useDispatch()

    const dayEn = days === null ? 'Day' : days > 1 ? 'Days' : 'Day'
    const hourEn = hours === null ? 'Hour' : hours > 1 ? 'Hours' : 'Hour'
    const minuteEn = minutes === null ? 'Minute' : minutes > 1 ? 'Minutes' : 'Minute'
    const secondEn = seconds === null ? 'Second' : seconds > 1 ? 'Seconds' : 'Second'

    const dayRu = days === null ? 'День' : days > 1 && days < 5 ? 'Дня' : days >= 5 ?  'Дней' : 'День'
    const hourRu = hours === null ? 'Час' : hours > 1 ? 'Часа' : 'Час'
    const minuteRu = minutes === null ? 'Минута' : minutes > 1 && minutes < 5 ? 'Минуты' : minutes >= 5 ? 'Минут' : 'Минута'
    const secondRu = seconds === null ? 'Секунда' : seconds > 1 && seconds < 5 ? 'Секунды' : seconds >= 5 ? 'Секунд' : 'Секунда'

    const dayKk = days === null ? 'Күн' : days > 1 ? 'Күн' : 'Күн'
    const hourKk = hours === null ? 'Сағат' : hours > 1 ? 'Сағат' : 'Сағат'
    const minuteKk = minutes === null ? 'Минут' : minutes > 1 ? 'Минут' : 'Минут'
    const secondKk = seconds === null ? 'Секунд' : seconds > 1 ? 'Секунд' : 'Секунд'

    useEffect(() => {
        if (isEnd === true) {
            dispatch(fetchSlice())
        }
    }, [isEnd])

    useEffect(() => {
        const timerId = setInterval(() => {
            dispatch(updateCount({
                timerId: timerId,
                date: new Date(salesTimeEnd)
            }))
        }, 1000)
    }, [seconds])
    

    return (
        <div className="flex items-center gap-4
            mini-phone:mr-auto
            phone-lg:pl-36
            laptop-xl:pl-60
        ">
            <div className="flex flex-col gap-1">
                <span className="font-open-sans font-medium mini-tablet-lg:text-sm dark:text-[#e0e0e0]
                    mini-phone:text-base
                ">{lang === "eu" ? dayEn : lang === "ru" ? dayRu : lang === "kk" ? dayKk : dayEn}</span>
                <span className="mini-tablet-lg:text-4xl font-bold font-dm-sans dark:text-[#e0e0e0]
                    mini-phone:text-2xl
                ">{days === null ? '00' : days < 10 ? `0${days}`: days}</span>
            </div>
            <span className="font-medium mini-tablet-lg:text-4xl leading-tight text-[#E07575]
                mini-phone:text-3xl mini-phone:-mb-2
            ">:</span>
            <div className="flex flex-col gap-1">
                <span className="font-open-sans font-medium mini-tablet-lg:text-sm dark:text-[#e0e0e0]
                    mini-phone:text-base
                ">{lang === "eu" ? hourEn : lang === "ru" ? hourRu : lang === "kk" ? hourKk : hourEn}</span>
                <span className="mini-tablet-lg:text-4xl font-bold font-dm-sans dark:text-[#e0e0e0]
                    mini-phone:text-2xl
                ">{hours === null ? '00' : hours < 10 ? `0${hours}`: hours}</span>
            </div>
            <span className="font-medium mini-tablet-lg:text-4xl leading-tight text-[#E07575]
                mini-phone:text-3xl mini-phone:-mb-2
            ">:</span>
            <div className="flex flex-col gap-1">
                <span className="font-open-sans font-medium mini-tablet-lg:text-sm dark:text-[#e0e0e0]
                    mini-phone:text-base
                ">{lang === "eu" ? minuteEn : lang === "ru" ? minuteRu : lang === "kk" ? minuteKk : minuteEn}</span>
                <span className="mini-tablet-lg:text-4xl font-bold font-dm-sans dark:text-[#e0e0e0]
                    mini-phone:text-2xl
                ">{minutes === null ? '00' : minutes < 10 ? `0${minutes}`: minutes}</span>
            </div>
            <span className="font-medium mini-tablet-lg:text-4xl leading-tight text-[#E07575]
                mini-phone:text-3xl mini-phone:-mb-2
            ">:</span>
            <div className="flex flex-col gap-1">
                <span className="font-open-sans font-medium mini-tablet-lg:text-sm dark:text-[#e0e0e0]
                    mini-phone:text-base
                ">{lang === "eu" ? secondEn : lang === "ru" ? secondRu : lang === "kk" ? secondKk : secondEn}</span>
                <span className="mini-tablet-lg:text-4xl font-bold font-dm-sans dark:text-[#e0e0e0]
                    mini-phone:text-2xl
                ">{seconds === null ? '00' : seconds < 10 ? `0${seconds}`: seconds}</span>
            </div>
        </div>
    )
}

export default TimerSales