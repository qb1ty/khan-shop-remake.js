import NavElement from "./NavElement"

const NavList = () => {
    return (
        <ul className="flex justify-center items-end gap-14 font-open-sans text-xl
            mini-phone:hidden
            mini-tablet:hidden
            phone:hidden
            pho:flex pho:gap-5 pho:text-base
            pho-tab:flex pho-tab:gap-8 pho-tab:text-lg
            tablet:flex tablet:gap-8 tablet:text-lg
            latptop:flex laptop:gap-10 laptop:text-xl
            desktop:flex desktop:gap-14 desktop:text-xl
            4k:flex 4k:gap-16 4k:text-xl
            8k:flex 8k:gap-20 8k:text-2xl
            12k:flex 12k:gap-24 12k:text-2xl
        ">
            <NavElement />
        </ul>
    )
}

export default NavList