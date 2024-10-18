import TheStorage from "./Carousel&List/TheStorage"
import TheMainFlashSales from "./FlashSales/TheMainFlashSales"
import TheMainCategories from "./Categories/TheMainCategories"
import TheMainBestSales from "./BestSales/TheMainBestSales"
import ServiceHighlights from "./CustomerAssurance/ServiceHighlights"
import ButtonUp from "./CustomerAssurance/ButtonUp"

const Main = () => {
    return (
        <main>
            <TheStorage />
            <TheMainFlashSales />
            <TheMainCategories />
            <TheMainBestSales />
            <ServiceHighlights />
            <ButtonUp />
        </main>
    )
}

export default Main