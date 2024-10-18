import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/redux-slice/productsSlice";
import { fetchComment } from "../../redux/redux-slice/salesSlice";
import Product from "../../components/Aside/Product";

const Shoes = ({ path }) => {
    const products = useSelector((store) => store.products.products)
    const status = useSelector((store) => store.products.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts(path))
    }, [])

    const steps = async (i, id, category) => {
        await dispatch(fetchComment({i: i, id: id, category: category, text: ""}))
        await dispatch(fetchProducts(path))
    }

    return (
        <div className="relative mb-2 mt-20 mx-auto">
            <div className="flex flex-wrap justify-start items-center gap-20 w-full" >
                {status === "Loading" ?
                    <div className='animate-spin my-52'>
                        <img src="/loader.svg" alt="Loading..." className='h-16 w-16' />
                    </div>
                : Array.isArray(products) && products.map((product) => {
                    return (
                        <Product key={product.id} {...product} steps={steps} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Shoes