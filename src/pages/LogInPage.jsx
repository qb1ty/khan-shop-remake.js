import LogInForm from "./Form/LogInForm"

const LogInPage = () => {
    return (
        <>
            <div className="mt-20">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="
                            mini-phone:w-0 mini-phone:h-0
                            pho-tab:w-[441px] pho-tab:h-[405px]
                            tablet-sm:w-[581px] tablet-sm:h-[605px]
                            des-lap:w-[781px] des-lap:h-[805px]
                        ">
                            <img src="/reg.webp" alt="register" className="aspect-[5/5] object-cover flex-shrink-0"/>
                        </div>
                        <div className="mx-auto">
                            <LogInForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogInPage