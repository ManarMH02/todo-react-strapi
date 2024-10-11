import Button from "./ui/Button"
import useAuthQuery from "../hooks/useAuthQuery"
import Modal from "./ui/Modal"
import Input from "./ui/Input"
import Textarea from "./ui/TextArea"
import { ChangeEvent, FormEvent, useState } from "react"
import { ITodo } from "../interfaces"
import axiosInstance from "../config/axios.config"
import { TodoSchema } from "../validation"
import InputErrorMsg from "./ui/InputErrorMsg"
import toast from "react-hot-toast"
import ToDoSkeleton from "./ToDoSkeleton"
import { MdOutlineDelete } from "react-icons/md"
import { FiEdit } from "react-icons/fi"
import { IoMdAdd } from "react-icons/io"
import { faker } from '@faker-js/faker'


function ToDoList() {
    const storageKey = 'loggedInUser'
    const userDataString = localStorage.getItem(storageKey)
    const userData = userDataString ? JSON.parse(userDataString) : null
    const [queryVersion, setQueryVersion] = useState(1)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
    })
    const [selectedTodo, setSelectedTodo] = useState<ITodo>({
        id: 0,
        title: '',
        description: '',
        documentId: ''
    })
    const [errorMsgs, setErrorMsgs] = useState({ title: '', description: '' })
    const [isUpdating, setIsUpdating] = useState(false);

    const { isLoading, data } = useAuthQuery({
        queryKey: ['todosList', `${queryVersion}`],
        url:  `/users/me?populate=todos`,
        config: {
            headers: { Authorization: `Bearer ${userData.jwt}` }
        }
    })


    ////// HANDLERS //////
    const onOpenAddModal = () => {
        setIsAddModalOpen(true)
    }
    const onCloseAddModal = () => {
        setNewTodo({
            title: '',
            description: '',
        })
        setErrorMsgs({ title: '', description: '' })
        setIsAddModalOpen(false)
    }
    const onOpenEditModal = (todo: ITodo) => {
        setSelectedTodo(todo)
        setIsEditModalOpen(true)
    }
    const onCloseEditModal = () => {
        setSelectedTodo({
            id: 0,
            title: '',
            description: '',
            documentId: ''
        })
        setErrorMsgs({ title: '', description: '' })
        setIsEditModalOpen(false)
    }
    const onOpenDeleteModal = (todo: ITodo) => {
        setSelectedTodo(todo)
        setIsDeleteModalOpen(true)
    }
    const onCloseDeleteModal = () => {
        setSelectedTodo({
            id: 0,
            title: '',
            description: '',
            documentId: ''
        })
        setIsDeleteModalOpen(false)
    }
    const onChangeAddHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        setNewTodo({
            ...newTodo,
            [name]: value
        })
        setErrorMsgs({ ...errorMsgs, [name]: "" })
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        setSelectedTodo({
            ...selectedTodo,
            [name]: value
        })
        setErrorMsgs({ ...errorMsgs, [name]: "" })
    }
    const AddHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { title, description} = newTodo
        const errors = TodoSchema(title, description)
        const isNoErrorMsgs = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
        if (!isNoErrorMsgs) {
            setErrorMsgs(errors)
            return;
        }
        else {
            setIsUpdating(true)
            try {
                const { data, status } = await axiosInstance.post(`/todos`,
                    { data: { title, description, user: [userData.user.id] } },
                    { headers: { Authorization: `Bearer ${userData.jwt}` } }
                )
                console.log(data);
                if (status === 201) {
                    toast.success('Todo is Successfully Added!', { className: 'toast' })
                    setQueryVersion(q => q + 1)
                    onCloseAddModal();
                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setIsUpdating(false)
            }
        }
    }
    const EditHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { title, description, documentId } = selectedTodo
        const errors = TodoSchema(title, description)
        const isNoErrorMsgs = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
        if (!isNoErrorMsgs) {
            setErrorMsgs(errors)
            return;
        }
        else {
            setIsUpdating(true)
            try {
                const { data, status } = await axiosInstance.put(`/todos/${documentId}`,
                    { data: { title, description } },
                    { headers: { Authorization: `Bearer ${userData.jwt}` } }
                )
                console.log(data);
                if (status === 200) {
                    toast.success('Todo is Successfully Updated!', { className: 'toast' })
                    setQueryVersion(q => q + 1)
                    onCloseEditModal();
                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setIsUpdating(false)
            }
        }
    }
    const DeleteHandler = async () => {
        const { documentId } = selectedTodo
        try {
            const { data } = await axiosInstance.delete(`/todos/${documentId}`, { headers: { Authorization: `Bearer ${userData.jwt}` } })
            console.log(data)
            toast.success('Todo is Successfully Deleted!', { className: 'toast' })
            setQueryVersion(q => q + 1)
            onCloseDeleteModal();
        }
        catch (error) {
            console.log(error);
        }
    }
    const GenerateHandler = async () => {
        for (let i = 0; i < 100; i++) {
            try {
                await axiosInstance.post(`/todos`,
                    {
                        data: {
                            title: faker.word.words(3)
                            , description : faker.word.words(20)
                            , user: [userData.user.id]
                        }
                    },
                    { headers: { Authorization: `Bearer ${userData.jwt}` } }
                )
                setQueryVersion(q => q + 1)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 w-full p-3 md:p-0">
                <div className=" animate-pulse w-fit mx-auto my-4 flex space-x-4">
                    <div className="bg-gray-300 dark:bg-gray-300 text-gray-300 rounded-md w-24 h-9">
                    </div>
                    <div className="bg-gray-300 dark:bg-gray-300 text-gray-300 rounded-md w-32 h-9">
                    </div>
                </div>
                {Array.from({ length: 3 }, (_, i) => <ToDoSkeleton key={i} />)}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 w-full p-3 md:p-0">
            <div className="w-fit mx-auto my-4 flex space-x-4">
                <Button size={'sm'} onClick={onOpenAddModal}>
                    <IoMdAdd className="mr-2 text-lg" />
                    TODO
                </Button>
                <Button size={'sm'} variant={'outline'} onClick={GenerateHandler}>
                    Generate Todos
                </Button>
            </div>
            {data.todos.length ?
                data.todos.map((todo: ITodo) => (
                    <div key={todo.id} className="flex justify-between items-center  w-full md:w-1/2 md:mx-auto  bg-gray-50/70 shadow-sm p-3 rounded-md">
                        <p className="font-semibold">{todo.title}</p>
                        <div className="flex gap-1">
                            <Button size={"rounded"} onClick={() => onOpenEditModal(todo)}><FiEdit className="text-xl" /></Button>
                            <Button size={"rounded"} variant={"danger"} onClick={() => onOpenDeleteModal(todo)}><MdOutlineDelete className="text-2xl" /></Button>
                        </div>
                    </div>
                )) :
                <h3 className="text-center">No todos yet!</h3>
            }
            {/* add Modal */}
            <Modal closeModel={onCloseAddModal} isOpen={isAddModalOpen} title="Add New Todo">
                <form onSubmit={AddHandler} className="space-y-3">
                    <div>
                        <Input name="title" value={newTodo.title} onChange={onChangeAddHandler} />
                        {errorMsgs.title && <InputErrorMsg msg={errorMsgs.title} />}
                    </div>
                    <div>
                        <Textarea name="description" value={newTodo.description || ''} onChange={onChangeAddHandler} />
                        {errorMsgs.description && <InputErrorMsg msg={errorMsgs.description} />}
                    </div>
                    <div className="flex space-x-3">
                        <Button fullWidth type="submit" isLoading={isUpdating}>{isUpdating ? 'Adding...' : 'Add'}</Button>
                        <Button fullWidth variant={"cancel"} onClick={onCloseAddModal} type="button">Cancel</Button>
                    </div>
                </form>
            </Modal>
            {/* Edit Modal */}
            <Modal closeModel={onCloseEditModal} isOpen={isEditModalOpen} title="Edit Todo">
                <form onSubmit={EditHandler} className="space-y-3">
                    <div>
                        <Input name="title" value={selectedTodo.title} onChange={onChangeHandler} />
                        {errorMsgs.title && <InputErrorMsg msg={errorMsgs.title} />}
                    </div>
                    <div>
                        <Textarea name="description" value={selectedTodo.description || ''} onChange={onChangeHandler} />
                        {errorMsgs.description && <InputErrorMsg msg={errorMsgs.description} />}
                    </div>
                    <div className="flex space-x-3">
                        <Button fullWidth type="submit" isLoading={isUpdating}>{isUpdating ? 'Updating...' : 'Update'}</Button>
                        <Button fullWidth variant={"cancel"} onClick={onCloseEditModal} type="button">Cancel</Button>
                    </div>
                </form>
            </Modal>
            {/* Delete Modal */}
            <Modal closeModel={onCloseDeleteModal} isOpen={isDeleteModalOpen}
                title="Delete Todo"
                description="Are you sure you want to delete this todo ?">
                <div className="flex gap-3 mt-3">
                    <Button fullWidth variant={"danger"} onClick={DeleteHandler} >Yes, Delete</Button>
                    <Button fullWidth variant={"cancel"} onClick={onCloseDeleteModal} type="button">Cancel</Button>
                </div>
            </Modal>
        </div>
    )
}

export default ToDoList