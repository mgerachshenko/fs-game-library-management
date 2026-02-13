import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import StoreToolbar from "../pages/StorePage/StoreToolbar/StoreToolbar";

export function Layout() {
    return(
        <>
            <Nav />
            <StoreToolbar />
            <Outlet />
            <Footer />
        </>
    )
}