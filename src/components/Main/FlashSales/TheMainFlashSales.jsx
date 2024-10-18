import FlashSalesHead from "./FlashSalesHead"
import TimerSales from "./TimerSales";
import FlashSalesProducts from "./FlashSalesProducts";

const TheMainFlashSales = () => {
    return (
        <div className="relative max-w-[1275px] mx-auto pb-20
            mini-phone:pt-20
            pho:pt-32
        ">
            <div className="flex justify-start items-end
                mini-phone:ml-2 mini-phone:flex-col mini-phone:items-center mini-phone:gap-10
                mini-tablet:mx-10
                phone:mx-20
                phone-lg:flex-row phone-lg:items-end phone-lg:gap-0
                pho-tab:mx-20
                tablet:mx-20
                laptop:mx-20
                desktop:mx-0
            ">
                <FlashSalesHead />
                {/* <TimerSales /> */}
            </div>
            <FlashSalesProducts />
        </div>
    )
}

export default TheMainFlashSales