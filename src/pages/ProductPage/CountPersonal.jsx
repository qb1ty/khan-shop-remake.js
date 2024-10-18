const CountPersonal = () => {
    return (
        <div>
            <div className="flex items-center">
                <button className="border border-slate-200 bg-slate-200 py-1 px-3 text-xl rounded-l-sm dark:text-black">-</button>
                <input value={1} onChange={() => console.log("dsa")} type="number" className="no-spinner outline-none text-center w-[70px] dark:bg-[#1a1a1a]" />
                <button className="border border-[#DB4444] bg-[#DB4444] py-1 px-3 text-xl text-white rounded-r-sm dark:bg-[#DB5555]">+</button>
            </div>
        </div>
    )
}

export default CountPersonal