import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from "../../redux/redux-slice/productsSlice";

import ProductPage from "./ProductsPage"
import Comment from "./CommentPage"

const PersonalProduct = () => {
    const product = useSelector((store) => store.products.product)
    const dispatch = useDispatch()
    const { category, id } = useParams()

    useEffect(() => {
        dispatch(fetchProduct({
            slug: category,
            id: id
        }))
    }, [category, id])

    return (
        <div className="mt-20">
            <div className="max-w-[1440px] mx-auto">
                <ProductPage 
                    product={product}
                    category={category}
                    id={id}
                />

                <Comment 

                />
            </div>
        </div>
    )
}

export default PersonalProduct