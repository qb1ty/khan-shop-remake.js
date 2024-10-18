import TheMainList from "./TheMainList"
import Carousel from "./Carousel"

const TheStorage = () => {
    return (
        <div className="flex justify-evenly max-w-[1440px] mx-auto">
            <TheMainList />
            <Carousel />
        </div>
    )
}

export default TheStorage