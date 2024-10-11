
import { ChangeEvent, useState } from 'react'
import ToDoSkeleton from '../components/ToDoSkeleton'
import Paginator from '../components/ui/Paginator'
import useAuthQuery from '../hooks/useAuthQuery'
import Button from "../components/ui/Button"
import axiosInstance from '../config/axios.config'
import { faker } from '@faker-js/faker'

function TodosPage() {
    const storageKey = 'loggedInUser'
    const userDataString = localStorage.getItem(storageKey)
    const userData = userDataString ? JSON.parse(userDataString) : null
    const [page, setPage] = useState<number>(1)
    const [generate, setGenerate] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [sortBy, setSortBy] = useState<string>('desc')

    const { isLoading, data, isFetching } = useAuthQuery({
        queryKey: [`${generate}`, `paginatedTodo-page-${page}`, `${pageSize}`, `${sortBy}`],
        url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
        config: {
            headers: { Authorization: `Bearer ${userData.jwt}` }
        }
    })

    /////////////Handlers///////////
    const GenerateHandler = async () => {
        for (let i = 0; i < 100; i++) {
            try {
                await axiosInstance.post(`/todos`,
                    {
                        data: {
                            title: faker.word.words(3)
                            , description: faker.word.words(20)
                            , user: [userData.user.id]
                        }
                    },
                    { headers: { Authorization: `Bearer ${userData.jwt}` } }
                )
                setGenerate(q => q + 1)
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    const onClickPrev = () => setPage(p => p - 1)
    const onClickNext = () => setPage(p => p + 1)
    const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)
    const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => setPageSize(+e.target.value)

    if (isLoading) {
        return (
            <div className="animate-pulse flex flex-col gap-2 w-full p-3 md:p-0">
                <div className='w-full md:w-1/2 md:mx-auto mx-auto my-4 flex justify-between'>
                    <div className="bg-gray-300 dark:bg-gray-300 text-gray-300 rounded-md w-32 h-9"></div>
                    <div className='space-x-2 flex'>
                    <div className="bg-gray-300 dark:bg-gray-300 text-gray-300 rounded-md w-24 h-9"></div>
                    <div className="bg-gray-300 dark:bg-gray-300 text-gray-300 rounded-md w-28 h-9"></div>
                    </div>
                </div>
                {Array.from({ length: 8 }, (_, i) => <ToDoSkeleton pagination key={i} />)}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 w-full p-3 md:p-0 my-4">
            <div className='w-full md:w-1/2 md:mx-auto mx-auto my-4 flex justify-between'>
                <Button size={'sm'} variant={'outline'} onClick={GenerateHandler}>
                    Generate Todos
                </Button>
                <div className='space-x-2'>
                    <select name="sortby" onChange={onChangeSortBy} value={sortBy} className='border border-indigo-600 text-indigo-600 p-2 rounded-md' >
                        <option value="" disabled>Sort By</option>
                        <option value="desc">Latest</option>
                        <option value="asc">Oldest</option>
                    </select>
                    <select name="pagesize" onChange={onChangePageSize} value={pageSize} className='border border-indigo-600 text-indigo-600 p-2 rounded-md'>
                        <option value="" disabled>Page Size</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
            {data.data.length ?
                data.data.map(({ id, title }: { id: number, title: string }) => (
                    <div key={id} className="flex justify-between items-center  w-full md:w-1/2 md:mx-auto  bg-gray-50/70 shadow-sm p-3 rounded-md">
                        <h3 className="font-semibold">{id} - {title}</h3>
                    </div>
                )) :
                <h3 className="text-center">No todos yet!</h3>
            }
            <div className='mt-5'>
                <Paginator
                    isLoading={isLoading || isFetching}
                    page={page}
                    pageCount={data.meta.pagination.pageCount}
                    total={data.meta.pagination.total}
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                />
            </div>
        </div>
    )
}

export default TodosPage