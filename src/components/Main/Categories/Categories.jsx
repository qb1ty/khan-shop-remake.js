import { useDispatch, useSelector } from "react-redux";
import { fetchCategorie } from "../../../redux/redux-slice/categoriesSlice";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Categorie from "./Categorie";

const Categories = () => {
    const categories = useSelector((store) => store.categories.categories)
    const lang = useSelector((store) => store.lang.lang)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategorie())
    }, [])

    return (
        <>
            <div className="relative mb-2 mt-20">
                <div className="flex flex-wrap justify-start items-center gap-14 w-full">
                    {categories.map((category) => {
                        return (
                            <NavLink key={category.id} to={category.path} className="flex items-center justify-center border-2 border-slate-200 rounded-md w-[160px] h-[145px] cursor-pointer min-w-[160px] min-h-[145px] dark:border-[#3a3a3a]">
                                <Categorie {...category} lang={lang} /> 
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Categories