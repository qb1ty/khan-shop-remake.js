import { IoMdArrowUp } from "react-icons/io";

const ButtonUp = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="relative cursor-pointer" onClick={scrollToTop}>
            <div className="flex justify-center items-center absolute right-5 -bottom-40 p-4 bg-slate-200 w-12 h-12 rounded-full">
                <span className="text-3xl">
                    <IoMdArrowUp />
                </span>
            </div>
        </div>
    )
}

export default ButtonUp