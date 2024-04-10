function InputError({ formErrors, name }) {
    let show

    try {
        let thisVariableCausesError = formErrors[name]
        show = true
    } catch (e) {
        show = false
    }

    return (
        show &&
        formErrors[name] && (
            <span className={'flex flex-col bg-red-200 text-red-800 p-1 font-semibold rounded'}>
                {formErrors[name].map((error, index) => {
                    return <small key={index}>{formErrors[name][index]}</small>
                })}
            </span>
        )
    )
}

export default InputError
