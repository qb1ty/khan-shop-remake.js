import { PiMonitor } from "react-icons/pi";
import { IoPhonePortraitOutline, IoGameControllerOutline, IoCameraOutline, IoBagHandleOutline, IoLogoPlaystation } from "react-icons/io5";
import { MdOutlineChair } from "react-icons/md";
import { BsGpuCard } from "react-icons/bs";
import { GiClothes, GiConverseShoe, GiLaptop, GiHealthPotion, GiHealthNormal } from "react-icons/gi";
import { FaBasketball } from "react-icons/fa6";

const iconsMap = {
    Smartphones: <IoPhonePortraitOutline className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Peripherals: <PiMonitor className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Cameras: <IoCameraOutline className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Furniture: <MdOutlineChair className="h-12 w-12 dark:text-[#e0e0e0]" />,
    Gamepads: <IoGameControllerOutline className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Components: <BsGpuCard className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Clothes: <GiClothes className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Bags: <IoBagHandleOutline className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Shoes: <GiConverseShoe className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Notebooks: <GiLaptop className="w-12 h-12 dark:text-[#e0e0e0]" />,
    PlayStation: <IoLogoPlaystation className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Health: <GiHealthPotion className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Medecine: <GiHealthNormal className="w-12 h-12 dark:text-[#e0e0e0]" />,
    Toys: <FaBasketball className="w-12 h-12 dark:text-[#e0e0e0]" />,
};

const Categorie = ({name_en, name_ru, name_kk, lang}) => {
    const nameMap = {
        ru: name_ru,
        en: name_en,
        kk: name_kk,
    };

    return (
        <div className="relative flex flex-col items-center gap-5 dark:text-[#e0e0e0]">
            {iconsMap[name_en] || ""}
            <span className="font-open-sans text-center text-lg">{nameMap[lang] || name_en}</span>
        </div>    
    )
}

export default Categorie