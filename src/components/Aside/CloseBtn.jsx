import { MdClose } from "react-icons/md";

const CloseBtn = ({ click }) => {
    return (
        <div onClick={() => click()} className="absolute top-1.5 right-2 text-2xl p-1 cursor-pointer rounded-full bg-transparent text-black transition-all duration-200 hover:scale-110 mini-phone:text-lg phone-sm:text-2xl">
            <MdClose />
        </div>
    )
}

export default CloseBtn