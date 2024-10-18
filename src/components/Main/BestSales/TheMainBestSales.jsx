import BestSalesHead from "./BestSalesHead"
import BestSalesProducts from "./BestSalesProducts"
import ViewAllButton from "./ViewAllButton"

const TheMainBestSales = () => {
    return (
        <div className="relative pt-24 max-w-[1270px] mx-auto
            mini-phone:mx-10
            desktop:mx-auto
        ">
            <div className="flex justify-between items-end
                mini-phone:ml-2 mini-phone:flex-col mini-phone:gap-10 mini-phone:items-start
                mini-tablet:m-0
                pho-tab:flex-row pho-tab:items-end
            ">
                <BestSalesHead />
                <ViewAllButton />
            </div>
            <BestSalesProducts />
        </div>
    )
}

export default TheMainBestSales