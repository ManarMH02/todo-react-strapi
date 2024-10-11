import { GrNext, GrPrevious } from "react-icons/gr";
import Button from "./Button";

interface IProps {
    page: number;
    pageCount: number;
    total: number;
    isLoading: boolean;
    onClickPrev: () => void;
    onClickNext: () => void;
}

const Paginator = ({
    page,
    pageCount,
    onClickPrev,
    isLoading,
    total,
    onClickNext,
}: IProps) => {
    return (
        <div className="flex justify-center items-center">
            <p className="text-sm text-gray-600 mx-3">
                Page{" "}
                <span className="mx-1 font-semibold text-gray-900 text-md-1">
                    {page}
                </span>{" "}
                to
                <span className="mx-1 font-smeibold text-gray-900">{pageCount}</span> of
                <span className="mx-1 font-semibold text-gray-900">{total}</span>{" "}
                Records
            </p>

            <Button
                type="button"
                className=" disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed me-2"
                size={'rounded'}
                fetching={page === 1 || isLoading}
                onClick={onClickPrev}
            >
                <GrPrevious className="text-base mx-auto" />
                
            </Button>
            <Button
                type="button"
                className=" disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed me-2"
                size={'rounded'}
                fetching = {page === pageCount || isLoading}
                onClick={onClickNext}
            >
                <GrNext className="text-base mx-auto" />
            </Button>
        </div>
    );
};

export default Paginator;
