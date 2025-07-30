import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Link, NavLink } from "react-router";

const NavigationBar = () => {

    const { signOut } = useClerk();

    const handleSignOut = async () => {
        await signOut({ redirectUrl: "/" });
    }

    return (
        <section className="w-full flex justify-center mt-[30px]">
            <SignedIn>
                <nav className="flex gap-[40px]">
                    {
                        [
                            {
                            path: "/my-quotes",
                            label: "My Quotes",
                            },
                            {
                            path: "/add-quote",
                            label: "Add Quote",
                            }
                        ].map((item) => {
                            return (
                            <NavLink
                                key={ item.path }
                                to={ item.path }
                                className={({ isActive }) =>
                                    `font-protest-regular hover:text-[#73A1BE] ${ isActive ? "text-[#73A1BE]" : "" }`
                                }
                                >
                                { item.label }
                            </NavLink>
                            );
                        })
                    }

                    <NavLink
                        onClick={handleSignOut}
                        className="font-protest-regular hover:text-[#73A1BE]">
                            Logout
                    </NavLink>

                </nav>
            </SignedIn>

            <SignedOut>
                <nav className="flex gap-[40px]">
                    <NavLink 
                        to="/"
                        className={({ isActive }) =>
                            `font-protest-regular hover:text-[#73A1BE] ${ isActive ? "text-[#73A1BE]" : "" }`
                        }
                        >
                        Public Quotes
                    </NavLink>
                    <NavLink 
                        to="/sign-in"
                        className="font-protest-regular hover:text-[#73A1BE]">
                        Sign In
                    </NavLink>
                    <NavLink 
                        to="/sign-up"
                        className="font-protest-regular hover:text-[#73A1BE]">
                        Sign Up
                    </NavLink>
                </nav>
            </SignedOut>
            
        </section>
    );


}

export default NavigationBar;