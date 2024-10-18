import Delivery from "./Delivery"
import Guarantee from "./Guarantee"
import Service from "./Service"

const ServiceHighlights = () => {
    return (
        <div className="flex justify-evenly items-center mx-auto max-w-[1440px] mt-40 dark:text-[#e0e0e0]
            mini-phone:flex-col mini-phone:gap-16 mini-phone:mt-20
            tablet-sm:flex-row tablet-sm:gap-0 tablet-sm:mt-40
        ">
            <Delivery />
            <Service />
            {/* <Guarantee /> */}
        </div>
    )
}

export default ServiceHighlights