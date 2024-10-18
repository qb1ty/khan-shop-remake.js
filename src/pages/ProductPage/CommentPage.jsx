import { url } from "../../redux/store";

import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux"
import { fetchProduct } from "../../redux/redux-slice/productsSlice";

import { CiEdit } from "react-icons/ci";

const Comment = () => {
    const product = useSelector((store) => store.products.product)

    const username = JSON.parse(localStorage.getItem("account")).toUpperCase()

    const comments = product?.comments
    const filterComments = comments?.filter((comment) => comment.text !== "")
    const sortedComments = filterComments?.sort((a, b) => {
        if (a.author.toUpperCase() === username) return -1
        if (b.author === username) return 1;
        return 0;
    });

    if (sortedComments?.length === 0) {
        return (
            <div className="flex justify-center mt-20">
                <span className="font-open-sans tracking-wider text-xl">Коментариев нет</span>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-around mt-20">
                <div className="flex flex-col gap-5 bg-white p-7 shadow-lg rounded-md dark:bg-[#4a4a4a] dark:text-[#e0e0e0]">
                    <span className="font-open-sans tracking-wider text-2xl">Коментарии товара</span>

                    <div className="flex flex-col gap-5">
                        {sortedComments?.map((comment) => {
                            return (
                                <span className="flex flex-col gap-3" key={comment.created_at}>
                                    <span className="font-open-sans tracking-wider text-lg">Автор: {comment.author.toUpperCase()}</span>
                                    <span className="font-open-sans tracking-wider text-lg">Коментарии:</span>
                                    <span className="flex items-center gap-3 font-open-sans tracking-wider text-sm outline-none bg-slate-100 p-2 dark:bg-[#5a5a5a]" >
                                        {comment.text}
                                        {username === comment.author.toUpperCase() && <span className="text-2xl cursor-pointer"><CiEdit /></span>}
                                    </span>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}

export default Comment