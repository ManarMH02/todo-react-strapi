import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function RootLayout() {
    return (
        <div className="">
            <Navbar />
            <div className="container md:px-5 flex justify-center items-center my-10 mx-auto">
                <Outlet/>
            </div>
        </div>
    )
}

export default RootLayout