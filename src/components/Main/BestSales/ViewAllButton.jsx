import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { fetchBestSales, setLimit } from "../../../redux/redux-slice/bestSalesSlice"
import { useState } from "react"

const ViewAllButton = () => {
    const [isOpen, setIsOpen] = useState(true)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <>
            <button onClick={async () => {
                setIsOpen(prev => !prev)
                if (isOpen) {
                    await dispatch(setLimit({lim: 16}))
                    await dispatch(fetchBestSales())
                } else {
                    await dispatch(setLimit({lim: 4}))
                    await dispatch(fetchBestSales())
                }
            }} type="button" className="bg-[#DB4444] font-open-sans text-lg text-white rounded-md w-[189px] h-[56px] dark:bg-[#DB5555] dark:text-[#dark:text-[#e0e0e0]]">{isOpen ? t('view_all') : t('view_only_four')}</button>
        </>
    )
}

export default ViewAllButton