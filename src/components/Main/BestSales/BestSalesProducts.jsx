import { useEffect } from "react"

import { fetchBestSales } from "../../../redux/redux-slice/bestSalesSlice";
import { setIsOpenAlert } from "../../../redux/redux-slice/menuSlice";
import { fetchComment, fetchSlice } from "../../../redux/redux-slice/salesSlice";
import { useDispatch, useSelector } from "react-redux"

import BestSalesProduct from "./BestSalesProduct"

const BestSalesProducts = () => {
    const limit = useSelector((store) => store.best.limit)
    const populars = useSelector((store) => store.best.populars)
    const status = useSelector((store) => store.best.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBestSales())
    }, [])

    

    return (
        <>
            <div className="relative mb-2 mt-20">
                <div className="flex flex-wrap justify-evenly items-center gap-10 max-w-[1270px] w-full mx-auto" >
                    {status === "Loading" ?
                        <div className='animate-spin mt-10'>
                            <img src="/loader.svg" alt="Loading..." className='h-16 w-16' />
                        </div>
                    : Array.isArray(populars) && populars.map((popular) => {
                        return (
                            <BestSalesProduct key={popular.id} {...popular} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BestSalesProducts