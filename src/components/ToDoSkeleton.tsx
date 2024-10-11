interface Iprops {
    pagination?: boolean
}

function ToDoSkeleton({ pagination }: Iprops) {
    return (
        <div className="animate-pulse flex items-center justify-between w-full md:w-1/2 md:mx-auto  bg-gray-50/70 shadow-sm p-3 rounded-md">
            <div className="w-40 h-3 bg-gray-200 rounded-sm dark:bg-gray-300"></div>
            {
                !pagination &&
                <div className="flex space-x-2">
                    <div className=" bg-gray-300 dark:bg-gray-300 text-gray-300 w-10 h-10 rounded-full"></div>
                    <div className=" bg-gray-300 dark:bg-gray-300 text-gray-300 w-10 h-10 rounded-full"></div>
                </div>
            }

        </div>
    )
}

export default ToDoSkeleton