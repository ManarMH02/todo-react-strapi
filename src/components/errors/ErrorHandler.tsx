import { MdOutlineReportGmailerrorred } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"

interface IProps {
    statusCode?: number,
    errorTitle?: string
}

function ErrorHandler({ statusCode = 500, errorTitle = 'Server Error' }: IProps) {
    const { pathname } = useLocation();
    return (
        <div className="container mx-auto flex flex-col inset-0 gap-3 fixed text-center justify-center items-center">
            <MdOutlineReportGmailerrorred className="text-9xl text-indigo-600"/>
            <h2 className="text-6xl text-indigo-600">{statusCode} - {errorTitle}</h2>
            <p className="font-extralight">
                Oops! Something Went Wrong, try refresh the Page. <br />
                Feel free to contact us if the problem persists.
            </p>
            <div className="flex gap-3 items-center text-white">
                <Link to='/' reloadDocument  className="px-3 py-2 bg-indigo-600 rounded-md">Home</Link>
                <Link to={pathname} reloadDocument className="px-3 py-2 bg-green-700 rounded-md">Refresh</Link>
            </div>
        </div>
    )
}

export default ErrorHandler