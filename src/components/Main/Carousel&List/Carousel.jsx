import { RiArrowRightWideLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux"
import { addPagination, moveingSlide, changeSlide } from "../../../redux/redux-slice/carouselSlice"
import { useEffect, useRef } from "react"

const Carousel = () => {
    const sliders = useSelector((store) => store.carousel.sliders)
    const paginations = useSelector((store) => store.carousel.paginations)
    const dispatch = useDispatch()

    const containerRef = useRef(null)
    const slidebarRef = useRef(null)

    useEffect(() => {
        dispatch(addPagination())
    }, [])
    
    return (
        <div className="pt-10
            mini-phone:hidden
            mini-tablet:hidden
            phone:hidden
            pho:block
        ">
            <div ref={containerRef} className="relative flex justify-center items-center overflow-hidden w-[900px] h-[450px] mx-auto
                mini-phone:hidden
                mini-tablet:hidden
                pho:flex pho:w-[650px] pho:h-[330px]
                pho-tab:flex pho-tab:w-[850px] pho-tab:h-[420px]
                tablet:flex tablet:w-[850px] tablet:h-[420px]
                laptop:flex laptop:w-[900px] laptop:h-[450px]
            ">
                <button className="absolute -right-1 z-20 bottom-[43%] text-white text-4xl p-2
                    phone:text-2xl
                    pho-tab:text-3xl
                    tablet:text-4xl
                " onClick={() => dispatch(moveingSlide({
                    direction: "right",
                    slidebar: slidebarRef.current,
                    container: containerRef.current
                }))}>
                    <RiArrowRightWideLine/>
                </button>
                <button className="absolute -left-1 z-20 bottom-[43%] text-4xl text-white p-2 rotate-180
                    phone:text-2xl
                    pho-tab:text-3xl
                    tablet:text-4xl
                " onClick={() => dispatch(moveingSlide({
                    direction: "left",
                    slidebar: slidebarRef.current,
                    container: containerRef.current
                }))}>
                    <RiArrowRightWideLine />
                </button>
                <div ref={slidebarRef} className="flex justify-center items-center transition-transform duration-300 ease w-full h-full">
                    {sliders.map((slider) => {
                        return (
                            <img src={slider.image} alt={slider.title} key={slider.id} className="aspect-[10/5] object-cover flex-shrink-0 translate-x-full" />
                        )
                    })}
                </div>
                <div className="absolute flex justify-center items-center gap-2 bottom-3 right-[50%] translate-x-5
                    mini-phone:hidden
                    mini-tablet:hidden
                    phone:flex phone:bottom-2
                    pho-tab:flex pho-tab:bottom-2
                    tablet:flex tablet:bottom-5
                    laptop:flex laptop:bottom-2
                ">
                    {paginations.map((pagination) => {
                        return (
                            <span onClick={() => dispatch(changeSlide({
                                index: pagination.id,
                                slidebar: slidebarRef.current,
                                container: containerRef.current
                            }))} key={pagination.id} className={ pagination.active ? "w-4 h-4 bg-[#DB4444] border-2 border-white rounded-full cursor-not-allowed pho-tab:w-3.5 pho-tab:h-3.5 phone:w-3 phone:h-3" : "w-3 h-3 bg-slate-400 rounded-full cursor-pointer pho-tab:w-3 pho-tab:h-3 phone:w-2.5 phone:h-2.5" }></span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Carousel