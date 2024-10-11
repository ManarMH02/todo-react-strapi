

interface IProps {
    msg?: string
}

function InputErrorMsg({msg}: IProps) {
    return (
        msg && <span className="text-sm text-red-600 font-semibold text-left px-3">{msg}</span>
    )
}

export default InputErrorMsg