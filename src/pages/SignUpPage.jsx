import SignUpForm from "./Form/SignUpForm"

const SignUpPage = () => {    
    return (
        <>
            <div className="mt-20">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="
                            mini-phone:w-0 mini-phone:h-0
                            pho-tab:w-0 pho-tab:h-0
                            tablet-sm:w-[581px] tablet-sm:h-[705px]
                            des-lap:w-[781px] des-lap:h-[905px]
                        ">
                            <img src="/reg.webp" alt="register" className="aspect-[5/5] object-cover flex-shrink-0"/>
                        </div>
                        <div className="mx-auto">
                            <SignUpForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage