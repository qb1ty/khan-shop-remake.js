import { isChrome, isFirefox, isOpera, isEdge, isSafari } from 'react-device-detect';

import { useEffect, useRef } from "react"
import { fetchSlice, moveingSwiper, autoPlay, fetchComment } from "../../../redux/redux-slice/salesSlice";
import { fetchBestSales } from '../../../redux/redux-slice/bestSalesSlice';
import { setIsOpenAlert } from '../../../redux/redux-slice/menuSlice';
import { useSelector, useDispatch } from "react-redux"

import FlashSalesProduct from "./TheFlashSalesProduct"
import ButtonsSwiper from './ButtonsSwiper';

const FlashSalesProducts = () => {
    const status = useSelector((store) => store.sales.status)
    const sales = useSelector((store) => store.sales.sales)
    const timeoutId = useSelector((store) => store.sales.timeoutId)
    const dispatch = useDispatch()

    const container = useRef(null)
    const wrapper = useRef(null)
    const card = useRef(null)

    let swiperStyles = 'flex justify-center items-center max-w-full w-full overflow-hidden whitespace-nowrap';

    
    if (isFirefox) {
        swiperStyles += `
            mini-phone:max-w-[100vw] mini-phone:mx-auto
            mini-tablet:max-w-[75vw] mini-tablet:mx-auto
            phone:max-w-[64vw] phone:mx-auto
            small-phone:max-w-[53vw] small-phone:mx-auto
            phone-sm:max-w-[49vw] phone-sm:mx-auto
            pho:max-w-[90vw] pho:mx-auto
            phone-base:max-w-[83.5vw] phone-base:mx-auto
            phone-lg:max-w-[76.5vw] phone-lg:mx-auto
            phone-xl:max-w-[70vw] phone-xl:mx-auto
            phone-2xl:max-w-[65.5vw] phone-2xl:mx-auto
            pho-tab:max-w-[64vw] pho-tab:mx-auto 
            tablet-sm:max-w-[88.5vw] tablet-sm:mx-auto tablet-sm:overflow-hidden
            tablet-lg:max-w-[85vw] tablet-lg:mx-auto tablet-lg:overflow-hidden
            tablet:max-w-[82.5vw] tablet:overflow-hidden 
            laptop:max-w-[79vw] laptop:overflow-hidden
            laptop-lg:max-w-[76vw] laptop-lg:overflow-hidden
            laptop-xl:max-w-[74.5vw] laptop-xl:overflow-hidden
            des-lap:max-w-[70vw] des-lap:overflow-hidden
            des-lap-lg:max-w-[69.5vw] des-lap-lg:overflow-hidden
            desk:max-w-[67.5vw] desk:overflow-hidden
            desktop:max-w-[1280px] desktop:overflow-hidden
        `;
    } else if (isChrome) {
        swiperStyles += `
            mini-phone:max-w-[100vw] mini-phone:mx-auto
            mini-tablet:max-w-[75vw] mini-tablet:mx-auto
            phone:max-w-[64vw] phone:mx-auto
            small-phone:max-w-[53vw] small-phone:mx-auto
            phone-sm:max-w-[48vw] phone-sm:mx-auto
            pho:max-w-[90vw] pho:mx-auto
            phone-base:max-w-[83.5vw] phone-base:mx-auto
            phone-lg:max-w-[76.5vw] phone-lg:mx-auto
            phone-xl:max-w-[70vw] phone-xl:mx-auto
            phone-2xl:max-w-[65.5vw] phone-2xl:mx-auto
            pho-tab:max-w-[62.5vw] pho-tab:mx-auto 
            tablet-sm:max-w-[88.5vw] tablet-sm:mx-auto tablet-sm:overflow-hidden
            tablet-lg:max-w-[85vw] tablet-lg:mx-auto tablet-lg:overflow-hidden
            tablet:max-w-[82.5vw] tablet:overflow-hidden 
            laptop:max-w-[79vw] laptop:overflow-hidden
            laptop-lg:max-w-[76vw] laptop-lg:overflow-hidden
            laptop-xl:max-w-[74.5vw] laptop-xl:overflow-hidden
            des-lap:max-w-[71vw] des-lap:overflow-hidden
            des-lap-lg:max-w-[69.5vw] des-lap-lg:overflow-hidden
            desk:max-w-[67.5vw] desk:overflow-hidden
            desktop:max-w-[1270px] desktop:overflow-hidden
            
        `;
    } else if (isOpera) {
        swiperStyles += `
            mini-phone:max-w-[100vw] mini-phone:mx-auto
            mini-tablet:max-w-[75vw] mini-tablet:mx-auto
            phone:max-w-[64vw] phone:mx-auto
            small-phone:max-w-[53vw] small-phone:mx-auto
            phone-sm:max-w-[48vw] phone-sm:mx-auto
            pho:max-w-[90vw] pho:mx-auto
            phone-base:max-w-[85vw] phone-base:mx-auto
            phone-lg:max-w-[76.5vw] phone-lg:mx-auto
            phone-xl:max-w-[70vw] phone-xl:mx-auto
            phone-2xl:max-w-[65.5vw] phone-2xl:mx-auto
            pho-tab:max-w-[64vw] pho-tab:mx-auto 
            tablet-sm:max-w-[88.5vw] tablet-sm:mx-auto tablet-sm:overflow-hidden
            tablet-lg:max-w-[85vw] tablet-lg:mx-auto tablet-lg:overflow-hidden
            tablet:max-w-[82vw] tablet:overflow-hidden 
            laptop:max-w-[79vw] laptop:overflow-hidden
            laptop-lg:max-w-[76vw] laptop-lg:overflow-hidden
            laptop-xl:max-w-[73.5vw] laptop-xl:overflow-hidden
            des-lap:max-w-[72vw] des-lap:overflow-hidden
            des-lap-lg:max-w-[69.5vw] des-lap-lg:overflow-hidden
            desk:max-w-[67.5vw] desk:overflow-hidden
            desktop:max-w-[1270px] desktop:overflow-hidden
        `;
    } else if (isEdge) {
        swiperStyles += `
            mini-phone:max-w-[100vw] mini-phone:mx-auto
            mini-tablet:max-w-[75vw] mini-tablet:mx-auto
            phone:max-w-[64vw] phone:mx-auto
            small-phone:max-w-[53vw] small-phone:mx-auto
            phone-sm:max-w-[48vw] phone-sm:mx-auto
            pho:max-w-[90vw] pho:mx-auto
            phone-base:max-w-[83.5vw] phone-base:mx-auto
            phone-lg:max-w-[78.5vw] phone-lg:mx-auto
            phone-xl:max-w-[70vw] phone-xl:mx-auto
            phone-2xl:max-w-[65.5vw] phone-2xl:mx-auto
            pho-tab:max-w-[62vw] pho-tab:mx-auto 
            tablet-sm:max-w-[88.5vw] tablet-sm:mx-auto tablet-sm:overflow-hidden
            tablet-lg:max-w-[85vw] tablet-lg:mx-auto tablet-lg:overflow-hidden
            tablet:max-w-[80vw] tablet:overflow-hidden 
            laptop:max-w-[79vw] laptop:overflow-hidden
            laptop-lg:max-w-[76vw] laptop-lg:overflow-hidden
            laptop-xl:max-w-[73.5vw] laptop-xl:overflow-hidden
            des-lap:max-w-[71vw] des-lap:overflow-hidden
            des-lap-lg:max-w-[69.5vw] des-lap-lg:overflow-hidden
            desk:max-w-[67.5vw] desk:overflow-hidden
            desktop:max-w-[1270px] desktop:overflow-hidden
        `;
    } else if (isSafari) {
        swiperStyles += `
            mini-phone:max-w-[100vw] mini-phone:mx-auto
            mini-tablet:max-w-[75vw] mini-tablet:mx-auto
            phone:max-w-[65vw] phone:mx-auto
            small-phone:max-w-[55vw] small-phone:mx-auto
            phone-sm:max-w-[49vw] phone-sm:mx-auto
            pho:max-w-[90vw] pho:mx-auto
            phone-base:max-w-[83.5vw] phone-base:mx-auto
            phone-lg:max-w-[80vw] phone-lg:mx-auto
            phone-xl:max-w-[70vw] phone-xl:mx-auto
            phone-2xl:max-w-[65vw] phone-2xl:mx-auto
            pho-tab:max-w-[63vw] pho-tab:mx-auto 
            tablet-sm:max-w-[89vw] tablet-sm:mx-auto tablet-sm:overflow-hidden
            tablet-lg:max-w-[85vw] tablet-lg:mx-auto tablet-lg:overflow-hidden
            tablet:max-w-[84vw] tablet:overflow-hidden 
            laptop:max-w-[80vw] laptop:overflow-hidden
            des-lap:max-w-[73vw] des-lap:overflow-hidden
            desktop:max-w-[1270px] desktop:overflow-hidden
        `;
    }
    
    const moveSwiper = (direction) => {
        dispatch(moveingSwiper({
            direction,
            container: container.current,
            card: card.current,
            wrapper: wrapper.current
        }))
    }

    useEffect(() => {
        dispatch(fetchSlice())

        window.addEventListener('keydown', (event) => {
            if (event.key === "ArrowRight") moveSwiper("right")
            if (event.key === "ArrowLeft") moveSwiper("left")
        })
    }, [])

    return (
        <>
            <ButtonsSwiper moveSwiper={moveSwiper} />
            <div className="relative mb-2
                mini-phone:p-3 mini-phone:pt-20
            ">
                <div
                    ref={wrapper}
                    className={swiperStyles}
                    onMouseEnter={() => clearInterval(timeoutId)}
                    onMouseLeave={() => dispatch(autoPlay({ container: container.current, card: card.current }))}
                >
                    <div
                        ref={container}
                        className="relative flex justify-evenly items-center flex-nowrap gap-14 max-w-full w-full overflow-hidden scroll-smooth whitespace-nowrap"
                    >
                        {status === "Loading" ?
                            <div className='animate-spin mt-10'>
                                <img src="/loader.svg" alt="Loading..." className='h-16 w-16' />
                            </div>
                            : Array.isArray(sales) && sales.map((sale) => {
                                return (
                                    <FlashSalesProduct innerRef={card} key={sale.id} {...sale} />
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlashSalesProducts