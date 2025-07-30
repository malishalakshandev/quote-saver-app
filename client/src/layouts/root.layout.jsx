import NavigationBar from "@/components/NavigationBar";
import { Outlet } from "react-router";

const RootLayout = () => {

    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );

}

export default RootLayout;