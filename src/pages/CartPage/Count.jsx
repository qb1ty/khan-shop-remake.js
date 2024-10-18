import { IoIosArrowUp } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchUpdateCart } from "../../redux/redux-slice/cartSlice";
import { setIsOpenAlert } from "../../redux/redux-slice/menuSlice";

const Count = ({ name, quantity }) => {
    const dispatch = useDispatch()

    const handleUpdateCart = async (name, quantity) => {
        if (quantity === 0 || quantity >= 100) {
            localStorage.setItem("register", JSON.stringify("error"))
            dispatch(setIsOpenAlert())   
        } else if (quantity >= 1) {
            await dispatch(fetchUpdateCart({ name, quantity }))
            await dispatch(fetchCart())
        }
    }

    const handleChange = async (name, e) => {
        if (+e.target.value === 0 || +e.target.value >= 100) {
            localStorage.setItem("register", JSON.stringify("error"))
            dispatch(setIsOpenAlert())

        } else if (+e.target.value >= 1) {
            await dispatch(fetchUpdateCart({ name, quantity: +e.target.value }))
            await dispatch(fetchCart())
        }
    }

    return (
        <div className="relative">
            <div className="flex flex-row-reverse items-center gap-3">
                <button type="button" className="bg-slate-100 rounded-lg p-1.5 text-lg dark:text-[#e0e0e0] dark:bg-[#4a4a4a]"
                    onClick={() => handleUpdateCart(name, ++quantity)}
                >
                    <IoIosArrowUp />
                </button>
                <input value={+quantity} onChange={(e) => handleChange(name, e)} className="text-center no-spinner bg-slate-100 rounded-lg outline-none min-w-[50px] w-[50px] max-w-[50px] py-1 dark:bg-[#4a4a4a] dark:text-[#e0e0e0]" min={1} max={99} />
                <button type="button" className="bg-slate-100 rounded-lg p-1.5 text-lg rotate-180 dark:text-[#e0e0e0] dark:bg-[#4a4a4a]"
                    onClick={() => handleUpdateCart(name, --quantity)}
                >
                    <IoIosArrowUp />
                </button>
            </div>
        </div>
    )
}
 
export default Count;