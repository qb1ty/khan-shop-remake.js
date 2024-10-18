import { Empty } from 'antd';

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../redux/redux-slice/cartSlice"

import CartFooter from "./CartFooter"
import Product from "./Product"
import CartHead from "./CartHead"
import { useTranslation } from 'react-i18next';

import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
    const carts = useSelector((store) => store.cart.carts)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const refresh = JSON.parse(localStorage.getItem("refresh"))

    useEffect(() => {
        dispatch(fetchCart())
    }, [])

    const products = carts?.cart?.map((cart) => {
        const { product } = cart

        return (
            <Product 
                key={product.id}
                carts={carts}
                {...cart}
            />
        )
    })

    if (refresh) {
        if (carts?.cart?.length === 0) {
            return (
                <div className="max-w-[1440px] mx-auto">
                    <span className="flex justify-center items-center h-screen">
                        <span className="flex flex-col gap-4 text-9xl dark:text-[#e0e0e0]">
                            <FaShoppingCart />
                            <span className="font-open-sans tracking-wider text-xl text-center">
                                {t('cart_empty')}
                            </span>
                        </span>
                    </span>
                </div>
            )
        }
    } else return (
        <div className="max-w-[1440px] mx-auto">
            <span className="flex justify-center items-center h-screen">
                <span className="flex flex-col gap-4 text-9xl dark:text-[#e0e0e0]">
                    <FaShoppingCart />
                    <span className="font-open-sans tracking-wider text-xl text-center">
                        {t('cart_empty')}
                    </span>
                </span>
            </span>
        </div>
    )

    

    return (
        <div className="mt-20">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-14">
                    <CartHead />
                    {products}
                    <CartFooter totalPrice={carts?.total_price}/>
                </div> 
            </div>
        </div>
    )
}

export default Cart