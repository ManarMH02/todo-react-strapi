import toast from "react-hot-toast"
import { NavLink, useLocation } from "react-router-dom"
import Button from "./ui/Button"


function Navbar() {
    const storageKey = 'loggedInUser'
    const userDataString = localStorage.getItem(storageKey)
    const userData = userDataString ? JSON.parse(userDataString) : null
    const { pathname } = useLocation()

    const onLogout = () => {
        localStorage.removeItem(storageKey);
        toast.success('Logout succeeded!', { className: 'toast', duration: 1400 });
        setTimeout(() => location.replace(pathname), 1500)
    }

    return (
        <nav className="p-3  bg-gray-50/50 shadow-sm  text-indigo-600">
            <div className="flex justify-between px-3 items-center w-full md:w-1/2 mx-auto">
                <ul className="flex gap-10">
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                </ul>
                {
                    userData ?
                        <div className="flex gap-4 items-center">
                            <NavLink to='/profile'>Profile</NavLink>
                            <NavLink to='/todos'>Todos List</NavLink>
                            <Button className="cursor-pointer" onClick={onLogout} size={'sm'}>Logout</Button>
                        </div>
                        :
                        <ul className="flex gap-4">
                            <li>
                                <NavLink to='/login'>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to='/register'>Register</NavLink>
                            </li>
                        </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar