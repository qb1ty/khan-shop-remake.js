import { TiStarFullOutline } from 'react-icons/ti';
import { FaStarHalfAlt } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, fetchSlice } from '../../redux/redux-slice/salesSlice';
import { setIsOpenAlert } from '../../redux/redux-slice/menuSlice';
import { fetchBestSales } from '../../redux/redux-slice/bestSalesSlice';

const GenerateStars = ({average_rating, id, category}) => {
    const limit = useSelector((store) => store.best.limit)
    const dispatch = useDispatch()

    const steps = async (i, id, category) => {
        try {
            const response = await dispatch(fetchComment({i: i, id: id, category: category, text: ""}))
            if (fetchComment.rejected.match(response)) {
                const error = response.payload;
                
                if (error.response && error.response.status >= 400) {
                    if (error.status === 400) {
                        localStorage.setItem("register", JSON.stringify("error_rating_assigned"))
                    }
                    if (error.status === 401) {
                        localStorage.setItem("register", JSON.stringify("error_rating_unauthorized"))
                    }
                    if (error.status === 403) {
                        localStorage.setItem("register", JSON.stringify("error_rating_assigned"))
                    }

                    dispatch(setIsOpenAlert())
                }
            } else if (fetchComment.fulfilled.match(response)) {
                await dispatch(fetchSlice())
                if (limit === 4) await dispatch(fetchBestSales({lim: 4}))
                if (limit === 16) await dispatch(fetchBestSales({lim: 16}))
            }
        } catch (error) {
            console.error("Ошибка при оценке:", error);
        }
    }

    const stars = [];
    const fullStars = Math.floor(average_rating);
    const decimalPart = average_rating % 1;
    const hasHalfStar = decimalPart >= 0.2 && decimalPart < 0.8;
    const hasExtraFullStar = decimalPart >= 0.8;

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <span key={`full-${i}`} className="cursor-pointer font-open-sans text-yellow-500 text-lg" onClick={() => steps(i, id, category)} >
                <TiStarFullOutline />
            </span>
        );
    }

    if (hasHalfStar) {
        stars.push(
            <span key={`half-star`} className="cursor-pointer font-open-sans text-yellow-500 text-sm" onClick={() => steps(fullStars, id, category)} >
                <FaStarHalfAlt />
            </span>
        );
    }

    if (hasExtraFullStar && fullStars < 5) {
        stars.push(
            <span key={`extra-full-star`} className="cursor-pointer font-open-sans text-yellow-500 text-lg" onClick={() => steps(fullStars, id, category)} >
                <TiStarFullOutline />
            </span>
        );
    }

    const totalStars = stars.length;
    for (let i = totalStars; i < 5; i++) {
        stars.push(
            <span key={`empty-${i}`} className="cursor-pointer font-open-sans text-gray-300 text-lg" onClick={() => steps(i, id, category)}>
                <TiStarFullOutline />
            </span>
        );
    }

    return (
        <>
            {stars}
        </>
    );
};

export default GenerateStars