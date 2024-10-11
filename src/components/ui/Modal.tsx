import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    closeModel: () => void;
    title?: string;
    description?: string
    children: ReactNode ;
}

const Modal = ({ isOpen, closeModel, title, description, children }: IProps) => {
    return (
        <>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={closeModel}
            >
                <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            {title && <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium mb-3 text-indigo-600"
                            >
                                {title}
                            </DialogTitle>}
                            {description &&
                                <Description className='text-sm md:text-base'
                                >{description}</Description>
                            }
                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};
export default Modal;
