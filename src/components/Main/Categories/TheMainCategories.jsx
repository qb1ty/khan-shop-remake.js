import Categories from "./Categories"
import CategoriesHead from "./CategoriesHead"

const TheMainCategories = () => {
    return (
        <div id="categories" className="relative pt-24 max-w-[1270px] 
            mini-phone:m-0
            mini-tablet:mx-10
            phone:mx-10
            small-phone:mx-24
            phone-base:mx-36
            phone-lg:mx-28
            pho-tab:mx-14
            tablet:mx-28
            laptop:mx-28
            desktop:mx-auto
        ">
            <div className="flex justify-start
                mini-phone:ml-2
                mini-tablet:m-0
            ">
                <CategoriesHead />
            </div>
            <Categories />
        </div>
    )
}

export default TheMainCategories