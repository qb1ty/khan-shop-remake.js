import { FaArrowRight } from "react-icons/fa6";

const ButtonsSwiper = ({ moveSwiper }) => {
    return (
        <div className="absolute pt-2
            mini-phone:top-88 mini-phone:right-16
            tablet:top-56 tablet:right-5
        ">
            <div className="flex items-center gap-4">
                <button onClick={() => moveSwiper('left')} className="cursor-pointer rotate-180 text-2xl bg-[#F5F5F5] rounded-full p-3 z-50">
                    <FaArrowRight />
                </button>
                <button onClick={() => moveSwiper('right')} className="cursor-pointer text-2xl bg-[#F5F5F5] rounded-full p-3 z-50">
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default ButtonsSwiper