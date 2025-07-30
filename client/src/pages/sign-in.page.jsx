import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {

    return (
        <main className="min-h-screen w-full bg-[#FFFFFF] rounded-2xl flex flex-row justify-center items-center">
            <SignIn 
                redirectUrl="/my-quotes"
                appearance={{
                    elements: {
                        formFieldInput: '!py-[22px] !rounded-full',
                        formButtonPrimary: '!bg-[#323232] !py-[12px] !rounded-full',
                    },
                }}
            />
        </main>
    );

}

export default SignInPage;